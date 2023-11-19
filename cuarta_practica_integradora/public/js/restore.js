 // Para enviar el correo de recuperación
document.getElementById("restore-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;   
    fetch("/sendmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
        } else {
          alert("No se pudo enviar el correo de recuperación");
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
  });
  
    // Función para enviar correos de recuperación
function enviarCorreoRecuperacion(destinatario, enlaceRecuperacion) {
    const mailOptions = {
      from: "tu_correo@gmail.com",
      to: destinatario,
      subject: "Recuperación de Contraseña",
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${enlaceRecuperacion}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo de recuperación:", error);
      } else {
        console.log("Correo de recuperación enviado:", info.response);
      }
    });
  }