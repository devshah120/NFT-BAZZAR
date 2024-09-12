import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      < div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-300" role="status">
        <span className="sr-only text-black ">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;