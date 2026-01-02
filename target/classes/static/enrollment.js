const enrollmentApi = "http://localhost:8080/api/enrollments";
const studentApi = "http://localhost:8080/api/students";
const courseApi = "http://localhost:8080/api/courses";

document.getElementById("enrollForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const studentId = document.getElementById("studentSelect").value;
    const courseId = document.getElementById("courseSelect").value;

    fetch(`${enrollmentApi}?studentId=${studentId}&courseId=${courseId}`, {
        method: "POST"
    })
    .then(() => loadEnrollments());
});

function loadStudentsDropdown() {
    fetch(studentApi)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("studentSelect");
            select.innerHTML = "";

            data.forEach(s => {
                select.innerHTML += `<option value="${s.id}">${s.name}</option>`;
            });
        });
}

function loadCoursesDropdown() {
    fetch(courseApi)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("courseSelect");
            select.innerHTML = "";

            data.forEach(c => {
                select.innerHTML += `<option value="${c.id}">${c.title}</option>`;
            });
        });
}

function loadEnrollments() {
    fetch(enrollmentApi)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("enrollTable");
            table.innerHTML = "";

            data.forEach(e => {
                table.innerHTML += `
                    <tr>
                        <td>${e.id}</td>
                        <td>${e.student.name}</td>
                        <td>${e.course.title}</td>
                    </tr>
                `;
            });
        });
}

// Initial load
loadStudentsDropdown();
loadCoursesDropdown();
loadEnrollments();
