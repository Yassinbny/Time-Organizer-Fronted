import { useEffect, useState } from "react";

const AddTask = ({ setAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const colors = [
    {
      color_id: 1,
      name: "black",
    },
    {
      color_id: 2,
      name: "white",
    },
    {
      color_id: 3,
      name: "green",
    },
    {
      color_id: 4,
      name: "blue",
    },
    {
      color_id: 5,
      name: "red",
    },
    {
      color_id: 6,
      name: "yellow",
    },
    {
      color_id: 7,
      name: "grey",
    },
  ];
  const getColorIdByName = (colorName) => {
    const color = colors.find(
      (c) => c.name.toLowerCase() === colorName.toLowerCase()
    );
    return color ? color.color_id : null;
  };
  let families = [
    {
      family_id: 1,
      name: "trabajo",
    },
    {
      family_id: 2,
      name: "deporte",
    },
    {
      family_id: 3,
      name: "estudios",
    },
    {
      family_id: 4,
      name: "casa",
    },
    {
      family_id: 5,
      name: "ocio",
    },
  ];
  const getfamilyIdByName = (familyName) => {
    const family = families.find(
      (f) => f.name.toLowerCase() === familyName.toLowerCase()
    );
    return family ? family.family_id : null;
  };
  const [taskId, settaskId] = useState();
  const [colorId, setColorId] = useState();
  const [familyId, setFamilyId] = useState();

  let FamilyColorForm = {
    task_id: taskId,
    color_id: colorId,
    family_id: familyId,
  };
  const [taskColorFamilyBody, settaskColorFamilyBody] =
    useState(FamilyColorForm);
  let formInfo = {
    title: title,
    description: description,
    start_on: start,
    finish_on: end,
  };

  const [body, setBody] = useState(formInfo);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch(`http://localhost:3000/tasks`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
        },
        method: "POST",
        body: JSON.stringify(body),
      });
      const { message } = await response.json();
      settaskId(message.insertId);

      setAddTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setBody(formInfo);
    settaskColorFamilyBody(FamilyColorForm);
  }, [title, description, start, end, colorId, familyId, taskId]);
  return (
    <div
      className="fixed -inset-y-0 z-30 -inset-x-0 z-10 flex flex-col items-center justify-center 
     w-[100vw] h-[100vh] bg-gray-800 bg-opacity-85"
    >
      <h2
        className="bg-fondoPopup pt-4 text-white rounded-t-2xl w-[70vw] sm:w-[60vw] md:w-[50vw]
       text-center text-3xl sm:text-6xl"
      >
        Añadir Evento
      </h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col items-center justify-evenly sm:justify-center content-center 
        space-y-10  bg-fondoPopup p-6 
        rounded-b-2xl shadow-lg w-[70vw] sm:w-[60vw] md:w-[50vw] h-[75vh] sm:text-2xl text-center"
      >
        <input
          type="text"
          placeholder="añade un titulo"
          className="text-3xl w-full bg-transparent border-b-4 text-center sm:text-6xl text-gray-400 font-bold mb-4"
          onChange={(e) => {
            setTitle(e.target.value);
            setBody(formInfo);
          }}
        />
        <input
          type="text"
          placeholder="añade una descripcion"
          className="mb-4 w-full bg-transparent border-b-4 text-gray-400 sm:text-5xl text-xl text-center"
          onChange={(e) => {
            setDescription(e.target.value);
            setBody(formInfo);
          }}
        />

        <div className="flex flex-col sm:flex-col sm:space-y-8 text-gray-400  space-y-4 ">
          <div>
            <label className="mb-2">
              <strong>Fecha de Inicio:</strong>
            </label>
            <input
              className="w-[46vw] bg-transparent sm:w-[23vw]"
              type="datetime-local"
              min={"1900-01-01T00:00:00"}
              max={"2040-01-01T00:00:00"}
              onChange={(e) => {
                setStart(e.target.value);

                setBody(formInfo);
              }}
            />
          </div>
          <div>
            <label className="mb-2">
              <strong>Fecha de Fin:</strong>
            </label>
            <input
              className="w-[46vw] bg-transparent sm:w-[23vw]"
              type="datetime-local"
              min={"1900-01-01T00:00:00"}
              max={"2040-01-01T00:00:00"}
              onChange={(e) => {
                setEnd(e.target.value);

                setBody(formInfo);
              }}
            />
          </div>

          <div>
            <label htmlFor="color">Elige una opción:</label>
            <input
              list="color"
              id="exampleListInput"
              onChange={(e) => {
                e.preventDefault();

                setColorId(getColorIdByName(e.target.value));
              }}
            />
            <datalist id="color">
              {colors.map((co, i) => {
                return <option key={i} value={co.name} />;
              })}
            </datalist>
          </div>
          <div>
            <label htmlFor="family">Elige una opción:</label>
            <input
              list="family"
              id="exampleListInput2"
              onChange={(e) => {
                e.preventDefault();

                setFamilyId(getfamilyIdByName(e.target.value));
              }}
            />
            <datalist id="family">
              {families.map((fa, i) => {
                return <option key={i} value={fa.name} />;
              })}
            </datalist>
          </div>
        </div>

        <button
          className="bg-green-600  px-4 py-2 rounded-2xl hover:bg-green-900 w-[30vw] transition duration-200"
          onClick={() => {
            setAddTask(false);
          }}
        >
          Cerrar
        </button>
        <button
          className="bg-green-600  px-4 py-2 rounded-2xl hover:bg-green-900 w-[30vw] transition duration-200"
          onClick={() => {}}
        >
          Añadir
        </button>
      </form>
    </div>
  );
};

export default AddTask;
