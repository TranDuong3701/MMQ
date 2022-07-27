const usernameElement = document.getElementById("username");
const passwordElement = document.getElementById("password");

const btnLogin = document.getElementById("btn-login");

const login = async (username, password) => {
  const apiUrl = "http://localhost:8000/api/auth/login";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch(apiUrl, options);
  const data = await response.json();

  return data;
};

btnLogin.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = await login(usernameElement.value, passwordElement.value);

  if (data.status === "success") {
    location.href = "/";
  }
});
