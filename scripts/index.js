function startIndex() {
  const userId = "9ddb0230-669d-4f5b-9489-824bb5cbb088";

  fetch(`https://portfolio-backend-1zhb.onrender.com/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      const userData = data;
      console.log(userData);

      // Name Element
      const nameElement = document.querySelector(".name");
      if (nameElement && userData.name) {
        nameElement.textContent = userData.name;
      }

      // Job Title Element
      const jobTitleElement = document.querySelector(".job-title");
      if (jobTitleElement && userData.jobTitle) {
        jobTitleElement.textContent = userData.jobTitle;
      }

      // About Me Element
      const aboutElement = document.querySelector(".about-me");
      if (aboutElement && userData.about) {
        aboutElement.innerHTML = userData.about.replace(/\n/g, "<br>");
      }

      // CV Link Element
      const cvLinkElement = document.querySelector(".cv-link");
      cvLinkElement.href = userData.cvUrl;
      cvLinkElement.download =
        "CV_" + userData.name.replace(/\s+/g, "_") + ".pdf";

      // About Section
      if (userData.aboutSections && userData.aboutSections.length > 0) {
        generateAboutSections(userData.aboutSections);
      }

      // Projects
      if (data.projects && data.projects.length > 0) {
        generateProjects(data.projects);
      }

      if (data.experiences && data.experiences.length > 0) {
        generateExperience(data.experiences);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function generateAboutSections(aboutSections) {
  const aboutSectionContainer = document.querySelector("#about-section .row");

  // Limpiar contenido previo
  aboutSectionContainer.innerHTML = "";

  aboutSections.forEach((section) => {
    const sectionElement = document.createElement("div");
    sectionElement.classList.add("col-sm-4");

    sectionElement.innerHTML = `
      <div class="service">
        <img src="assets/img/mortarboard.svg" width="70" height="58" alt="Education">
        <h4 class="title">${section.title}</h4>
        <p class="description">${section.description}</p>
      </div>
    `;

    aboutSectionContainer.appendChild(sectionElement);
  });
}

function generateProjects(projects) {
  const portfolioContainer = document.querySelector("#portfolio .row");
  portfolioContainer.innerHTML = ""; // Limpiar contenido previo

  const modalContainer = document.createElement("div"); // Contenedor para los modales

  projects.forEach((project, index) => {
    console.log("Proyecto actual:", project);
    const projectId = `portfolioItem${index + 1}`;

    // **Crear tarjeta del proyecto**
    const projectElement = document.createElement("div");
    projectElement.classList.add("col-md-4", "col-xs-6");
    projectElement.innerHTML = `
      <div class="portfolio-item">
        <img src="${
          project.imageUrl || "assets/img/portfolio-1.jpg"
        }" class="img-res" alt="${project.name}">
        <div class="portfolio-item-info">
          <h4 class="project-title">${project.name}</h4>
          <a href="#" data-toggle="modal" data-target="#${projectId}">
            <span class="glyphicon glyphicon-eye-open"></span>
          </a>
          <a href="${project.githubUrl}" target="_blank">
            <span class="glyphicon glyphicon-link"></span>
          </a>
        </div>
      </div>
    `;

    portfolioContainer.appendChild(projectElement);

    // **Crear modal del proyecto**
    const modalElement = document.createElement("div");
    modalElement.classList.add("modal", "fade");
    modalElement.id = projectId;
    modalElement.setAttribute("role", "dialog");

    modalElement.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <a class="close" data-dismiss="modal">
              <span class="glyphicon glyphicon-remove"></span>
            </a>
            <img src="${
              project.imageUrl || "assets/img/portfolio-1.jpg"
            }" class="img-res" alt="${project.name}">
          </div>
          <div class="modal-body">
            <h4 class="modal-title">${project.name}</h4>
            <p>${project.description}</p>
            <p><strong>Lenguajes y Tecnologías:</strong> 
              ${
                project.tecnologies && project.tecnologies.length > 0
                  ? project.tecnologies.map((tech) => tech.name).join(", ")
                  : "No disponible"
              }
            </p>
          </div>
          <div class="modal-footer">
            <a href="${project.githubUrl}" class="btn btn-fill" target="_blank">
              Ver en GitHub <span class="bi bi-github"></span>
            </a>
          </div>
        </div>
      </div>
    `;

    modalContainer.appendChild(modalElement);
  });

  document.body.appendChild(modalContainer);
}

function generateExperience(experiences) {
  const experienceSection = document.querySelector("#experience .container");

  experienceSection.innerHTML = `
  <h3>Experiencia laboral</h3>
  <img src="assets/img/lines.svg" class="img-lines" alt="lines">
`;

  experiences.forEach((exp) => {
    const experienceItem = document.createElement("div");
    experienceItem.classList.add("experience-item", "row");

    experienceItem.innerHTML = `
      <h4 class="position">${exp.position}</h4>
      <p class="description-experience">${exp.description}</p>
      <div class="text-center">
        <p><strong>Fecha:</strong> ${exp.startDate} - ${
      exp.endDate == null ? "Actualidad" : exp.endDate
    }</p>
      </div>
    `;

    experienceSection.appendChild(experienceItem);
  });
}
