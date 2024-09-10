import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div class="absolute h-12 w-12 animate-spin rounded-md border-4 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default Loader;
