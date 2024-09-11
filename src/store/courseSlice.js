import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

// Fetch courses from the courses table
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) throw new Error(error.message);
    return data;
  }
);

// Fetch enrolled courses for a specific student
export const fetchEnrolledCourses = createAsyncThunk(
  "courses/fetchEnrolledCourses",
  async (studentId) => {
    const { data, error } = await supabase
      .from("students")
      .select("enrolledcourses")
      .eq("studentid", studentId)
      .single(); // Fetch a single row

    if (error) throw new Error(error.message);
    return data.enrolledcourses || []; // Default to empty array if no data
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    enrolled: [], // This will be updated with fetched enrolled courses
    loading: false,
  },
  reducers: {
    enrollCourse: (state, action) => {
      state.enrolled.push(action.payload);
    },
    completeCourse: (state, action) => {
      const course = state.enrolled.find((c) => c.id === action.payload);
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
      })
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.enrolled = action.payload;
        state.loading = false;
      })
      .addCase(fetchEnrolledCourses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { enrollCourse, completeCourse } = courseSlice.actions;
export default courseSlice.reducer;
