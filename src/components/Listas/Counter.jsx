
const Counter = ({subtasks}) => {
    return (
      <div>
          <p>
              <b>{subtasks.filter(subtask => subtask.checked).length}</b>/{subtasks.length} subtareas finalizadas
          </p>
      </div>
    )
  }
  
  export default Counter