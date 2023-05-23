function Validation(form) {
  let error = {};

  if (form.fullName === "") {
    error.fullName = "Ne peut etre vide";
  } else {
    error.fullName = "";
  }
  if (form.username === "") {
    error.username = "Ne peut etre vide";
  } else {
    error.username = "";
  }
  if (form.avatar === "") {
    error.avatar = "Ne peut etre vide";
  } else {
    error.avatar = "";
  }
  if (form.password !== form.confirmPassword) {
    error.confirmPassword = "Les mots de passes ne sont pas similaire"
  } else if (form.password === "") {
    error.password = "Ne peut etre vide"
  } else {
    error.confirmPassword = ""
  }
  return error;
}

export default Validation;