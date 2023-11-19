//Creamos el producto por el form
const createProductForm = document.getElementById('createProductForm');

createProductForm && createProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const category = document.getElementById('category').value;
  const availability = parseInt(document.getElementById('availability').value);
//creamos producto
const ownerId = document.getElementById("createProductButton").getAttribute("data-user-id");
 console.log(ownerId)
    const nuevoProducto = { name, description, price, category, availability, owner: ownerId};//ID del usuario 

  // Realiza una solicitud POST al servidor para crear el producto
  try {
    const response = await fetch('/api/updateproducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto), // Envía los datos como JSON
    });

    if (response.ok) {
        console.log('Producto creado con éxito');
        window.location.href = "/api/updateproducts"; 
       } else {
        console.error('Error al crear el producto:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
});


//Eliminacion de producto a partir de boton
document.querySelectorAll('.button-delete-product').forEach(button => {
button.addEventListener('click',  async (event) => {
        const productId = event.target.id;
        try {
            const response = await fetch(`http://localhost:8080/api/updateproducts/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                  },
                });
            if (response.ok) {
                // El producto se eliminó con éxito
                console.log('Producto eliminado con éxito');
                location.reload(); // Recarga la página actual
            } else {
                
                console.error('Error al eliminar el producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    });
});


//Actualizacion de un producto
document.querySelectorAll(".button-to-update-product").forEach((button) => {
  button.addEventListener("click", moveToUpdateProduct);
});

function moveToUpdateProduct(event) {
  event.preventDefault();

  const productId = event.target.id;

  fetch(`/api/updateproducts/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Redireccion
        window.location.href = `/api/updateproducts/${productId}`;
      } else {
        // Manejo de errores
        throw new Error("Error al ir a actualizar prodcuto");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}
