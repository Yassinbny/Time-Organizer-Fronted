import React, { useEffect, useState } from "react";

const RateTask = ({ selectedEvent, setSelectedEvent }) => {
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch(
        `http://localhost:3000/tasks/${selectedEvent.id}/rating`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
          method: "POST",
          body: JSON.stringify({ rating: rating }),
        }
      );

      const { message } = await response.json();
      alert(message);
      setSelectedEvent();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed -inset-y-0 -inset-x-0 z-30 flex flex-col items-center justify-center
      w-[100vw] h-[100vh] bg-gray-800 bg-opacity-85"
    >
      <h2
        className="bg-fondoPopup text-3xl pt-4 text-white rounded-t-2xl w-[70vw] md:w-[50vw]
       sm:w-[60vw] text-center sm:text-6xl"
      >
        Evaluar tarea
      </h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col items-center  justify-evenly sm:justify-center space-y-12 content-center
         sm:text-4xl  bg-fondoPopup
         p-6 rounded-b-2xl shadow-lg  w-[70vw] sm:w-[60vw] md:w-[50vw] h-[70vh] text-center"
      >
        {/* <input
          type="number"
          onChange={(e) => {
            setRating(e.target.value);
          }}
        />
        <button>enviar</button> */}
        <button
          onClick={(e) => {
            setRating("1");
          }}
          className="bg-green-900 w-[40vw] h-[20vh] rounded-3xl "
        >
          1
        </button>
        <button
          onClick={(e) => {
            setRating(2);
          }}
          className="bg-green-700 w-[40vw] h-[20vh] rounded-3xl "
        >
          2
        </button>
        <button
          onClick={(e) => {
            setRating(3);
          }}
          className="bg-green-600 w-[40vw] h-[20vh] rounded-3xl "
        >
          3
        </button>
        <button
          onClick={(e) => {
            setRating(4);
          }}
          className="bg-green-400 w-[40vw] h-[20vh] rounded-3xl "
        >
          4
        </button>
        <button
          onClick={(e) => {
            setRating(5);
          }}
          className="bg-green-200 w-[40vw] h-[20vh] rounded-3xl "
        >
          5
        </button>
      </form>
    </div>
  );
};

export default RateTask;
