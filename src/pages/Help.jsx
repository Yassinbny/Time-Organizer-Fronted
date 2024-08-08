import ProfileLayout from "../layouts/ProfileLayout";
import { useState } from "react";

const Help = () => {
    const [openFaq, setOpenFaq] = useState(null);
  
    const faqData = [
      {
        question: '¿Qué es esta aplicación?',
        answer: `
            <p>Nuestra aplicación web combina diferentes tipos de calendarios (diario, semanal y mensual) donde apuntar tus eventos y, si lo necesitas, añadir una lista de tareas para ayudarte a organizar tus actividades diarias con más detalle.</p><br>
            <p>Puedes programar eventos, establecer tus propios códigos de color y gestionar tus tareas pendientes en un solo lugar.</p>
        `,
      },
      {
        question: '¿Cómo anotar un evento en el calendario?',
        answer: `
            <p>Ve a la pestaña "Calendarios" que hay en tu barra de navegación. </p><br>
            <p>Haz click en el botón "Crear evento" y te aparecerá una ventana emergente que tendrás que rellenar.</p><br> 
            <p>Todos los campos son obligatorios, así que asegúrate de no dejar ninguno vacío. </p><br>
            <p>También comprueba que las fechas son correctas, ya que la fecha de fin de la tarea no puede ser anterior a la fecha de inicio. </p><br>
            <p>Cuando lo tengas todo completado, haz click en el botón "Añadir" para que tu tarea se guarde en el calendario.</p><br> 
            <p>Recuerda entrar en el calendario semanal o mensual, según la fecha que hayas puesto, para poder acceder a la tarea. Sino, siempre podrás buscarla en el botón de "Filtrar".</p>`,
      },
      {
        question: '¿Qué hago si no encuentro una tarea creada?',
        answer: `
            <p>Si es una tarea que aún no ha ocurrido y está pendiente, ve a la pestaña "Calendarios" que hay en tu barra de navegación.</p><br>
            <p>Haz click en el botón "Filtrar" y te aparecerá una ventana emergente que tendrás que rellenar. </p><br>
            <p>Puedes hacer la búsqueda según el nombre o descripción de la tarea, o, si no lo recuerdas, puedes buscar según el color que tenga o a la familia a la que pertenezca (casa, trabajo, deporte...). </p><br>
            <p>Tras haber seleccionado tu filtro, pulsa el botón "Filtrar" y te aparecerá.</p>`,
      },
      {
        question: '¿Cómo personalizo mi avatar?',
        answer: `
            <p>Ve a la pestaña de "Perfil" que hay en tu barra de navegación.</p><br> 
            <p>Haz click en el icono de la cámara que hay bajo el círculo que contiene el avatar. </p><br>
            <p>Aparecerá una ventana emergente donde tendrás que seleccionar la nueva imagen de entre tus archivos.</p><br> 
            <p>Recuerda que sólo podrás poner imágenes, es decir, archivos con extensión .jpg, .jpeg, .png o .gif . </p><br>
            <p>Acepta para registrar el cambio, ¡y listo! Ya tienes tu avatar personalizado.</p>`,
      },
      {
        question: '¿Cómo cambio mi nombre de usuario?',
        answer: `
            <p>Ve a la pestaña de "Perfil" que hay en tu barra de navegación.</p><br>
            <p>Haz click en el recuadro que tiene tu nombre de usuario y escribe el nuevo nombre que quieras.</p> <br>
            <p>Después pincha sobre el botón de guardar que hay al final del recuadro para registrar el cambio, ¡y listo! Nombre de usuario cambiado.</p>`,
      },
      {
        question: '¿Cómo modifico mi contraseña?',
        answer: `
            <p>Ve a la pestaña de "Perfil" que hay en tu barra de navegación.</p> <br>
            <p>Haz click en el lápiz que hay sobre el recuadro que tiene tu contraseña. </p><br>
            <p>Aparecerá una ventana emergente donde tendrás que escribir tu contraseña actual y, a continuación, la nueva contraseña que quieras poner. </p><br>
            <p>Recuerda que las contraseñas no pueden coincidir entre sí, y que deben tener, al menos, 8 caracteres. </p><br>
            <p>Después pincha sobre el botón "Cambiar" para registrar el cambio, ¡y listo! Contraseña cambiada.</p>`,
      },
      {
        question: '¿Qué hago si no recuerdo mi contraseña?',
        answer: `
            <p>En ese caso, ve a la página de inicio de sesión. </p><br>
            <p>Debajo del campo donde debe ir tu contraseña, hay un enlace que pone: "¿olvidaste tu contraseña?". Haz click en la frase y te llevará a una página para recuperar tu contraseña. </p><br>
            <p>Tendrás que poner tu email para que te envíen un código con el que reestablecer la contraseña. </p><br>
            <p>Sigue las indicaciones y tendrás una nueva contraseña rápidamente.</p>`,
      },
      {
        question: '¿Qué hago si no recibo el correo para reestablecer mi contraseña?',
        answer: `
        <p>Primero asegúrate que no lo tienes en Spam. Segundo, recarga la página por si aún no ha entrado el correo. </p><br>
        <p>Si pasados unos minutos sigues sin recibir nada, vuelve a la página de iniciar sesión y vuelve a introducir tu correo electrónico. Asegúrate que no hay errores al escribirlo.</p><br>`,
      },
      
    ];
  
    return (
        <ProfileLayout>
            <div className="flex flex-col justify-content w-full h-[80vh] md:h-full mx-auto overflow-y-auto">
                <h1 className="pb-6 md:py-12 lg:py-20 text-xl md:text-2xl lg:text-4xl font-bold">AYUDA</h1>
                {faqData.map((item, index) => (
                <div
                    key={index}
                    className="border p-2 lg:p-5 md:p-3  mb-4 cursor-pointer "
                    onClick={() => setOpenFaq(index === openFaq ? null : index)}
                >
                    <h3 className="font-semibold text-start text:base lg:text-2xl">{item.question}</h3>
                    {openFaq === index && (
                        <div className="mt-2 font-normal text-start"  dangerouslySetInnerHTML={{ __html: item.answer }} />
                    )}
                </div>
                ))}
            </div>
        </ProfileLayout>
    );
  };

export default Help;
