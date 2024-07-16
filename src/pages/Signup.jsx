import { useState } from 'react'
import UsersLayout from '../layouts/UsersLayout.jsx'

const Signup = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "username") {
            setUsername(value)
        } else if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        } else if (name === "password2") {
            setPassword2(value)
    }
}

    const handleSubmit = async (e) => {
        e.preventDefault();
        //asegurarse que las contraseñas coinciden
        if (password !== password2) {
            console.log("Las contraseñas no coinciden")
            return
        }
        try {
            const response = await fetch(`http://localhost:3000/auth/sign-up`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({username, email, password})
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log("Error al registrar usuario", error)
        }
    }

  return (
    <UsersLayout componente={"Registrar usuario"}>
        <div className="flex flex-col justify-evenly w-full h-full content-center">
            <form 
                action=""
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full h-full justify-evenly content-center text-base sm:text-lg md:text-3xl "
            >
                <div className="flex flex-col   space-y-2">
                    <label htmlFor="username">Nombre:</label>
                    <input
                    className="h-10 rounded-xl w-[250px] sm:w-[350px] sm:h-16 md:w-[25vw] md:h-24 p-3  bg-white  "
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col   space-y-2">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                    className="h-10 rounded-xl w-[250px] sm:w-[350px] sm:h-16 md:w-[25vw] md:h-24 p-3  bg-white  "
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col   space-y-2">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                    className="h-10 rounded-xl w-[250px] sm:w-[350px] sm:h-16 md:w-[25vw] md:h-24 p-3  bg-white  "
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col   space-y-2">
                    <label htmlFor="">Confirmar contraseña:</label>
                    <input
                    className="h-10 rounded-xl w-[250px] sm:w-[350px] sm:h-16 md:w-[25vw] md:h-24 p-3  bg-white  "
                    type="password"
                    name="password2"
                    id="password2"
                    value={password2}
                    onChange={handleChange}
                    />
                </div>
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                >
                    Registrarse
                </button>
            </form>
            <div>
                <div className="flex flex-col items-center rounded-2xl content-center justify-evenly text-[4vw] sm:text-[24px] md:text-[32px] bg-black text-1xl text-white h-20 sm:h-32 md:h-44">
                    <p>¿Ya tienes una cuenta?</p>
                    <a href="" className="text-teal-500  underline decoration-solid ">
                        Inicia Sesión AQUÍ
                    </a>
                </div>
            </div>
        </div>
      
    </UsersLayout>
  )
}

export default Signup;
