import nodemailer from 'nodemailer;'

// transporte de nodemailer para enviar correos
const transporter = nodemailer.createTransport({
  service: "GMAIL", 
  auth: {
    user: "lucianoayrala@gmail.com",
    pass: "tu_contraseña",
  },
});

// Correos de recuperación
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