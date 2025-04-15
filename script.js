// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", function() {
    // 1. Homepage Time-Based Greeting
    if (document.querySelector("header h1")) {
        addTimeBasedGreeting();
    }

    // 2. Toggle Skills Button on CV page
    if (document.querySelector("#skills")) {
        addSkillsToggle();
    }

    // 3. Show More Projects Button on Projects page
    if (document.querySelector(".project-list")) {
        addShowMoreProjectsButton();
    }

    // 4. Contact Form Validation
    setupContactForm();
});

// Function to add time-based greeting to homepage
function addTimeBasedGreeting() {
    const header = document.querySelector("header");
    const greeting = document.createElement("div");
    greeting.id = "time-greeting";
    
    const currentHour = new Date().getHours();
    let greetingText;
    
    if (currentHour < 12) {
        greetingText = "Good morning!";
    } else if (currentHour < 18) {
        greetingText = "Good afternoon!";
    } else {
        greetingText = "Good evening!";
    }
    
    greeting.textContent = greetingText;
    greeting.style.fontSize = "1.5rem";
    greeting.style.marginBottom = "1rem";
    greeting.style.color = "#4A90E2";
    
    // Insert the greeting after the h1 but before the image
    const h1 = header.querySelector("h1");
    if (h1) {
        h1.insertAdjacentElement("afterend", greeting);
    }
}

// Function to add toggle functionality to skills section
function addSkillsToggle() {
    const skillsSection = document.querySelector("#skills");
    const skillsList = document.querySelector(".skills-list");
    
    // Create toggle button
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Skills";
    toggleButton.className = "toggle-btn";
    toggleButton.style.backgroundColor = "#4A90E2";
    toggleButton.style.color = "white";
    toggleButton.style.padding = "8px 16px";
    toggleButton.style.border = "none";
    toggleButton.style.borderRadius = "4px";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.marginTop = "1rem";
    
    // Insert button before the skills list
    skillsSection.insertBefore(toggleButton, skillsList);
    
    // Add event listener for toggling
    toggleButton.addEventListener("click", function() {
        if (skillsList.style.display === "none") {
            skillsList.style.display = "block";
            toggleButton.textContent = "Hide Skills";
        } else {
            skillsList.style.display = "none";
            toggleButton.textContent = "Show Skills";
        }
    });
}

// Function to add Show More Projects button
function addShowMoreProjectsButton() {
    const projectSection = document.querySelector("#certificants");
    const projectList = document.querySelector(".project-list");
    
    // Create Show More Projects button
    const showMoreButton = document.createElement("button");
    showMoreButton.textContent = "Show More Projects";
    showMoreButton.className = "show-more-btn";
    showMoreButton.style.backgroundColor = "#4A90E2";
    showMoreButton.style.color = "white";
    showMoreButton.style.padding = "8px 16px";
    showMoreButton.style.border = "none";
    showMoreButton.style.borderRadius = "4px";
    showMoreButton.style.cursor = "pointer";
    showMoreButton.style.marginTop = "1rem";
    
    // Insert button after the project list
    projectSection.appendChild(showMoreButton);
    
    // Additional projects to be added
    const additionalProjects = [
        "Personal Portfolio Website",
        "Machine Learning Image Classifier",
        "Mobile Fitness App"
    ];
    
    let projectsAdded = false;
    
    // Add event listener for showing more projects
    showMoreButton.addEventListener("click", function() {
        if (!projectsAdded) {
            additionalProjects.forEach(project => {
                const li = document.createElement("li");
                li.textContent = project;
                li.className = "new-project";
                li.style.animation = "fadeIn 0.5s";
                projectList.appendChild(li);
            });
            
            showMoreButton.textContent = "Hide Additional Projects";
            projectsAdded = true;
        } else {
            // Remove the added projects
            const newProjects = document.querySelectorAll(".new-project");
            newProjects.forEach(project => {
                project.remove();
            });
            
            showMoreButton.textContent = "Show More Projects";
            projectsAdded = false;
        }
    });
    
    // Add fadeIn animation to CSS
    const style = document.createElement("style");
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// Function to setup contact form validation
function setupContactForm() {
    // First check if we're on the contact page
    if (!document.querySelector("#contact")) {
        return;
    }
    
    // Create the contact form if it doesn't exist
    const contactSection = document.querySelector("#contact");
    if (!document.querySelector("#contactForm")) {
        // Create form HTML
        const formHTML = `
            <form id="contactForm">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                    <span class="error" id="nameError"></span>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <span class="error" id="emailError"></span>
                </div>
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" required rows="4"></textarea>
                    <span class="error" id="messageError"></span>
                </div>
                <button type="submit" class="submit-btn">Submit</button>
                <div id="formSuccess" style="display: none; color: green; margin-top: 10px;">Form submitted successfully!</div>
            </form>
        `;
        
        // Add form to contact section
        contactSection.insertAdjacentHTML("beforeend", formHTML);
        
        // Add styles for the form
        const formStyles = document.createElement("style");
        formStyles.textContent = `
            #contactForm {
                max-width: 500px;
                margin: 20px 0;
            }
            .form-group {
                margin-bottom: 15px;
            }
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
            }
            .form-group input, .form-group textarea {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .error {
                color: red;
                font-size: 0.9em;
                margin-top: 3px;
                display: block;
            }
            .submit-btn {
                background-color: #4A90E2;
                color: white;
                padding: 10px 15px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .submit-btn:hover {
                background-color: #3A7BC8;
            }
        `;
        document.head.appendChild(formStyles);
    }
    
    // Set up form validation
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const formSuccess = document.getElementById("formSuccess");
    
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let isValid = true;
        
        // Reset error messages
        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        
        // Validate name
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Name is required";
            isValid = false;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = "Please enter a valid email address";
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = "Message must be at least 10 characters long";
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            formSuccess.style.display = "block";
            contactForm.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                formSuccess.style.display = "none";
            }, 3000);
        }
    });
}
