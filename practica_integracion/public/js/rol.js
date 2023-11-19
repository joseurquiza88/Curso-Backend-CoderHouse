// Cambiar el rol usuario-admin
document.querySelectorAll('.change-role-button').forEach(button => {
    button.addEventListener('click', moveToChangeRole);
  });
  function moveToChangeRole(event) {
    event.preventDefault();
    const userId = event.target.id;
    fetch(`/api/users/premium/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (response.ok) {
        // Redirigir al carrito
        window.location.href = `/api/users/premium/${userId}`;
      } else {
        // Lanzamos error
        throw new Error('Error al ir a modificar rol');
      }
    })
    .catch(error => {
      alert(error.message);
    });
  }
  
  //Formulario para cambiar el rol
  const changeUserForm = document.getElementById('update-role-user-form');
  changeUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Rol seleccionado en el formulario
    const newRole = document.getElementById('newRole').value.toString();
    // Guardamos email del formulario
    const userEmail = document.getElementById('userEmail').value;
    // Realiza una solicitud GET para obtener el ID del usuario por correo electrónico
    try {
      const response = await fetch(`/api/users/byemail/${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Obtiene el ID del usuario 
        const userId = await response.json();
        // Cambia el rol segun el id seleccionado
        const updateResponse = await fetch(`/api/users/premium/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newRole }),
        });
  
        if (updateResponse.ok) {
          console.log('Rol de usuario actualizado con éxito', newRole);
          // Borra los campos de entrada estableciendo sus valores en cadena vacía
          document.getElementById('newRole').value = '';
          document.getElementById('userEmail').value = '';
        } else {
          console.error('Error: no se pudo actualizar el usuario:', updateResponse.statusText);
        }
      } else {
        console.error('Error: ID del usuario incorrecto:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  });