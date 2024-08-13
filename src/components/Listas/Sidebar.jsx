import AddSubtaskForm from "./AddSubtaskForm.jsx";
import ButtonGroup from "./ButtonGroup.jsx";

const Sidebar = ({
  handleAddSubtask,
  handleRemoveAllSubtasks,
  handleMarkAllAsFinished,
  handleMarkAllAsUnfinished,
  subtasks,
  reload,
  setreload,
}) => {
  return (
    <div className="flex flex-col  p-4  rounded-lg ">
      <AddSubtaskForm
        onAddSubtask={handleAddSubtask}
        subtasks={subtasks}
        reload={reload}
        setreload={setreload}
      />

      <ButtonGroup
        handleRemoveAllSubtasks={handleRemoveAllSubtasks}
        handleMarkAllAsFinished={handleMarkAllAsFinished}
        handleMarkAllAsUnfinished={handleMarkAllAsUnfinished}
      />
      <img
        src="images/superLetteringMultBlanco-removebg-preview (1).png"
        alt="logo"
        className="hidden md:block"
      />
    </div>
  );
};

export default Sidebar;
