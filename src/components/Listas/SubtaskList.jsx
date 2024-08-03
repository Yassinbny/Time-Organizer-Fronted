import { useMemo, useState } from "react"
import Select from "react-select"
/* eslint-disable react/prop-types */

const sortingOptions = [ 
  { value: "default", label: "Ordenar por defecto" },
  {value: "checked", label: "Ordenar por completado"},
  {value: "unchecked", label: "Ordenar por pendiente"},
  
]


const SubtaskList = ({subtasks, handleDeleteSubtask, handleToggleSubtask }) => {

  const [sortBy, setSortBy] = useState("default")

  const sortedSubtasks =useMemo(() =>[...subtasks].sort((a, b) => {
    if (sortBy === "default") {
      return 0
    }
    if (sortBy === "unchecked") {
      return a.checked === b.checked ? 0 : a.checked ? 1 : -1
    }
    if (sortBy === "checked") {
      return a.checked === b.checked ? 0 : a.checked ? -1 : 1
    }
    return 0
  }), [subtasks, sortBy])

  return (
    
     <div className="col-span-4 bg-amber-100 p-4 md:col-span-8">
      <h2 className="flex flex-col items-center text-2xl font-bold text-gray-800">Subtasks</h2>
      {
          subtasks.length > 1 ? <section className="mb-4">
            
            <Select className=""
              onChange={option => setSortBy(option.value)} 
              defaultValue={sortingOptions[0]} 
              options={sortingOptions} />
          </section> : null
        }
      <ul className="w-full max-w-md bg-amber-50 shadow-lg rounded-lg p-6 border-2 border-amber-300 min-h-[50vh] max-h-[70vh] overflow-y-auto">
        
        {
        sortedSubtasks.map((subtask) => {
          return (
          <Subtask 
            key={subtask.id} 
            onToggleSubtask={handleToggleSubtask} 
            onDeleteSubtask={handleDeleteSubtask} 
            subtask={subtask} 
          />
        )})}
      </ul>
    </div>
  )
}

function Subtask ({ subtask, onDeleteSubtask, onToggleSubtask }) {
  return (
    <li  className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4 border-b border-dotted border-gray-300">
      <span  className="text-gray-800 text-sm md:text-base">
        <label>
          <input 
          onChange={() => onToggleSubtask(subtask.id)}
          checked={subtask.checked} 
          type="checkbox" 
          className="mr-2"
          aria-label={`Mark ${subtask.name} as completed`} 
          />
          {subtask.name}
        </label>
      </span>
      <button
        onClick={() => onDeleteSubtask(subtask.id)}
        className=" bg-white hover:bg-yellow-100 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
        aria-label={`Delete ${subtask.name}`}
      >
        ❌
      </button>
    </li>
  )
}

export default SubtaskList;