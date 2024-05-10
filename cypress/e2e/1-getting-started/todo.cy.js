//Identificacion.tsx
describe('Identificacion Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); 
  });


  it('Verificación de los campos del login', () => {
    cy.get('form').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });


  it('Mensajes de error con datos incorrectos', () => {
    cy.get('input[name="username"]').type('invaliduser');
    cy.get('input[name="password"]').type('invalidpassword');
    cy.get('button[type="submit"]').click();
    
  });


  //comprobaciones en el caso de que el login sea válido
  it('Envío de formulario con datos correctos', () => {
    cy.get('input[name="username"]').type('pepe_morales');
    cy.get('input[name="password"]').type('12345');
    cy.get('button[type="submit"]').click();
    
    //comprobación de que redirige a la pagina
    cy.url().should('include', '/pagina');


    //Pagina.tsx
    //verificación de que el botón de añadir proyecto esté presente y visible
    cy.get('.botoncin').should('exist').should('be.visible');

    //verificación que al menos un proyecto se muestra en la página
    cy.get('.proyecto').should('have.length.greaterThan', 0);

    //comprobacion de que se elimina el proyecto
    it('Eliminar proyecto', () => {
      //click en el botón de eliminar del primer proyecto
      cy.get('.proyecto:first-child .eliminar-btn').click();
  
      //comprobamos que el proyecto se ha eliminado
      cy.get('.proyecto').should('have.length.lessThan', initialProjectsCount);
    });
  
    it('Editar proyecto', () => {
      //click en el botón de editar del primer proyecto
      cy.get('.proyecto:first-child .editar-btn').click();
  
      //modificar los datos del proyecto
      cy.get('input[name="nombre"]').clear().type('Nuevo nombre');
      cy.get('input[name="descripcion"]').clear().type('Nueva descripción');
      cy.get('input[name="cuantia"]').clear().type('5000');
  
      //guardar los cambios
      cy.get('.guardar-btn').click();
  
      //comprobamos que los cambios se han guardado correctamente
      cy.get('.proyecto:first-child').contains('Nuevo nombre').should('exist');
      cy.get('.proyecto:first-child').contains('Nueva descripción').should('exist');
      cy.get('.proyecto:first-child').contains('$5000').should('exist');
    });


    //boton para cambiar a la pagina de añadir proyecto
    cy.get('.botoncin').click();

    

    //AñadirProj.tsx
    //Comprobación de que existen todos los campos 
    cy.get('h2').should('contain.text', 'Añadir Proyecto');
    cy.get('input[name="nombre"]').should('exist');
    cy.get('input[name="descripcion"]').should('exist');
    cy.get('input[name="cuantia"]').should('exist');
    cy.get('input[name="fecha_inicio"]').should('exist');
    cy.get('input[name="fecha_fin"]').should('exist');
    cy.get('select[name="id_staff"]').should('exist');
    cy.get('button[type="submit"]').should('exist');


    //metemos datos de comprobación
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

    //enviamos datos del proyecto nuevo
    cy.get('button[type="submit"]').click();


    //Comprobamos header
    cy.get('.header').should('exist');
    cy.get('.logo').should('exist');
    cy.get('.nav').should('exist');
    cy.get('.cerrarSesion').should('exist');

    cy.get('.nav-list').contains('Staff').click();
    cy.url().should('include', '/pagina2');


    //Pagina2.tsx
    cy.get('.staff').should('have.length.greaterThan', 0);

    cy.get('.botoncin').should('exist').should('be.visible');

    // Clicking the add project button
    cy.get('.botoncin').click();


    //AñadirStaff.tsx
    cy.get('input[name="nombre"]').should('exist');
    cy.get('input[name="apellidos"]').should('exist');
    cy.get('input[name="telefono"]').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="fechaNacimiento"]').should('exist');
    cy.get('.p-button-outlined').should('exist');


    //datos del staff
    //comprobación de que existen todos los campos
    cy.get('input[name="nombre"]').should('exist');
    cy.get('input[name="apellidos"]').should('exist');
    cy.get('input[name="telefono"]').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="fechaNacimiento"]').should('exist');
    cy.get('.p-button-outlined').should('exist');

    //datos de prueba
    const staffName = 'John';
    const staffLastName = 'Doe';
    const staffPhone = '123456789';
    const staffUsername = 'johndoe';
    const staffPassword = 'password123';
    const staffBirthDate = '1990-01-01';

    //llenar el formulario
    cy.get('input[name="nombre"]').type(staffName);
    cy.get('input[name="apellidos"]').type(staffLastName);
    cy.get('input[name="telefono"]').type(staffPhone);
    cy.get('input[name="username"]').type(staffUsername);
    cy.get('input[name="password"]').type(staffPassword);
    cy.get('input[name="fechaNacimiento"]').type(staffBirthDate);

    //interceptar la solicitud de inserción del staff
    cy.intercept('POST', 'http://localhost:4000/usuarios/insertar', {
      statusCode: 200,
      body: { message: 'Staff added successfully' }
    }).as('postStaff');


    //Footer
    cy.get('.footer').should('exist');

    cy.contains('Politica de privacidad').click()
    cy.url().should('include', '/poliPriv')
    cy.get('.cerrarPP').should('exist');
    cy.get('.cerrarPP').click();

    cy.contains('Contacto').click()
    cy.url().should('include', '/contacto')

    cy.get('input[id="name"]').should('exist');
    cy.get('input[id="email"]').should('exist');
    cy.get('textarea[id="message"]').should('exist');

    const name = 'John';
    const email = 'john@gmail.com';
    const message = 'Prueba';

    //llenar el formulario
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="email"]').type(email);
    cy.get('textarea[id="message"]').type(message);

    cy.get('.enviar').click();
    
    //Cerramos sesion y destruimos cookie
    cy.get('.cerrarSesion').click();
    cy.getCookie('username').should('not.exist');
    cy.url().should('eq', 'http://localhost:5173/');
    
  });
});

