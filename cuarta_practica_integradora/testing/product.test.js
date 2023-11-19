import chai from 'chai';
import supertest from 'supertest';
//   ---------    PRODUCTS TEST    --------- 

//Inicializamos
const expect = chai.expect;
const request = supertest('http://localhost:8080');

describe('Pruebas para evaluar el segmento del Producto', () => {
    //01. Test de visualizacion de la lista de productos
  it('Devuelve una lista de productos', async () => {
    const response = await request.get('/products');
    expect(response.status).to.equal(200);
    //La lista tiene que ser de tipo array
    expect(response.body).to.be.an('array');
  });
//02. Test de Creacion de un nuevo producto
  it('Creación de un nuevo producto', async () => {
    const newProduct = { name: 'NewProduct', price: 9.99 };
    const response = await request.post('/products').send(newProduct);
    expect(response.status).to.equal(201);
    //tiene que estar incluido el nuevo producto
    expect(response.body).to.include(newProduct);
  });
//01. Test de actualizacion de producto
  it('Actualizacion de un producto', async () => {
    const updatedProduct = { name: 'Update', price: 12.99 };
    const response = await request.put('/products/1').send(updatedProduct);
    expect(response.status).to.equal(200);
    //tiene que estar incluido el producto actualizado
    expect(response.body).to.include(updatedProduct);
  });
});