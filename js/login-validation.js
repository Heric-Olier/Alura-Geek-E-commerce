const fieldEmail = document.getElementById("email");
const fieldPassword = document.getElementById("password");
const btnLogin = document.querySelector("form__btn");
const errorMessage = document.querySelector(".error__message");
const btnUserContainer = document.querySelector(".btn-user-container");
const loginIcon = document.querySelector(".fa-user");
const mainBtnEditRemove = document.querySelector(".main-btns-edit-remove");
const loginLoadingArea = document.querySelector(".login__loading-area");

export const showMessageError = (message) => {
  errorMessage.innerHTML = message;
  errorMessage.classList.add("active");
};

// guardamos el usuario en sessionStorage

const setUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

// recuperamos el usuario de sessionStorage

const getUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

const login = async (email, password) => {
  try {
    const response = await fetch(
      "https://alura-geek-fake-appi-server.herokuapp.com/profile"
    );
    const data = await response.json();

    getUser();
    data.forEach((user) => {
      const { email: userEmail, password: userPassWord } = user;
      if (email === userEmail && password === userPassWord) {
        setUser(user);
        addUserIcon();
        setTimeout(() => {
          window.location = "./all-products.html";
          loginLoadingArea.classList.remove("active");
        }, 1800);

        btnUserContainer.classList.add("active");
        return true;
      } else {
        loginLoadingArea.classList.remove("active");
        showMessageError("Email o contraseña incorrectos");
        fieldEmail.focus();
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
    fieldEmail.focus();
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
    loginLoadingArea.classList.add("active");
  }
});

// creamos una funcion para agregar el icono de usuario al boton de login
const addUserIcon = () => {
  const user = getUser();
  const urlPage = window.location.pathname;
  if (user) {
    btnUserContainer.classList.add("active");
    if (btnUserContainer.classList.contains("active")) {
      loginIcon.addEventListener("click", () => {
        window.location = "./all-products.html";
      });
    }

    if (!user && urlPage === "./all-products.html") {
      showMessageError("Por favor, inicie sesión");
    }
  }
};
addUserIcon();