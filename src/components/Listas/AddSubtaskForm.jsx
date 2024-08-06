/* eslint-disable react/prop-types */
import { useRef, useState } from "react"
import Button from "./Button.jsx"
import Counter from "./Counter.jsx"

const AddSubtaskForm = ({onAddSubtask, subtasks}) => {

  const [subtaskText, setSubtaskText] = useState("")
  const inputRef = useRef()
 
  const handleSubmit = (e)=>{
    e.preventDefault();

    if(!subtaskText) {
      alert("El campo no puede estar vacio")
      inputRef.current.focus()
      return;
    }
    onAddSubtask(subtaskText);
    setSubtaskText("");
  }

  return (
    <div className="p-8">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="subtask" className="text-center ">Subtarea:</label>
          <input
          className="items-center"
          ref={inputRef}  
          type="text"   
          value= {subtaskText}
          name="subtask"
          id="subtask"
          onChange={(e) => {
            setSubtaskText(e.target.value)
          }
        } 
        autoFocus={true}
          />
          
          <Button>Añadir a la lista</Button>
      </form>
      <Counter subtasks={subtasks} />
    </div>
  )
}

export default AddSubtaskForm