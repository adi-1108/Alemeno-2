
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient';
// or any API endpoint

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) throw new Error(error.message);
  return data;
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [],
    enrolled: [],
    loading: false,
  },
  reducers: {
    enrollCourse: (state, action) => {
      state.enrolled.push(action.payload);
    },
    completeCourse: (state, action) => {
      const course = state.enrolled.find(c => c.id === action.payload);
      if (course) course.completed = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { enrollCourse, completeCourse } = courseSlice.actions;
export default courseSlice.reducer;
