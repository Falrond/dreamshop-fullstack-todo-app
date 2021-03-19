import React, { useEffect } from 'react';
import { useDreamsContext } from '../context/DreamsContext';

const Dream = ({ dream }) => {
  const { updateDream, deleteDream } = useDreamsContext();
  const toggleCompleted = () => {
    if (!dream.fields.completed) {
      dream.fields.completed = false;
    }
    const toggleDream = {
      ...dream.fields,
      completed: !dream.fields.completed,
    };
    const newDream = { id: dream.id, fields: toggleDream };
    updateDream(newDream);
  };

  return (
    <li
      className={`flex justify-between font-spartan rounded-md  text-gray-600 font-bold bg-light-cyan items-center my-8 shadow-lg h-24 w-11/12 md:w-4/5 mx-auto border-l-4 border-light-cyan transition duration-300 ease-in-out ${
        dream.fields.completed
          ? 'hover:none'
          : 'hover:text-dark-cyan hover:border-dark-cyan'
      }`}
    >
      <div className="ml-4">
        <p
          className={` ${
            dream.fields.completed ? 'line-through text-gray-400' : null
          }`}
        >
          {dream.fields.name.length > 25
            ? `${dream.fields.name.slice(0, 25)}...`
            : dream.fields.name}
        </p>
      </div>
      <div className="text-sm mr-4">
        <input
          type="checkbox"
          className="form-checkbox text-dark-cyan rounded-md h-5 w-5 p-3 m-4  cursor-pointer checked:border-transparent"
          name="completed"
          id="completed"
          checked={dream.fields.completed}
          onChange={toggleCompleted}
        />

        <button
          className="text-red-500 transition focus:outline-none font-bold transform hover:scale-110"
          onClick={() => deleteDream(dream.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Dream;
