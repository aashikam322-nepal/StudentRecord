const apiUrl = "http://localhost:8080/api/courses";

document.getElementById("courseForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const course = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value
    };


  fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course)
  })
  .then(response => response.json())   // wait till backend responds
  .then(() => {
      loadCourses();                    // now fetch updated list
      document.getElementById("courseForm").reset();
  })
  .catch(err => console.error(err));

});

function loadCourses() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("courseTable");
            table.innerHTML = "";

            data.forEach(c => {
                table.innerHTML += `
                    <tr>
                        <td>${c.id}</td>
                        <td>${c.title}</td>
                        <td>${c.description}</td>
                        <td>
                          <button class="delete-btn" onclick="deleteCourse(${c.id})">Delete</button>
                        </td>

                    </tr>
                `;
            });
        });
}

loadCourses();
function deleteCourse(id) {
    if (!confirm("Are you sure you want to delete this course?")) return;

    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(msg => {
                alert(msg);   // 👈 POPUP MESSAGE
                throw new Error(msg);
            });
        }
        return response;
    })
    .then(() => {
        loadCourses();
    })
    .catch(err => console.error(err));
}


