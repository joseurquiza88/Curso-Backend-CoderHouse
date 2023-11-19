//Buton de ceerar sesion, segun profe
const logout= document.getElementById("logout-button")
logout.addEventListener("click", async (event) => {
  event.preventDefault();

      const response = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  // Si cierra sesion vuelve a la pagina de inicio - Redireccion
      if (response.ok) {
        window.location.href = "/"; 
      } else {
        console.error("Error al cerrar sesión");
      }
 
  });
  