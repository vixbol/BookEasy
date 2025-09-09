function toggleForms() {
  document.getElementById("loginForm").classList.toggle("d-none");
  document.getElementById("signupForm").classList.toggle("d-none");
}

const getSignUp = document.querySelector("#sign_up");

getSignUp.addEventListener("click", async () => {
  const dataAccounts = await getData(API_ACCOUNT);
  const getUserName = document.querySelector("#signupUsername");
  const getEmail = document.querySelector("#signupEmail");
  const getPassword = document.querySelector("#signupPassword");
  const getConfirm = document.querySelector("#signupConfirm");
  const check = dataAccounts.some(
    (e) => e.UserName == getUserName.value || e.Email === getEmail.value
  );
  if (check) {
    alert("username or email da su dung");
    return;
  }
  if (getPassword.value !== getConfirm.value) {
    alert("Mật khẩu không trùng khớp, vui lòng nhập lại");
    return;
  }

  const newAccount = {
    UserName: getUserName.value,
    Email: getEmail.value,
    Password: getPassword.value,
  };

  add(API_ACCOUNT, newAccount);
});

const getLogin = document.querySelector("#login");
getLogin.addEventListener("click", async () => {
  const dataAccounts = await getData(API_ACCOUNT);
  const getUserName = document.querySelector("#loginUsername");
  const getPassword = document.querySelector("#loginPassword");

  const check = dataAccounts.some(
    (e) =>
      (e.UserName == getUserName.value || e.Email === getUserName.value) &&
      e.Password === getPassword.value
  );
  if (!check) {
    alert("Sai tài khoản hoặc mật khẩu, vui lòng nhập lại");
    return;
  } else {
    window.location.href = "home.html";
  }
});
