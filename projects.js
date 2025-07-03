fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById("project-list");
    projects.forEach(project => {
      const div = document.createElement("div");
      div.className = "project";
      div.innerHTML = `
        <div class="title">${project.title}</div>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">View on GitHub</a>
      `;
      container.appendChild(div);
    });
  });
