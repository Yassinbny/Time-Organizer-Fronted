const Button = ({onClick, children}) => {
    return (
      <button onClick={onClick} className="h-[45px] w-full border-[none] rounded-[5px] bg-[#473a2b] text-[#fff] text-[16px] cursor-pointer flex justify-center items-center [transition:all_0.2s]">
        {children}
      </button>
    )
  }
  
  export default Button