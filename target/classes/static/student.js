const studentApi = "http://localhost:8080/api/students";

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value
    };

    fetch(studentApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    })
    .then(() => loadStudents());

    this.reset();
});

function loadStudents() {
    fetch(studentApi)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("studentTable");
            table.innerHTML = "";

            data.forEach(s => {
                table.innerHTML += `
                    <tr>
                        <td>${s.id}</td>
                        <td>${s.name}</td>
                        <td>${s.email}</td>
                        <td>${s.mobile}</td>
                        <td>
                          <button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
                        </td>

                    </tr>
                `;
            });
        });
}

loadStudents();
function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    fetch(`${studentApi}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(msg => {
                alert(msg);   // 👈 show backend message
                throw new Error(msg);
            });
        }
        return response;
    })
    .then(() => {
        loadStudents();
        showSuccess("Student deleted successfully ❌");
    })
    .catch(err => console.error(err));
}


