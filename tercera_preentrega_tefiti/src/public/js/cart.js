// Obtener el contenedor donde se mostrará el carrito seleccionado
document.querySelectorAll('.cart-button').forEach(button => {
  button.addEventListener('click', moveToCart);
});

function moveToCart(event) {
  event.preventDefault();
  const cartId = event.target.id;
 
  fetch(`/api/carts/${cartId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Redireccionamos a carts Id
      window.location.href = `/api/carts/${cartId}`;
    } else {
      //Lanzamos error
      throw new Error('Error al buscar el carrito');
    }
  })
  .catch(error => {
    alert(error.message);
  });
}