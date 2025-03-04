async function loader() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "index.html"; // Redirigir si no hay usuario
    return;
  }

  const loader = document.getElementById("loader");
  loader.style.display = "block"; // Mostrar cargador

  fetch(`https://portfolio-backend-1zhb.onrender.com/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      const userData = data;

      localStorage.setItem("name", userData.name);
      localStorage.setItem("job_title", userData.jobTitle);
      localStorage.setItem("about_me", userData.about);
      localStorage.setItem("cv_link", userData.cvUrl);
      localStorage.setItem(
        "about_section",
        JSON.stringify(userData.aboutSections)
      );
      localStorage.setItem("projects", JSON.stringify(userData.projects));
      localStorage.setItem("experiences", JSON.stringify(userData.experiences));

      window.location.href = "user.html"; // Redirige al index
    })
    .catch((error) => console.error("Error al obtener usuarios:", error));
}

document.addEventListener("DOMContentLoaded", loader);
