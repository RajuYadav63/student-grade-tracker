const API = "https://student-grade-tracker-aw8o.onrender.com";


// READ
async function getUsers() {

    const res = await fetch(`${API}/users`);

    const users = await res.json();

    let output = "";

    users.forEach((user) => {

        output += `
        
        <div class="user">

            <h3>${user.name}</h3>

            <p>${user.email}</p>

            <button onclick="deleteUser('${user._id}')">
                Delete
            </button>

        </div>
        `;
    });

    document.getElementById("userList").innerHTML = output;
}



// CREATE
async function addUser() {

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    await fetch(`${API}/add`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email
        })
    });

    getUsers();
}



// DELETE
async function deleteUser(id) {

    await fetch(`${API}/delete/${id}`, {

        method: "DELETE"

    });

    getUsers();
}


getUsers();