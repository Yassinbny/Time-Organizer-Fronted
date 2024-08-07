
const Counter = ({subtasks= []}) => {
    return (
      <div>
          <p>
              {subtasks.filter (subtask => subtask.done).length}/{subtasks.length} subtareas finalizadas
          </p>
      </div>
    )
  }
  
  export default Counter