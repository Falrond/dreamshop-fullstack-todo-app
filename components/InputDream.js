import React, { useState, useEffect } from 'react';
import { useDreamsContext } from '../context/DreamsContext';
import { useUser } from '@auth0/nextjs-auth0';

const InputDream = () => {
  const { user } = useUser();
  const { addDream, refreshDreams, dreams } = useDreamsContext();
  const [newDream, setNewDream] = useState('');
  const [error, setError] = useState(false);
  const [errorValue, setErrorValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!user) {
      setError(true);
      setErrorValue('log in to add a dream ');
      setNewDream('');
      return;
    }
    if (!newDream && user) {
      setError(true);
      setErrorValue('enter the dream first ');
      return;
    }
    const isOnList = dreams.filter(item => {
      return item.fields.name === newDream;
    });
    if (user && isOnList.length > 0) {
      setError(true);
      setErrorValue('the same dream is already on the list');
      setNewDream('');
      return;
    }

    addDream(newDream);
    setNewDream('');
    setError(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
      setErrorValue('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    refreshDreams();
  }, []);
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-spartan text-red-400 transition text-xl text-center my-4">
        {errorValue}
      </h1>
      <form
        className="flex justify-center my-4 w-11/12 md:w-4/5 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <input
            type="text"
            name="dream"
            id="dream"
            maxLength="40"
            wrap="hard"
            value={newDream}
            onChange={e => setNewDream(e.target.value)}
            className="w-full flex-grow font-spartan border-dark-cyan focus:outline-none bg-light-cyan"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 focus:outline-none  bg-dark-cyan font-spartan hover:bg-very-dark-cyan text-gray-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputDream;
