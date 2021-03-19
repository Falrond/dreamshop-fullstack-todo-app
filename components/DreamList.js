import React from 'react';
import Dream from './Dream';

const DreamList = ({ dreams }) => {
  return (
    <ul className="max-w-3xl transition mx-auto ">
      {dreams.map(dream => {
        return <Dream key={dream.id} dream={dream} />;
      })}
    </ul>
  );
};

export default DreamList;
