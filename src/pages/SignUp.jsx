
import { Link, useNavigate } from 'react-router-dom';
import UsersLayout from '../layouts/UsersLayout.jsx'
import {useForm} from 'react-hook-form'

const SignUp = () => {

    const navigate = useNavigate();
    const {
        register, 
        handleSubmit, 
        formState:{errors},
        watch,
        reset
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    console.log(errors)        

    const onSubmit = handleSubmit( async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/auth/sign-up`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log(responseData)
            alert("Usuario registrado correctamente");
            reset(); 
            navigate("/confirm")           
        } catch (error) {
            console.log("Error al registrar usuario", error)
            alert("Error al registrar usuario");
        }

    })

  return (
    <UsersLayout componente={"Registrar usuario"}>
        <div className="flex flex-col justify-evenly w-full h-full content-center">
            <form 
                action=""
                noValidate
                onSubmit={onSubmit}
                className="flex flex-col items-center w-full h-full justify-evenly content-center text-base sm:text-lg md:text-3xl "
            >
                <div className="flex flex-col   space-y-2">
                    <label htmlFor="username">Nombre:</label>
                    <input
                    className="h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3  bg-white  "
                    type="text"
                    name="username"
                    id="username"
                    {...register("username", 
                        {required: {
                            value: true,
                            message: "El nombre es requerido"
                        },
                         minLength: {
                            value: 2,
                            message: "El nombre debe tener al menos 2 caracteres"
                         }})}
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                </div>
                <div className="flex flex-col   space-y-2">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                    className="h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3  bg-white  "
                    type="email"
                    name="email"
                    id='email'
                    {...register("email", {
                        required: {
                            value: true,
                            message: "El correo es requerido"
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: "El correo no es válido"
                        }
                    })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className="flex flex-col   space-y-2">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                    className="h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3  bg-white  "
                    type="password"
                    name='password'
                    id='password'
                    {...register("password", {
                        required: {
                            value: true,
                            message: "La contraseña es requerida"
                        },
                        minLength: {
                            value: 8,
                            message: "La contraseña debe tener al menos 6 caracteres"
                        }})}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div className="flex flex-col   space-y-2">
                    <label htmlFor="password2">Confirmar contraseña:</label>
                    <input
                    className="h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3  bg-white  "
                    type="password"
                    name='password2'
                    id='password2'
                    {...register("password2", {required: {
                        value: true,
                        message: "La confirmación de la contraseña es requerida"
                    },
                    validate: value => value === watch('password') || "Las contraseñas no coinciden"
                    })}
                    />
                </div>
                <button
                className="bg-black hover:bg-teal-500 text-white font-bold py-2 px-5 rounded-lg"
                type="submit"
                >
                    Registrarse
                </button>
            </form>
            <div>
                <div className="flex flex-col items-center rounded-xl content-center justify-evenly text-[2vw] sm:text-[16px] md:text-[24px] bg-black text-1xl text-white h-15 sm:h-16 md:h-22">
                    <p>¿Ya tienes una cuenta?</p>
                    <Link to="/login" className="text-teal-500  underline decoration-solid ">
                        Inicia Sesión AQUÍ
                    </Link>
                </div>
            </div>
        </div>
      
    </UsersLayout>
  )
}

export default SignUp
