import useAuth from "../../hooks/useAuth.jsx";
import Button from "./Button.jsx";

const ButtonGroup = ({ handleRemoveAllSubtasks }) => {
  const { selectedEvent } = useAuth();
  const { id } = selectedEvent;
  return (
    <section className="p-8 flex flex-col gap-[8px]">
      <Button
        
        onClick={() => {
          handleRemoveAllSubtasks(id);
        }}
      >
        ¡LO LOGRASTE!
      </Button>
    </section>
  );
};

export default ButtonGroup;
