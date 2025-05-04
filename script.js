let history = [];

function addProject() {
    const projectName = document.getElementById("projectName").value;
    const deadlineInput = document.getElementById("deadlineInput").value;

    if (!projectName || !deadlineInput) {
        alert("Please enter a valid project name and deadline date");
        return;
    }

    const deadline = new Date(deadlineInput).getTime();
    history.push(`Added: ${projectName} - Deadline: ${deadlineInput}`);
    
    const projectList = document.getElementById("projectList");
    const listItem = document.createElement("li");

    const countdownDiv = document.createElement("div");
    countdownDiv.classList.add("countdown");
    countdownDiv.innerHTML = ` 
        <h1>${projectName} - Deadline: ${deadlineInput}</h1>
        <p>The Remaining Time:</p>
        <div class="timer-container">
            <div class="timer" id="timer-${projectName.replace(/\s+/g, '')}"></div>
        </div>
        <button class="remove-btn" onclick="removeProject(this, '${projectName}', '${deadlineInput}')">Remove</button>
    `;
    
    listItem.appendChild(countdownDiv);
    projectList.appendChild(listItem);

    document.getElementById("projectName").value = "";
    document.getElementById("deadlineInput").value = "";

    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = deadline - now;
        const timerId = `timer-${projectName.replace(/\s+/g, '')}`;
        const timerElement = document.getElementById(timerId);

        if (timeLeft <= 0) {
            timerElement.innerHTML = "Time's up!";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (days < 5) {
            timerElement.classList.add("warning");
        }

        if (days < 3) {
            timerElement.classList.remove("warning");
            timerElement.classList.add("danger");
        }

        if (days > 5) {
            timerElement.classList.add("glow");
        }
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
}

function removeProject(button, projectName, deadline) {
    history.push(`Removed: ${projectName} - Deadline: ${deadline}`);
    button.parentElement.parentElement.remove();
}

function showHistory() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("historyPage").style.display = "block";
    document.getElementById("historyList").innerText = history.join("\n");

    document.getElementById("inputContainer").style.display = "none";
}

function backToMain() {
    document.getElementById("historyPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
    document.getElementById("inputContainer").style.display = "block";
}
