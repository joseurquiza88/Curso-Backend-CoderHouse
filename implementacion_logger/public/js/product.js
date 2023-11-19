// Funcion para hacer el reder de los productos, como lo teniamos antes 
function renderPagination(data) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    if (data.hasPrevPage) {
      const prevLink = document.createElement('a');
      prevLink.href = data.prevLink;
      prevLink.textContent = 'Previous Page';
      paginationDiv.appendChild(prevLink);
    }
    if (data.hasNextPage) {
      const nextLink = document.createElement('a');
      nextLink.href = data.nextLink;
      nextLink.textContent = 'Next Page';
      paginationDiv.appendChild(nextLink);
    }
  }

  // Boton para agregar productos al carrito
  document.querySelectorAll('.button-add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
  
  function addToCart(event) {
    event.preventDefault();
  
    const cartId = event.target.getAttribute("data-cart-id");
    const pid = event.target.id;
  // fetch con post
    fetch(`/api/carts/${cartId}/product/${pid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    })
    .then(response => response.json())
     .then(data => console.log("Producto agregado al carrito con exito!!"))
    .catch(error => {//atrapamos error
      console.log('Error:', error);
    });
  }
   
   // Mostramos detalle
document.querySelectorAll('.view-details-button').forEach(button => {
  button.addEventListener('click',  async (event) => {
     const productId = event.target.id;
 try {
    const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // Maneja la respuesta de la API
    if (response.ok) {//si da ok redireccion
      window.location.href = `http://localhost:8080/api/products/${productId}`;
    } else {
      throw new Error('Error al ir al detalle');
    }
  } catch (error) {
    alert(error.message);
  }
  
});
});