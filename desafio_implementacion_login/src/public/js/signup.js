async function postSignup(first_name, last_name, age, username, password) {
  const data = {
    first_name,
    last_name,
    age,
    email: username,// del backend se llama email no username
    password,
  };

  console.log("all  the data", data);
  const response = await fetch("/api/session/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (result.respuesta === "ok") {

    window.alert('Creacion de usuario exitosa en signup');
    console.error("Creacion de usuario exitosa");
    window.location.href = "/"; 
  } else {
    console.log(result); // Muestra los datos en caso de error
  }
  return result;
}

const signupForm = document.getElementById("signup-form");
  
  signupForm.addEventListener("submit", function (event) {
    console.log("tracking");
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const age = document.getElementById("age").value;
  
    postSignup(first_name, last_name, age, username, password).then((datos) =>
      console.log(datos)
    );
  });