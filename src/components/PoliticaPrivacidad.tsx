import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export const PoliticaPrivacidad = () => {
    const [visible, setVisible] = useState(true);

    const onHide = () => {
        setVisible(false);
        window.history.back(); //vuelve a la página anterior al cerrar el modal
    };

    const footer = (
        <div>
            <Button className='cerrarPP' label="Aceptar" icon="pi pi-check" onClick={onHide} autoFocus />
        </div>
    );

    return (
        <Dialog
            header="Política de privacidad de STAFKO"
            visible={visible}
            style={{width: '20vw'}}
            onHide={onHide}
            footer={footer}
            modal
            className="p-dialog-content"
        >
            
        <div>
            <p>
                Esta Política de privacidad describe cómo se recopila, utiliza y comparte su información personal cuando visita o hace una compra en www.stafko.com 
                <br />
                <br />
                INFORMACIÓN PERSONAL QUE RECOPILAMOS
                <br />
                Cuando visita el Sitio, recopilamos automáticamente cierta información sobre su dispositivo, incluida información sobre su navegador web, dirección IP, zona horaria y algunas de las cookies que están instaladas en su dispositivo. Además, a medida que navega por el Sitio, recopilamos información sobre las páginas web individuales o los productos que ve, las páginas web o los términos de búsqueda que lo remitieron al Sitio e información sobre cómo interactúa usted con el Sitio. Nos referimos a esta información recopilada automáticamente como “Información del dispositivo”.

                Recopilamos Información del dispositivo mediante el uso de las siguientes tecnologías:

                COOKIES

                Aquí tienes una lista de cookies que utilizamos. Las enlistamos para que puedas elegir si quieres optar por quitarlas o no.

                _session_id, unique token, sessional, Allows Shopify to store information about your session (referrer, landing page, etc).

                _shopify_visit, no data held, Persistent for 30 minutes from the last visit, Used by our website provider’s internal stats tracker to record the number of visits

                _shopify_uniq, no data held, expires midnight (relative to the visitor) of the next day, Counts the number of visits to a store by a single customer.

                cart, unique token, persistent for 2 weeks, Stores information about the contents of your cart.

                _secure_session_id, unique token, sessional

                storefront_digest, unique token, indefinite If the shop has a password, this is used to determine if the current visitor has access.
                - Los “Archivos de registro” rastrean las acciones que ocurren en el Sitio y recopilan datos, incluyendo su dirección IP, tipo de navegador, proveedor de servicio de Internet, páginas de referencia/salida y marcas de fecha/horario.
                    - Las “balizas web”, las “etiquetas” y los “píxeles” son archivos electrónicos utilizados para registrar información sobre cómo navega usted por el Sitio.
                
                <br />
                Además, cuando hace una compra o intenta hacer una compra a través del Sitio, recopilamos cierta información de usted, entre la que se incluye su nombre, dirección de facturación, dirección de envío, información de pago (incluidos los números de la tarjeta de crédito, dirección de correo electrónico y número de teléfono.  Nos referimos a esta información como “Información del pedido”.

                Cuando hablamos de “Información personal” en la presente Política de privacidad, nos referimos tanto a la Información del dispositivo como a la Información del pedido.

                <br />
                <br />
                ¿CÓMO UTILIZAMOS SU INFORMACIÓN PERSONAL?

                Usamos la Información del pedido que recopilamos en general para preparar los pedidos realizados a través del Sitio (incluido el procesamiento de su información de pago, la organización de los envíos y la entrega de facturas y/o confirmaciones de pedido).  Además, utilizamos esta Información del pedido para: comunicarnos con usted;
                examinar nuestros pedidos en busca de fraudes o riesgos potenciales; y cuando de acuerdo con las preferencias que usted compartió con nosotros, le proporcionamos información o publicidad relacionada con nuestros productos o servicios.

                Utilizamos la Información del dispositivo que recopilamos para ayudarnos a detectar posibles riesgos y fraudes (en particular, su dirección IP) y, en general, para mejorar y optimizar nuestro Sitio (por ejemplo, al generar informes y estadísticas sobre cómo nuestros clientes navegan e interactúan con el Sitio y para evaluar el éxito de nuestras campañas publicitarias y de marketing).

                <br />
                <br />
                COMPARTIR SU INFORMACIÓN PERSONAL

                Compartimos su Información personal con terceros para que nos ayuden a utilizar su Información personal, tal como se describió anteriormente.  Por ejemplo, utilizamos la tecnología de Shopify en nuestra tienda online. Puede obtener más información sobre cómo Shopify utiliza su Información personal aquí: https://www.shopify.com/legal/privacy.  También utilizamos Google Analytics para ayudarnos a comprender cómo usan nuestros clientes el Sitio. Puede obtener más información sobre cómo Google utiliza su Información personal aquí: https://www.google.com/intl/es/policies/privacy/.  Puede darse de baja de Google Analytics aquí: https://tools.google.com/dlpage/gaoptout.

                Finalmente, también podemos compartir su Información personal para cumplir con las leyes y regulaciones aplicables, para responder a una citación, orden de registro u otra solicitud legal de información que recibamos, o para proteger nuestros derechos.

                <br />
                <br />
                PUBLICIDAD ORIENTADA POR EL COMPORTAMIENTO
                Como se describió anteriormente, utilizamos su Información personal para proporcionarle anuncios publicitarios dirigidos o comunicaciones de marketing que creemos que pueden ser de su interés.  Para más información sobre cómo funciona la publicidad dirigida, puede visitar la página educativa de la Iniciativa Publicitaria en la Red ("NAI" por sus siglas en inglés) en http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.

                Puede darse de baja de la publicidad dirigida mediante los siguientes enlaces:
                
                Además, puede darse de baja de algunos de estos servicios visitando el portal de exclusión voluntaria de Digital Advertising Alliance en: ttp://optout.aboutads.info/.

                NO RASTREAR
                Tenga en cuenta que no alteramos las prácticas de recopilación y uso de datos de nuestro Sitio cuando vemos una señal de No rastrear desde su navegador.

                <br />
                <br />
                SUS DERECHOS
                Si usted es un residente europeo, tiene derecho a acceder a la información personal que tenemos sobre usted y a solicitar que su información personal sea corregida, actualizada o eliminada. Si desea ejercer este derecho, comuníquese con nosotros a través de la información de contacto que se encuentra a continuación.
                Además, si usted es un residente europeo, tenemos en cuenta que estamos procesando su información para cumplir con los contratos que podamos tener con usted (por ejemplo, si realiza un pedido a través del Sitio) o para perseguir nuestros intereses comerciales legítimos enumerados anteriormente.  Además, tenga en cuenta que su información se transferirá fuera de Europa, incluidos Canadá y los Estados Unidos.

                <br />
                <br />
                RETENCIÓN DE DATOS
                Cuando realiza un pedido a través del Sitio, mantendremos su Información del pedido para nuestros registros a menos que y hasta que nos pida que eliminemos esta información.

                MENORES
                El sitio no está destinado a personas menores de 18 años.

                <br />
                <br />
                CAMBIOS
                Podemos actualizar esta política de privacidad periódicamente para reflejar, por ejemplo, cambios en nuestras prácticas o por otros motivos operativos, legales o reglamentarios.
                CONTÁCTENOS
                Para obtener más información sobre nuestras prácticas de privacidad, si tiene alguna pregunta o si desea presentar una queja, contáctenos por correo electrónico a mars.salvadorcardoso@gmail.com o por correo mediante el uso de la información que se proporciona a continuación:

                <br />
                <br />
                Calle Stafko, N1, Granada, C, 18012, España
            </p>
        </div>
    </Dialog>
    );
};
