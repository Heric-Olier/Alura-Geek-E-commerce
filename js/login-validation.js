const fieldEmail = document.getElementById("email");
const fieldPassword = document.getElementById("password");
const btnLogin = document.querySelector("form__btn");
const errorMessage = document.querySelector(".error__message");

export const showMessageError = (message) => {
  errorMessage.innerHTML = message;
  errorMessage.classList.add("active");
};


const login = async (email, password) => {
  try {
    const response = await fetch(
      "https://alura-geek-fake-appi-server.herokuapp.com/profile"
    );
    const data = await response.json();
    data.forEach((user) => {
      const { email: userEmail, password: userPassWord } = user;
      if (email === userEmail && password === userPassWord) {
        console.log("Usuario logeado");
        setTimeout(() => {
          window.location.href = "./all-products.html";
        }, 1500);
        showLoading();
        showMessageError("Usuario logeado");
        return true;
      } else {
        showMessageError("Usuario o contraseña incorrectos");
        return false;
      }
    });
    return false;
  } catch (error) {
    console.log(error);
  }
};

const validateLogin = () => {
  const email = fieldEmail.value;
  const password = fieldPassword.value;
  if (email === "" || password === "") {
    showMessageError("Por favor, complete todos los campos");
    return false;
  } else {
    return true;
  }
};

const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateLogin()) {
    login(fieldEmail.value, fieldPassword.value);
  }
});
