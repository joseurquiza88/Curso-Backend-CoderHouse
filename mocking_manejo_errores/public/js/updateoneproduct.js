//Actualizacion del producto que esta en el handlebars product form segun el id
const updateProductForm = document.getElementById('updateProductForm');
updateProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();
// Divide la URL usando "/" como separador
const pid = window.location.pathname.split('/').pop();
console.log(pid)
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const category = document.getElementById('category').value;
  const availability = parseInt(document.getElementById('availability').value);
  const updateProducto = {
    name,
    description,
    price,
    category,
    availability,
  };
  // Realiza una solicitud POST al servidor para crear el producto
  try {
    const response = await fetch(`/api/updateproducts/${pid}`,  {
      method: 'PUT',// ponemos un put para poder actualizar los datos
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateProducto), 
    });

    if (response.ok) {
        console.log('Producto actualizado con éxito',updateProducto);
        window.location.href = "/api/updateproducts/"; 
       } else {
        console.error('Error al actualizar el producto:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
});
