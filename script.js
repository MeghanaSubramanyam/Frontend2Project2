// Array to store employee data
let employees = [];

// Reference to form fields
const nameInput = document.getElementById("name");
const professionInput = document.getElementById("profession");
const ageInput = document.getElementById("age");
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const messageElement = document.getElementById("message");
const employeeListElement = document.getElementById("employee-list");

// Add employee event listener
addEmployeeBtn.addEventListener("click", addEmployee);

function addEmployee() {
    // Get input values
    const name = nameInput.value.trim();
    const profession = professionInput.value.trim();
    const age = ageInput.value.trim();

    // Validate fields
    if (name === "" || profession === "" || age === "") {
        showMessage("Please fill out all fields.", "error");
        return;
    }

    // Create new employee object
    const newEmployee = {
        id: employees.length + 1,
        name: name,
        profession: profession,
        age: parseInt(age)
    };

    // Add employee to array
    employees.push(newEmployee);

    // Update the UI
    renderEmployees();

    // Clear input fields
    nameInput.value = "";
    professionInput.value = "";
    ageInput.value = "";

    // Show success message
    showMessage("Employee added successfully!", "success");
}

function renderEmployees() {
    // Clear existing employee list
    employeeListElement.innerHTML = "";

    // Check if there are employees in the array
    if (employees.length === 0) {
        employeeListElement.innerHTML = "<p>No employees have been added yet.</p>";
        return;
    }

    // Map through employees and create elements
    employees.forEach(employee => {
        const employeeDiv = document.createElement("div");
        employeeDiv.className = "employee";
        employeeDiv.innerHTML = `
            <p>${employee.id}. Name: ${employee.name}, Profession: ${employee.profession}, Age: ${employee.age}</p>
            <button class="delete-btn" onclick="deleteEmployee(${employee.id})">Delete</button>
        `;
        employeeListElement.appendChild(employeeDiv);
    });
}

function deleteEmployee(id) {
    // Filter out the employee to be deleted
    employees = employees.filter(employee => employee.id !== id);

    // Update the UI
    renderEmployees();

    // Show message
    showMessage("Employee deleted successfully.", "success");
}

function showMessage(message, type) {
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    
    // Hide the message after 3 seconds
    setTimeout(() => {
        messageElement.textContent = "";
    }, 3000);
}
