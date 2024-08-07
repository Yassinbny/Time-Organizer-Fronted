import useAuth from "../../hooks/useAuth.jsx";

const ButtonGroup = ({ handleRemoveAllSubtasks }) => {
  const { selectedEvent } = useAuth();
  const { id } = selectedEvent;
  return (
    <section className="mt-auto p-8 flex flex-col gap-[8px]">
      <button
        className="h-[45px] w-full px-1 border-solid border-2 border-black rounded-lg bg-[#473a2b] text-white text-[16px] 
      cursor-pointer flex justify-center items-center [transition:all_0.2s]"
        onClick={() => {
          handleRemoveAllSubtasks(id);
        }}
      >
        Borrar Todas
      </button>
    </section>
  );
};

export default ButtonGroup;
