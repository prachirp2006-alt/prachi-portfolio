const form = document.getElementById("feedbackForm");
const successMsg = document.getElementById("successMsg");
const feedbackDisplay = document.getElementById("feedbackDisplay");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "") {
        alert("Name cannot be empty");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Enter valid email");
        return;
    }

    const feedback = {
        name: name,
        email: email,
        message: message
    };

    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    successMsg.textContent = "Feedback submitted successfully!";
    form.reset();

    displayFeedback();
});

function displayFeedback() {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbackDisplay.innerHTML = "<h3>Submitted Feedback:</h3>";

    feedbacks.forEach(f => {
        feedbackDisplay.innerHTML += `
            <div>
                <p><strong>${f.name}</strong> (${f.email})</p>
                <p>${f.message}</p>
                <hr>
            </div>
        `;
    });
}

