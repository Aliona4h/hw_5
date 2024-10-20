import React, { useState, useEffect } from "react";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setCharacters(data.results);
      setInfo(data.info);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div id="characters">
        {characters.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
            <p>{character.status}</p>
          </div>
        ))}
      </div>
      <div>
        <button id="prevBtn" onClick={handlePrev} disabled={!info.prev}>
          Prev
        </button>
        <span id="pageNumber">{currentPage}</span>
        <button id="nextBtn" onClick={handleNext} disabled={!info.next}>
          Next
        </button>
      </div>
    </>
  );
};

export default App;
