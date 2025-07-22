const quizForm = document.getElementById("quizForm");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const timeDisplay = document.getElementById("time");

let timeLeft = 300; // 5 minutes
let timer;

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    buildQuiz();
    startTimer();
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    timeDisplay.textContent = formatTime(timeLeft);
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function buildQuiz() {
    questions.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
          <p>${item.q}</p>
          <label><input type="radio" name="q${i}" value="a" /> a) ${item.options.a}</label><br>
          <label><input type="radio" name="q${i}" value="b" /> b) ${item.options.b}</label><br>
          <label><input type="radio" name="q${i}" value="c" /> c) ${item.options.c}</label><br>
          <label><input type="radio" name="q${i}" value="d" /> d) ${item.options.d}</label>
        `;
        quizForm.appendChild(div);
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit Quiz";
    quizForm.appendChild(submitBtn);
}

quizForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearInterval(timer);
    submitQuiz();
});

function submitQuiz() {
    let score = 0;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    const wrongAnswers = [];

    questions.forEach((item, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const correct = item.a;

        if (selected && selected.value === correct) {
            score++;
        } else {
            const yourAnswer = selected ? selected.value : "None";
            wrongAnswers.push({
                number: i + 1,
                question: item.q,
                yourAnswer: yourAnswer !== "None" ? `${yourAnswer}) ${item.options[yourAnswer]}` : "No answer selected",
                correctAnswer: `${correct}) ${item.options[correct]}`
            });
        }
    });

    resultDiv.innerHTML += `<p>✅ You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.</p>`;

    if (wrongAnswers.length > 0) {
        resultDiv.innerHTML += `<h3>❌ Incorrect Answers:</h3>`;
        wrongAnswers.forEach(item => {
            resultDiv.innerHTML += `
            <div style="margin-bottom: 10px;">
              <strong>Q${item.number}:</strong> ${item.question}<br/>
              <span style="color: red;">Your Answer: ${item.yourAnswer}</span><br/>
              <span style="color: green;">Correct Answer: ${item.correctAnswer}</span>
            </div>
          `;
        });
    } else {
        resultDiv.innerHTML += `<p style="color: green;">🎉 Perfect score! Great job!</p>`;
    }

    quizForm.style.display = "none";
}


const questions = [
    {
        q: "1. What is the unique responsibility of the project manager that cannot be delegated?",
        options: {
            a: "Resource allocation.",
            b: "Risk identification.",
            c: "Project integration management.",
            d: "Quality assurance."
        },
        a: "c"
    },
    {
        q: "2. A project's cost estimate for a contingency plan integrates processes from which Project Management Knowledge Areas?",
        options: {
            a: "Scope, Communication, and Quality.",
            b: "Cost, Schedule, and Risk.",
            c: "Procurement, Stakeholder, and Resources.",
            d: "Time, Scope, and Integration."
        },
        a: "b"
    },
    {
        q: "3. The links among project management processes are often described as being:",
        options: {
            a: "Strictly sequential.",
            b: "Always one-way.",
            c: "Highly iterative.",
            d: "Rarely connected."
        },
        a: "c"
    },
    {
        q: "4. Which process formally authorizes the existence of a project and grants the project manager authority?",
        options: {
            a: "Develop Project Management Plan.",
            b: "Direct and Manage Project Work.",
            c: "Develop Project Charter.",
            d: "Close Project or Phase."
        },
        a: "c"
    },
    {
        q: "5. The Project Charter serves to link the project to what?",
        options: {
            a: "Individual team member goals.",
            b: "Vendor contracts.",
            c: "Strategic objectives of the organization.",
            d: "Daily operational tasks."
        },
        a: "c"
    },
    {
        q: "6. Which document is explicitly stated as not being a contract?",
        options: {
            a: "The Project Management Plan.",
            b: "The Project Charter.",
            c: "The Scope Statement.",
            d: "The Requirements Documentation."
        },
        a: "b"
    },
    {
        q: "7. What is the primary benefit of the Direct and Manage Project Work process?",
        options: {
            a: "Defining project scope.",
            b: "Providing overall management of project work.",
            c: "Identifying project risks.",
            d: "Closing project contracts."
        },
        a: "b"
    },
    {
        q: "8. Collecting and communicating work performance data to controlling processes for analysis is an output of which process?",
        options: {
            a: "Monitor and Control Project Work.",
            b: "Direct and Manage Project Work.",
            c: "Develop Project Management Plan.",
            d: "Close Project or Phase."
        },
        a: "a"
    },
    {
        q: "9. What is the main purpose of the Manage Project Knowledge process?",
        options: {
            a: "To limit information sharing.",
            b: "To strictly adhere to old practices.",
            c: "To leverage existing and create new knowledge for organizational learning.",
            d: "To prevent any new knowledge from being created."
        },
        a: "c"
    },
    {
        q: "10. Which type of knowledge is personal and difficult to express or codify?",
        options: {
            a: "Explicit knowledge.",
            b: "Implicit knowledge.",
            c: "Tacit knowledge.",
            d: "Procedural knowledge."
        },
        a: "c"
    },
    {
        q: "11. What is the key output of the Manage Project Knowledge process that is created early and updated throughout the project?",
        options: {
            a: "Project Charter.",
            b: "Lessons Learned Register.",
            c: "Risk Report.",
            d: "Stakeholder Register."
        },
        a: "b"
    },
    {
        q: "12. The Monitor and Control Project Work process primarily focuses on what activity?",
        options: {
            a: "Initiating new projects.",
            b: "Tracking, reviewing, and reporting overall progress.",
            c: "Recruiting new team members.",
            d: "Finalizing project deliverables."
        },
        a: "b"
    },
    {
        q: "13. This process involves comparing actual project performance to the planned performance:",
        options: {
            a: "Develop Project Charter.",
            b: "Direct and Manage Project Work.",
            c: "Monitor and Control Project Work.",
            d: "Perform Integrated Change Control."
        },
        a: "c"
    },
    {
        q: "14. What is the primary purpose of the Perform Integrated Change Control process?",
        options: {
            a: "To avoid all project changes.",
            b: "To quickly implement every change request.",
            c: "To review, approve or reject, and manage changes to baselines.",
            d: "To solely document changes without approval."
        },
        a: "c"
    },
    {
        q: "15. What are the two main types of management supported by change control tools?",
        options: {
            a: "Risk and Quality Management.",
            b: "Configuration and Change Management.",
            c: "Scope and Schedule Management.",
            d: "Cost and Resource Management."
        },
        a: "b"
    },
    {
        q: "16. What group is typically responsible for reviewing and deciding on change requests?",
        options: {
            a: "The project team alone.",
            b: "The Project Sponsor.",
            c: "The Change Control Board (CCB).",
            d: "External stakeholders only."
        },
        a: "c"
    },
    {
        q: "17. Which process formally completes the project, phase, or contract?",
        options: {
            a: "Direct and Manage Project Work.",
            b: "Monitor and Control Project Work.",
            c: "Perform Integrated Change Control.",
            d: "Close Project or Phase."
        },
        a: "d"
    },
    {
        q: "18. The use of Project Management Information Systems (PMIS) is a trend in integration management that helps manage:",
        options: {
            a: "Team morale.",
            b: "The volume of project data.",
            c: "Individual skill sets.",
            d: "External economic factors."
        },
        a: "b"
    },
    {
        q: "19. Which trend in integration management involves more rigorous processes due to a mobile workforce?",
        options: {
            a: "Use of visual management tools.",
            b: "Hybrid methodologies.",
            c: "Project knowledge management.",
            d: "Expanded project manager responsibilities."
        },
        a: "c"
    },
    {
        q: "20. When project managers are involved in business case development and benefits management, this reflects which trend?",
        options: {
            a: "Less stakeholder engagement.",
            b: "Automation of all tasks.",
            c: "Expanding project manager responsibilities.",
            d: "Reducing project complexity."
        },
        a: "c"
    },
    {
        q: "21. What approach involves delegating control of detailed product planning and delivery to the project team?",
        options: {
            a: "Predictive methodologies.",
            b: "Waterfall approach.",
            c: "Adaptive (agile/iterative) environments.",
            d: "Traditional project management."
        },
        a: "c"
    },
    {
        q: "22. What is a key tailoring consideration regarding the project life cycle?",
        options: {
            a: "The project's physical location.",
            b: "The appropriate phases for the project.",
            c: "The project manager's personal preference.",
            d: "The size of the project team."
        },
        a: "b"
    },
    {
        q: "23. When tailoring, determining whether a predictive, adaptive, or hybrid approach is best for the product or service refers to the:",
        options: {
            a: "Management approaches.",
            b: "Development life cycle.",
            c: "Knowledge management strategy.",
            d: "Governance framework."
        },
        a: "b"
    },
    {
        q: "24. A project manager's ability to build a collaborative decision-making environment is especially important in:",
        options: {
            a: "Functional organizations.",
            b: "Very large, complex projects.",
            c: "Adaptive environments.",
            d: "Projects with minimal changes."
        },
        a: "c"
    },
    {
        q: "25. The project manager's responsibility for project integration management cannot be:",
        options: {
            a: "Documented.",
            b: "Accounted for.",
            c: "Delegated or transferred.",
            d: "Understood."
        },
        a: "c"
    },
    {
        q: "26. An input to the Develop Project Charter process that provides project objectives and contributions to business goals is the:",
        options: {
            a: "Work Breakdown Structure.",
            b: "Benefits Management Plan.",
            c: "Stakeholder Register.",
            d: "Risk Management Plan."
        },
        a: "b"
    },
    {
        q: "27. Corrective actions, preventive actions, and defect repairs are outputs or results of which process?",
        options: {
            a: "Monitor and Control Project Work.",
            b: "Perform Integrated Change Control.",
            c: "Direct and Manage Project Work.",
            d: "Close Project or Phase."
        },
        a: "c"
    },
    {
        q: "28. This process includes activities like comparing actual project performance against the plan and assessing performance periodically:",
        options: {
            a: "Direct and Manage Project Work.",
            b: "Close Project or Phase.",
            c: "Monitor and Control Project Work.",
            d: "Develop Project Charter."
        },
        a: "c"
    },
    {
        q: "29. What type of data analysis involves comparing different courses of action to achieve a specific outcome?",
        options: {
            a: "Regression analysis.",
            b: "Variance analysis.",
            c: "Alternatives analysis.",
            d: "Earned value analysis."
        },
        a: "c"
    },
    {
        q: "30. In agile environments, the project manager focuses on what concerning the team?",
        options: {
            a: "Micro-managing their daily tasks.",
            b: "Ensuring the team can respond to changes.",
            c: "Dictating all project decisions.",
            d: "Limiting team interaction."
        },
        a: "b"
    }

];


