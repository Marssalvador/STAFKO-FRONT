// src/application/ContactoService.ts

export const enviarMensaje = (name, email, message) => {
    // Lógica para enviar el mensaje
    alert(`Mensaje enviado: Nombre: ${name}, Email: ${email}, Mensaje: ${message}`);
};

export const enviarEmail = (name, email, message) => {
    // Lógica para enviar el email
    const mailtoLink = `mailto:stafko@gmail.com?subject=Contacto desde formulario&body=Nombre: ${name}%0DEmail: ${email}%0DMensaje: ${message}`;
    window.location.href = mailtoLink;
};
