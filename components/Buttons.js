import React from 'react';
import { useDreamsContext } from '../context/DreamsContext';

const Buttons = () => {
  const { status, changeStatus } = useDreamsContext();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="w-11/12 md:w-4/5 mx-auto flex justify-around items-center font-spartan shadow-md rounded-md  bg-light-cyan text-sm font-bold text-gray-700 h-14">
        <button
          className={`btn ${
            status === 'completed' ? 'bg-dark-cyan text-gray-50 ' : null
          }`}
          onClick={changeStatus}
        >
          Completed
        </button>
        <button
          className={`btn ${
            status === 'active' ? 'bg-dark-cyan text-gray-50' : null
          }`}
          onClick={changeStatus}
        >
          Active
        </button>
        <button
          className={`btn ${
            status === 'all' ? 'bg-dark-cyan text-gray-50' : null
          }`}
          onClick={changeStatus}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default Buttons;
