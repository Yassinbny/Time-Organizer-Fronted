import React, { useEffect, useState } from "react";

const FilterModal = ({ setSearch, setColor, setFamily, setFilterModal }) => {
  const [colores, setcolores] = useState([]);
  const [families, setFamilies] = useState([]);
  const getcolors = async () => {
    try {
      const response = await fetch(`http://localhost:3000/colors`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
        },
        method: "GET",
      });
      const info = await response.json();

      setcolores(info.colors);
    } catch (error) {
      console.log(error);
    }
  };
  const getFamilies = async () => {
    try {
      const response = await fetch(`http://localhost:3000/family`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
        },
        method: "GET",
      });
      const info = await response.json();

      setFamilies(info.taskFamilies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcolors();
    getFamilies();
  }, []);
  return (
    <div
      className="fixed -inset-y-0 -inset-x-0 z-30 flex flex-col items-center justify-center
      w-[100vw] h-[100vh] bg-gray-800 bg-opacity-85"
    >
      <h2
        className="bg-fondoPopup text-3xl pt-4 text-white rounded-t-2xl w-[70vw] md:w-[50vw]
       sm:w-[60vw] text-center sm:text-6xl"
      >
        Filtrar
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFilterModal(false);
        }}
        className="flex flex-col items-center  justify-evenly sm:justify-center space-y-12 content-center
         sm:text-4xl  bg-fondoPopup
         p-6 rounded-b-2xl shadow-lg  w-[70vw] sm:w-[60vw] md:w-[50vw] h-[70vh] text-center"
      >
        <input
          type="text"
          placeholder="busqueda..."
          className="text-3xl w-full bg-transparent border-b-4 text-center sm:text-6xl text-gray-400 font-bold mb-4"
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />
        <div className="text-gray-400">
          <label htmlFor="color">Elige una opción:</label>
          <input
            list="color"
            id="exampleListInput"
            onChange={(e) => {
              e.preventDefault();
              setColor(e.target.value);
            }}
          />
          <datalist id="color">
            {colores.map((co, i) => {
              return <option key={i} value={co.name} />;
            })}
          </datalist>
        </div>
        <div className="text-gray-400">
          <label htmlFor="family">Elige una opción:</label>
          <input
            list="family"
            id="exampleListInput2"
            onChange={(e) => {
              e.preventDefault();
              setFamily(e.target.value);
            }}
          />
          <datalist id="family">
            {families.map((fa, i) => {
              return <option key={i} value={fa.name} />;
            })}
          </datalist>
        </div>
        <button className="bg-green-600  px-4 py-2 rounded-2xl hover:bg-green-900 w-[30vw] transition duration-200">
          Filtrar
        </button>
      </form>
    </div>
  );
};

export default FilterModal;
