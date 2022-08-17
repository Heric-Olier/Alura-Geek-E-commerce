const errorMessage = document.querySelector(".error__message");

const showMessageError = (message) => {
    errorMessage.innerHTML = message;
    errorMessage.classList.add("active");
  };
  
  export const alerts = {showMessageError};