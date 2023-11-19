//Documentos
document.querySelectorAll('.go-to-up-document').forEach(button => {
    button.addEventListener('click', moveToUpDocument);
  });
  function moveToUpDocument(event) {
    event.preventDefault();
  
    const userId = event.target.id;   
    fetch(`/api/users/${userId}/documents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        window.location.href = `/api/users/${userId}/documents`;
      } else {
        throw new Error('Error de documentos');
      }
    })
    .catch(error => {
      alert(error.message);
    });
  }