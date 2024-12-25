document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("courses-container");

    // Fetch the courses JSON
    fetch("https://dishadutta04.github.io/json_file/courses.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch courses.");
            }
            return response.json();
        })
        .then(data => {
            displayCourses(data.courses);
        })
        .catch(error => {
            console.error("Error:", error);
            container.innerHTML = `<p style="color: red; text-align: center;">Failed to load courses. Please try again later.</p>`;
        });

    // Function to display courses in the DOM
    function displayCourses(categories) {
        container.innerHTML = ""; // Clear the container

        categories.forEach(category => {
            const categorySection = document.createElement("section");
            categorySection.innerHTML = `
                <h2 style="text-align: center; color: #0078d4;">${category.category}</h2>
                <div class="category-courses" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
                </div>
            `;
            const categoryContainer = categorySection.querySelector(".category-courses");

            category.courses.forEach(course => {
                const courseCard = document.createElement("div");
                courseCard.classList.add("course-card");
                courseCard.style.cssText = `
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    width: 300px;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    position: relative;
                `;
                courseCard.innerHTML = `
                    <span class="badge" style="position: absolute; top: 10px; left: 10px; background-color: #28a745; color: white; padding: 5px 10px; border-radius: 5px; font-size: 0.9em;">$${course.price}</span>
                    <img src="${course.image}" alt="${course.title}" style="width: 100%; height: 200px; object-fit: cover;">
                    <div class="info" style="padding: 15px; text-align: center;">
                        <h3 style="margin: 0 0 10px; font-size: 1.5em;">${course.title}</h3>
                        <p style="margin: 0 0 15px; color: #666;">${course.description}</p>
                        <div class="rating" style="display: flex; justify-content: center; gap: 3px; margin-top: 10px;">
                            ${'<i class="fa fa-star" style="color: #ffb400;"></i>'.repeat(course.rating)}
                            ${'<i class="fa fa-star-o" style="color: #ccc;"></i>'.repeat(5 - course.rating)}
                        </div>
                        <a href="${course.link}" target="_blank" style="color: white; background-color: #0078d4; text-decoration: none; padding: 10px 15px; border-radius: 5px; font-weight: bold; display: inline-block; margin-top: 10px;">View Course</a>
                    </div>
                `;
                courseCard.addEventListener("mouseover", () => {
                    courseCard.style.transform = "translateY(-5px)";
                    courseCard.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                });
                courseCard.addEventListener("mouseout", () => {
                    courseCard.style.transform = "translateY(0)";
                    courseCard.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                });
                categoryContainer.appendChild(courseCard);
            });

            container.appendChild(categorySection);
			
        });
    }
});
