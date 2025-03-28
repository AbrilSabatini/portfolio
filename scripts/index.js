async function fetchUsers() {
  const userList = document.getElementById("user-list");
  const loader = document.getElementById("loader");

  // Muestra el cargador
  loader.style.display = "block";

  try {
    const response = await fetch(
      "https://portfolio-backend-1zhb.onrender.com/users/"
    );
    const users = await response.json();

    users.forEach((user) => {
      const listItem = document.createElement("li");
      const button = document.createElement("button");

      // Botón con el nombre del usuario
      button.textContent = user.name;
      button.classList.add("btn-border", "btn");
      button.addEventListener("click", () => {
        localStorage.setItem("userId", user.id);
        window.location.href = "user.html";
      });

      listItem.appendChild(button);
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  } finally {
    // Oculta el cargador cuando termina la carga
    loader.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", fetchUsers);
