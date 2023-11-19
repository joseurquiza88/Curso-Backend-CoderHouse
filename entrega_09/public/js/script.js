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


  // Lógica para agregar el producto al carrito****
  document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', addToCart);
  });
  
  function addToCart(event) {
    event.preventDefault();
  
    let cartId = prompt("Ingrese el id de su carrito");
    if (!cartId ) {
      return; // Salir de la función si el usuario cancela
    }
  
    const pid = event.target.id;
  
    fetch(`http://localhost:8080/api/carts/${cartId}/product/${pid}`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }
   
    

  // Lógica para mostrar los detalles del producto
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
      if (response.ok) {
        window.location.href = `http://localhost:8080/api/products/${productId}`;
      } else {
        throw new Error('Error al ir al detalle');
      }
    } catch (error) {
      alert(error.message);
    }
    
  });
});

  