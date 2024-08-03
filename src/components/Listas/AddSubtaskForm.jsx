/* eslint-disable react/prop-types */
import { useRef, useState } from "react"
import Button from "./Button.jsx"
import { useForm } from "react-hook-form"
import Counter from "./Counter.jsx"

const AddSubtaskForm = ({onAddSubtask, subtasks}) => {

  const [subtaskText, setSubtaskText] = useState("")
  const inputRef = useRef()
  const { register,formState:{errors} } = useForm()
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
    <>
      <form onSubmit={handleSubmit}>
        <h2>Añade un elemento</h2>
          <input
          ref={inputRef}  
          type="text"  
          value= {subtaskText}
          name="subtask"
          id="subtask"
          {...register("subtask", {
            required: {
              value: true,
              message: "El campo no puede estar vacio ",
            }
          })}

          onChange={(e) => {
            setSubtaskText(e.target.value)
          }
        } 
        autoFocus
          />
          {errors.subtask && <span>{errors.subtask.message}</span>}
          <Button>Añadir a la lista</Button>
      </form>
      <Counter subtasks={subtasks} />
    </>
  )
}

export default AddSubtaskForm