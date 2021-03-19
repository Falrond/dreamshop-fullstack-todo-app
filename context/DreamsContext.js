import { createContext, useContext, useState, useEffect } from 'react';

const DreamsContext = createContext();

export const DreamsProvider = ({ children }) => {
  const [dreams, setDreams] = useState([]);
  const [filteredDreams, setFilteredDreams] = useState([]);
  const [status, setStatus] = useState('all');

  const refreshDreams = async () => {
    try {
      const response = await fetch('/api/getDreams');
      const data = await response.json();
      setDreams(data);
      setFilteredDreams(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshDreams();
  }, []);

  const addDream = async dream => {
    try {
      const response = await fetch('/api/createDream', {
        method: 'POST',
        body: JSON.stringify({ name: dream }),
        headers: { 'Content-Type': 'application/json' },
      });
      const newData = await response.json();
      setDreams(prevData => {
        return [newData, ...prevData];
      });
      setFilteredDreams(prevData => {
        return [newData, ...prevData];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateDream = async updatedDream => {
    try {
      const response = await fetch('/api/updateDream', {
        method: 'PUT',
        body: JSON.stringify(updatedDream),
        headers: { 'Content-Type': 'application/json' },
      });
      await response.json();
      setDreams(prevData => {
        const tempData = [...prevData];
        const singleItem = tempData.find(item => item.id === updatedDream.id);
        singleItem.fields = updatedDream.fields;
        return tempData;
      });
      setFilteredDreams(prevData => {
        const tempData = [...prevData];
        const singleItem = tempData.find(item => item.id === updatedDream.id);
        singleItem.fields = updatedDream.fields;
        return tempData;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDream = async id => {
    try {
      await fetch('/api/deleteDream', {
        method: 'Delete',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
      setDreams(prevData => {
        return prevData.filter(item => item.id !== id);
      });
      setFilteredDreams(prevData => {
        return prevData.filter(item => item.id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = e => {
    const value = e.target.textContent.toLowerCase();
    setStatus(value);
  };

  const filterItems = () => {
    if (status === 'completed') {
      const tempData = [...dreams];
      const newData = tempData.filter(item => {
        return item.fields.completed === true;
      });
      setFilteredDreams(newData);
    }
    if (status === 'active') {
      const tempData = [...dreams];
      const newData = tempData.filter(item => {
        return item.fields.completed === false;
      });
      setFilteredDreams(newData);
    }
    if (status === 'all') {
      setFilteredDreams(dreams);
    }
  };
  useEffect(() => {
    filterItems();
  }, [status, dreams]);

  return (
    <DreamsContext.Provider
      value={{
        dreams,
        filteredDreams,
        setDreams,
        setFilteredDreams,
        refreshDreams,
        updateDream,
        deleteDream,
        addDream,
        changeStatus,
        status,
        filterItems,
      }}
    >
      {children}
    </DreamsContext.Provider>
  );
};

export const useDreamsContext = () => {
  return useContext(DreamsContext);
};
