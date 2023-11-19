import chai from 'chai';
import supertest from 'supertest';

//   ---------    SESSIONS TEST    --------- 

//Inicializamos
const expect = chai.expect;
const request = supertest('http://localhost:8080');

describe('Pruebas para evaluar el segmento de la Sesion', () => {
//01. Test para crear la sesion de un usuario
  it('Creacion de una sesion para el usuario', async () => {
    const userCredentials = { username: 'usuario123', password: 'password123' };
    const response = await request.post('/sessions').send(userCredentials);
    expect(response.status).to.equal(200);
    // Tiene que devolver un objeto y debe tener la contraseña
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('token');
  });
// 02. Test de validacion de la contraseña
  it('Devuelve error si la contraseña es incorrecta', async () => {
    const invalidCredentials = { username: 'usuario123', password: '123password' };
    const response = await request.post('/sessions').send(invalidCredentials);
    //Credenciales invalida - Error 401
    expect(response.status).to.equal(401);
  });
// 03. Informacion del usuario
  it('Información del usuario después de la autenticación', async () => {
    const token = 'valid_token'; 
    const response = await request.get('/sessions/user').set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    // Tiene que ser del tipo objeto y tener un "usurname"
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('username');
  });
});