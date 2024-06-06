//Identificacion.tsx
describe('Identificacion Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Verificación de los campos del login', () => {
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('Mensajes de error con datos incorrectos', () => {
    cy.get('input[name="email"]').type('invaliduser@example.com');
    cy.get('input[name="password"]').type('invalidpassword');
    cy.get('button[type="submit"]').click();

    //verifica que se muestra un mensaje de error
    cy.get('.error-message').should('exist'); 
  });

  //comprobaciones en el caso de que el login sea válido
  it('Envío de formulario con datos correctos', () => {
    cy.get('input[name="email"]').type('pepe@example.com');
    cy.get('input[name="password"]').type('12345');
    cy.get('button[type="submit"]').click();

    //comprobación de que redirige a la pagina
    cy.url().should('include', '/pagina');


    //Pagina.tsx
    //verificación de que el botón de añadir proyecto esté presente y visible
    it('Verifica que el botón de añadir proyecto esté presente y visible', () => {
      cy.get('.botoncin').should('exist').should('be.visible');
    });

    it('Verifica que al menos un proyecto se muestra en la página', () => {
      cy.get('.proyecto').should('have.length.greaterThan', 0);
    });

    it('Comprueba que se elimina el proyecto', () => {
      let initialProjectsCount;

      cy.get('.proyecto').then(($projects) => {
        initialProjectsCount = $projects.length;
      });

      cy.get('.proyecto:first-child .p-button-danger').click(); 
      cy.get('.proyecto').should(($projects) => {
        expect($projects).to.have.length.lessThan(initialProjectsCount);
      });
    });

    it('Comprueba que se edita el proyecto', () => {
      cy.get('.proyecto:first-child .p-button-info').click(); 
      cy.get('input[name="nombre"]').clear().type('Nuevo nombre');
      cy.get('input[name="descripcion"]').clear().type('Nueva descripción');
      cy.get('input[name="cuantia"]').clear().type('5000');
      cy.get('.guardar-btn').click();

      cy.get('.proyecto:first-child').contains('Nuevo nombre').should('exist');
      cy.get('.proyecto:first-child').contains('Nueva descripción').should('exist');
      cy.get('.proyecto:first-child').contains('$5000').should('exist');
    });

    it('Verifica la redirección a la página de añadir proyecto', () => {
      cy.get('.botoncin').click();
      cy.url().should('include', '/pagina/añadir-proyecto');
    });


    //AñadirProj.tsx
    //comprobación de que existen todos los campos 
    it('Comprueba la existencia de todos los campos', () => {
      cy.get('h2', { timeout: 10000 }).should('contain.text', 'Añadir Proyecto');
  
      cy.get('input[name="nombre"]').should('exist');
      cy.get('input[name="descripcion"]').should('exist');
      cy.get('input[name="cuantia"]').should('exist');
      cy.get('input[name="fecha_inicio"]').should('exist');
      cy.get('input[name="fecha_fin"]').should('exist');
      cy.get('select[name="id_staff"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
  
      //datos de prueba
      const projectName = 'Test Project';
      const projectDescription = 'This is a test project';
      const projectAmount = '10000';
      const startDate = '2024-04-10';
      const endDate = '2024-04-30';
  
      cy.get('input[name="nombre"]').type(projectName).should('have.value', projectName);
      cy.get('input[name="descripcion"]').type(projectDescription).should('have.value', projectDescription);
      cy.get('input[name="cuantia"]').type(projectAmount).should('have.value', projectAmount);
      cy.get('input[name="fecha_inicio"]').type(startDate).should('have.value', startDate);
      cy.get('input[name="fecha_fin"]').type(endDate).should('have.value', endDate);
  
      cy.intercept('POST', 'http://localhost:4000/proyecto/insertar', { statusCode: 200, body: { message: 'Project added successfully' } }).as('postProject');
  
      //envio de formulario
      cy.get('button[type="submit"]').click();
  
      cy.get('.header').should('exist');
      cy.get('.logo').should('exist');
      cy.get('.nav').should('exist');
      cy.get('.cerrarSesion').should('exist');
  
      cy.get('.nav-list').contains('Staff').click();
  
      cy.url().should('include', '/pagina2');
    });


    //Pagina2.tsx
    it('Comprueba la existencia de usuarios y botón para añadir usuarios', () => {

       //espera a que los elementos del personal estén disponibles
       cy.get('.staff', { timeout: 10000 }).should('have.length.greaterThan', 0);
  
       //verifica la visibilidad del botón de añadir usuario
       cy.get('.botoncin').should('exist').should('be.visible');
   
       //haciendo clic en el botón de añadir usuario
       cy.get('.botoncin').click(); 
  
    });


    //AñadirUsuarios.tsx
    it('Debe mostrar todos los campos requeridos para añadir un usuario', () => {
      cy.get('input[name="nombre"]').should('exist');
      cy.get('input[name="apellidos"]').should('exist');
      cy.get('input[name="telefono"]').should('exist');
      cy.get('input[name="username"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('input[name="fechaNacimiento"]').should('exist');
      cy.get('.p-button-outlined').should('exist');
    });
  
    it('Debe llenar el formulario de añadir usuarios y enviar la solicitud correctamente', () => {
      
      //datos de prueba para el nuevo usuario
      const staffName = 'John';
      const staffLastName = 'Doe';
      const staffPhone = '123456789';
      const staffUsername = 'johndoe';
      const staffPassword = 'password123';
      const staffBirthDate = '1990-01-01';
  
      //llenar el formulario con los datos del nuevo usuario
      cy.get('input[name="nombre"]').type(staffName);
      cy.get('input[name="apellidos"]').type(staffLastName);
      cy.get('input[name="telefono"]').type(staffPhone);
      cy.get('input[name="username"]').type(staffUsername);
      cy.get('input[name="password"]').type(staffPassword);
      cy.get('input[name="fechaNacimiento"]').type(staffBirthDate);
  
      //hacer clic en el botón para enviar el formulario
      cy.get('.p-button-outlined').click();
  
      //esperar a la respuesta de la solicitud
      cy.wait('@postStaff').then((interception) => {
        //verificar que la respuesta sea exitosa
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body.message).to.equal('Staff added successfully');
      });
    });


    //footer
    cy.get('.footer').should('exist');

    //navegar a la política de privacidad y verificar la URL
    cy.contains('Politica de privacidad').click()
    cy.url().should('include', '/poliPriv')
    cy.get('.cerrarPP').should('exist');
    cy.get('.cerrarPP').click();

    //navegar a la sección de contacto y verificar la URL
    cy.contains('Contacto').click()
    cy.url().should('include', '/contacto')

    //verificar la existencia de campos en el formulario de contacto
    cy.get('input[id="name"]').should('exist');
    cy.get('input[id="email"]').should('exist');
    cy.get('textarea[id="message"]').should('exist');

    //datos para el formulario de contacto
    const name = 'John';
    const email = 'john@gmail.com';
    const message = 'Prueba';

    //llenar el formulario de contacto
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="email"]').type(email);
    cy.get('textarea[id="message"]').type(message);

    //enviar el formulario de contacto
    cy.get('.enviar').click();
    
    //cerrar sesión y verificar que la cookie de usuario ya no existe
    cy.get('.cerrarSesion').click();
    cy.getCookie('username').should('not.exist');
    cy.url().should('eq', 'http://localhost:5173/');
  });

});

