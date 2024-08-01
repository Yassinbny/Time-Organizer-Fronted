import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import { GrCircleQuestion, GrLogout, GrSearch, GrUserAdmin } from "react-icons/gr";
import { LuUser2 } from "react-icons/lu";

const Header = () => {
  const { currentUser, signOut } = useAuth();
  //const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="text-white flex flex-row justify-end items-center p-5 font-bold sm:h-[6vh] md:h-[7vh] lg:h-[8vh]">
      <img
        className="absolute -top-1 md:-top-2 -left-1 md:left-0  w-[13vh] md:w-[20vh] lg:w-[26vh]"
        src="images\superLetteringMultBlanco-removebg-preview2.png"
        alt="logo"
      />
      <nav>
        <ul className="flex flex-row justify-evenly  md:justify-items-center sm:w-[50vw] md:w-[49vw] sm:h-6 md:h-8 lg:h-10 sm:text-base md:text-xl lg:text-3xl">
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
              <li>
                <GrSearch
                className="sm:w-6 lg:w-9 sm:h-6 lg:h-10" />
              </li>
              <li>
                <NavLink to="/help"> <GrCircleQuestion
                className="sm:w-8 lg:w-10 sm:h-8 lg:h-10" /> </NavLink>
              </li>
              <li>
                <NavLink to={currentUser.role === "admin" ? "/admin-profile" : "/user-profile"}>
                  {currentUser.role === "admin" ? (<GrUserAdmin className="w-6 md:w-7 lg:w-10 h-4 md:h-7 lg:h-10"/>) : (<LuUser2 className="w-6 md:w-8 lg:w-10 h-5 md:h-8 lg:h-10"/>)}
                </NavLink>
              </li>
              <li
                onClick={signOut}
              >
                <GrLogout className="sm:w-7 lg:w-10 sm:h-7 lg:h-10" />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
