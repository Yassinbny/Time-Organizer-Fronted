import AddSubtaskForm from "./AddSubtaskForm.jsx"
import ButtonGroup from "./ButtonGroup.jsx"

const Sidebar = ({handleAddSubtask, handleRemoveAllSubtasks, handleMarkAllAsFinished, handleMarkAllAsUnfinished, subtasks }) => {
  return (
    
        <div className="col-span-4 bg-white p-4">
            <AddSubtaskForm onAddSubtask={handleAddSubtask} subtasks={subtasks} />

            <ButtonGroup handleRemoveAllSubtasks={handleRemoveAllSubtasks} handleMarkAllAsFinished={handleMarkAllAsFinished} handleMarkAllAsUnfinished={handleMarkAllAsUnfinished}/>

        </div>
    
  )
}

export default Sidebar
