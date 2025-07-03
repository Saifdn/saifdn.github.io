
// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '';

        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback content
        document.getElementById('projects-grid').innerHTML = `
            <div class="project-card">
                <div class="project-image">Project Image</div>
                <div class="project-content">
                    <h3 class="project-title">Sample Project</h3>
                    <p class="project-description">Unable to load projects. Please check the projects.json file.</p>
                </div>
            </div>
        `;
    }
}

// Create project card HTML
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    
    card.innerHTML = `
        <div class="project-image">
            ${project.image ? `<img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">` : 'Project Image'}
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank">Live Demo</a>` : ''}
                ${project.github ? `<a href="${project.github}" class="project-link" target="_blank">GitHub</a>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the form data to a server
    // For now, we'll just show an alert
    alert(`Thank you ${name}! Your message has been received. I'll get back to you soon.`);
    
    // Reset the form
    this.reset();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Load projects
    loadProjects();
    
    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards and other elements
    document.querySelectorAll('.skill-category, .stat').forEach(element => {
        observer.observe(element);
    });
});

// Hero button actions
document.querySelector('.btn-primary').addEventListener('click', () => {
    scrollToSection('projects');
});

document.querySelector('.btn-secondary').addEventListener('click', () => {
    // Replace with actual CV download link
    alert('CV download feature - please add your CV file and update this link');
});

// Social media links (update with your actual profiles)
document.querySelectorAll('.social-link').forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const socialPlatforms = ['GitHub', 'LinkedIn', 'Email'];
        alert(`${socialPlatforms[index]} link - please update with your actual profile URL`);
    });
});