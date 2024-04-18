import React, { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export const Contacto = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            alert('Por favor, complete todos los campos.');
            return;
        }
    };
    
    const sendEmail = (e) => {
      e.preventDefault();
      const mailtoLink = `mailto:stafko@gmail.com?subject=Contacto desde formulario&body=Nombre: ${name}%0DEmail: ${email}%0DMensaje: ${message}`;
      window.location.href = mailtoLink;
  };

    const handleShowAlert = () => {
        if (!name || !email || !message) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        alert('¡Mensaje enviado con éxito!');
    };

    return (
        <form onSubmit={handleSubmit} className="p-fluid" style={{background:'linear-gradient(to right, #a18205, #ff9800)', borderRadius:'20px'}}>
            <h1>Contáctanos</h1><br />
            <div className="p-field p-grid">
                <label htmlFor="name" className="p-col-fixed" style={{ width: '100px' }}>Nombre</label>
                <div className="p-col">
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-inputtext" required />
                </div>
            </div><br />
            <div className="p-field p-grid">
                <label htmlFor="email" className="p-col-fixed" style={{ width: '100px' }}>Email</label>
                <div className="p-col">
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-inputtext" required />
                </div>
            </div><br />
            <div className="p-field p-grid">
                <label htmlFor="message" className="p-col-fixed" style={{ width: '100px' }}>Motivo de contacto</label>
                <div className="p-col">
                    <InputTextarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} className="p-inputtext" />
                </div>
            </div><br />

            <div className="p-field">
                <Button onClick={handleShowAlert} label="Enviar mensaje" icon="pi pi-send" />
            </div><br />
            
            <div className="p-field">
                <Button type="submit" onClick={sendEmail} label="Prefiero mandar email" icon="pi pi-info-circle" />
            </div>

        </form>
    );
};
