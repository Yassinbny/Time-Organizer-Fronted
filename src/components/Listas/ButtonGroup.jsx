import Button from "./Button.jsx"

const ButtonGroup = ({handleRemoveAllSubtasks, handleMarkAllAsFinished, handleMarkAllAsUnfinished }) => {

  const buttonGroup = [{
    text:"Marca todas como completadas",
    onClick: handleMarkAllAsFinished
    },
   {
    text:"Marca todas como no completadas",
    onClick: handleMarkAllAsUnfinished
    },
    {
      text:"Borra todas",
      onClick: handleRemoveAllSubtasks
    }]

  return (
    <section className="mt-auto flex flex-col gap-[8px]">
      {
        buttonGroup.map(button => (
          <Button onClick={button.onClick} className="opacity-[0.85] text-[14px]" key={button.text + button.onClick.toString()}>
            {button.text}
          </Button>
        ))
      }
    </section>
  )
}

export default ButtonGroup
