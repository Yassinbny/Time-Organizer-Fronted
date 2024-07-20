import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import { useState } from "react";
const Header = () => {
  const { currentUser, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="text-white  flex flex-row justify-end  items-center p-5 font-bold h-15 sm:h-[8vh]">
      <img
        className="absolute -top-6 -left-2 sm:-top8  sm:left-1 w-[22vh]  
         "
        src="images\superLetteringMultBlanco-removebg-preview2.png"
        alt="logo"
      />
      <nav>
        <ul className="flex flex-row justify-evenly  sm:w-[45vw] md:w-[55vw] sm:text-xl md:text-3xl">
          {!currentUser ? (
            <>
              <li>
                <NavLink to="/login">INICIAR SESIÓN</NavLink>
              </li>
              <li>
                <NavLink to="/signup">REGISTRARSE</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/calendar">CALENDARIOS</NavLink>
              </li>
              <li>
                <NavLink to="/listas"> LISTAS</NavLink>
              </li>
              <li
                onClick={() => {
                  signOut();
                }}
              >
                logout
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
