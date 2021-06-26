import React, { useState, useEffect } from 'react';

// Custom hook for flipping a card - UseFlip() //
const useFlip = (initialFlipState = true) => {
    const [isFlipped, setFlipped] = useState(initialFlipState);
  
    const flip = () => {
      setFlipped(isUp => !isUp);
    };
  
    return [isFlipped, flip];
  }

const useAxios = (keyInLS, baseUrl) => {
    const [responses, setResponses] = useLocalStorage(keyInLS);

    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
        const response = await axios.get(`${baseUrl}${restOfUrl}`);
        setResponses(data => [...data, formatter(response.data)]);
    };

    const clearResponses = () => setResponses([]);

    return [responses, addResponseData, clearResponses];
}

const useLocalStorage = (key, initialValue = []) => {
    if (localStorage.getItem(key)) {
        initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export default useLocalStorage;

export { useFlip, useAxios, useLocalStorage };
