async function fetchCourses(query = '') {
    try {
        const response = await fetch(`http://localhost:3000/api/courses?search=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const courses = await response.json();
        displayCourses(courses);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayCourses(courses) {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';  // Clear previous courses
    courses.courses.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.innerHTML = `<h2>${category.category}</h2>`;
        const coursesList = document.createElement('ul');
        category.courses.forEach(course => {
            const courseElement = document.createElement('li');
            courseElement.textContent = course;
            coursesList.appendChild(courseElement);
        });
        categoryElement.appendChild(coursesList);
        container.appendChild(categoryElement);
    });
}

function searchCourses() {
    const query = document.getElementById('search').value;
    fetchCourses(query);
}

// Fetch initial courses on page load
fetchCourses();
