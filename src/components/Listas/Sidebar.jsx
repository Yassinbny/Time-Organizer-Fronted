import AddSubtaskForm from "./AddSubtaskForm.jsx"
import ButtonGroup from "./ButtonGroup.jsx"

const Sidebar = ({handleAddSubtask, handleRemoveAllSubtasks, handleMarkAllAsFinished, handleMarkAllAsUnfinished, subtasks }) => {
  return (
    
        <div className="flex flex-col bg-amber-100 p-4 w-2/5 rounded-br-lg ">
            <AddSubtaskForm onAddSubtask={handleAddSubtask} subtasks={subtasks} />

            <ButtonGroup handleRemoveAllSubtasks={handleRemoveAllSubtasks} handleMarkAllAsFinished={handleMarkAllAsFinished} handleMarkAllAsUnfinished={handleMarkAllAsUnfinished}/>

        </div>
    
  )
}

export default Sidebar
