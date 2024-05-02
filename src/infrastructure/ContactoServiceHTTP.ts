// src/infrastructure/ContactoServiceHTTP.ts

export const enviarMensajeHTTP = async (name, email, message) => {
    // Lógica para enviar el mensaje a través de una solicitud HTTP
    try {
        const response = await fetch('URL_DE_TU_API', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });
        if (!response.ok) {
            throw new Error('Error al enviar el mensaje');
        }
        alert('¡Mensaje enviado con éxito!');
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        alert('Error al enviar el mensaje');
    }
};
