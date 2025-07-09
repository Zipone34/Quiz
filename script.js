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
        q: "1. What primarily describes the context in which projects exist and are influenced?",
        options: {
            a: "Project deliverables.",
            b: "Individual team member skills.",
            c: "The environment in which projects operate.",
            d: "The project budget and individual team member skills."
        },
        a: "c"
    },
    {
        q: "2. What term refers to conditions, not under the direct control of the project team, that influence, constrain, or direct the project?",
        options: {
            a: "Organizational Process Assets (OPAs).",
            b: "Project Management Plans.",
            c: "Enterprise Environmental Factors.",
            d: "Project Scope Statements."
        },
        a: "c"
    },
    {
        q: "3. Which of the following is an example of an internal Enterprise Environmental Factor (EEF)?",
        options: {
            a: "Government regulations.",
            b: "Organizational culture.",
            c: "Market conditions.",
            d: "Academic research."
        },
        a: "b"
    },
    {
        q: "4. Which of the following is an example of an external Enterprise Environmental Factor (EEF)?",
        options: {
            a: "Company human resource policies.",
            b: "Organizational structure.",
            c: "Industry standards.",
            d: "Organizational infrastructure."
        },
        a: "c"
    },
    {
        q: "5. What are Organizational Process Assets (OPAs) defined as?",
        options: {
            a: "External factors impacting project performance.",
            b: "Plans, processes, policies, procedures, and organizational knowledge bases specific to the performing organization.",
            c: "Stakeholder expectations and requirements and financial resources allocated to a project.",
            d: "Financial resources allocated to a project."
        },
        a: "b"
    },
    {
        q: "6. Which category of OPA includes standardized guidelines and work instructions?",
        options: {
            a: "Organizational knowledge repositories.",
            b: "Historical information.",
            c: "Processes, policies, and procedures.",
            d: "Lessons learned."
        },
        a: "c"
    },
    {
        q: "7. Which of the following is an example of an OPA related to organizational knowledge repositories?",
        options: {
            a: "Risk management templates.",
            b: "Project files from previous projects.",
            c: "Quality control policies.",
            d: "Communication management plans."
        },
        a: "b"
    },
    {
        q: "8. Projects operate within the constraints imposed by an organization's framework for decision-making and performance. What is this framework often called?",
        options: {
            a: "Project governance.",
            b: "Team dynamics.",
            c: "Project scheduling.",
            d: "Stakeholder engagement."
        },
        a: "a"
    },
    {
        q: "9. What aspect of organizational systems defines the distribution of responsibility, accountability, and authority?",
        options: {
            a: "Project team morale and market trends.",
            b: "Organizational governance frameworks.",
            c: "Individual project milestones.",
            d: "Market trends."
        },
        a: "b"
    },
    {
        q: "10. Which management element within an organization ensures that work is divided and authority is allocated effectively?",
        options: {
            a: "Continuous improvement processes.",
            b: "Division of work and authority.",
            c: "External market analysis.",
            d: "Project closure procedures."
        },
        a: "b"
    },
    {
        q: "11. What type of organizational structure is characterized by project managers having high authority and full-time project team members?",
        options: {
            a: "Functional.",
            b: "Weak Matrix.",
            c: "Project-oriented.",
            d: "Balanced Matrix."
        },
        a: "c"
    },
    {
        q: "12. In which organizational structure do project managers have little to no authority and essentially act as coordinators or expediters?",
        options: {
            a: "Strong Matrix.",
            b: "Project-oriented.",
            c: "Functional.",
            d: "Pure Project."
        },
        a: "c"
    },
    {
        q: "13. A strong matrix organization balances authority between which two types of managers?",
        options: {
            a: "Senior management and junior staff.",
            b: "Functional managers and project managers.",
            c: "Program managers and portfolio managers.",
            d: "External consultants and internal employees."
        },
        a: "b"
    },
    {
        q: "14. What influence might a company's hierarchical structure have on a project?",
        options: {
            a: "It has no impact on project communication and only affects external stakeholders.",
            b: "It can dictate communication channels and approval processes.",
            c: "It always speeds up decision-making.",
            d: "It only affects external stakeholders."
        },
        a: "b"
    },
    {
        q: "15. What type of EEF would include a new patent law affecting product development?",
        options: {
            a: "Internal organizational culture.",
            b: "External legal/regulatory factor.",
            c: "Internal knowledge repository.",
            d: "Organizational process asset."
        },
        a: "b"
    },
    {
        q: "16. What might a project manager use from OPAs to help estimate future project costs?",
        options: {
            a: "Current market prices.",
            b: "Project files and historical information from similar past projects.",
            c: "New government regulations and current market prices.",
            d: "The project team's personal opinions."
        },
        a: "b"
    },
    {
        q: "17. Which of the following is a primary function of organizational governance?",
        options: {
            a: "To manage individual project tasks.",
            b: "To determine and influence the behavior of the organization's members.",
            c: "To create new products for the market and manage individual project tasks.",
            d: "To perform daily operational duties."
        },
        a: "b"
    },
    {
        q: "18. What impact can an organization's existing infrastructure have on a project?",
        options: {
            a: "Only positive impacts.",
            b: "It can constrain project options and resources.",
            c: "It only affects external vendors.",
            d: "No significant impact on project execution and implementation."
        },
        a: "b"
    },
    {
        q: "19. Which document would be considered an OPA providing guidance on how to manage project changes?",
        options: {
            a: "Project schedule.",
            b: "Change control procedures.",
            c: "Stakeholder register.",
            d: "Risk management plan."
        },
        a: "b"
    },
    {
        q: "20. A project team needing to comply with the company's internal security policies is being influenced by which type of factor?",
        options: {
            a: "External EEF.",
            b: "Internal EEF.",
            c: "OPA - knowledge repository.",
            d: "External market condition."
        },
        a: "b"
    },
    {
        q: "21. When a project manager considers the company's established reporting structure, they are taking into account:",
        options: {
            a: "External market forces.",
            b: "Organizational process assets and manpower.",
            c: "Organizational systems and structure.",
            d: "Project management software."
        },
        a: "c"
    },
    {
        q: "22. What role do project managers play in interacting with the organizational environment?",
        options: {
            a: "They are isolated from all external and internal factors of the organization.",
            b: "They must understand and adapt to environmental factors.",
            c: "They only manage internal team dynamics.",
            d: "They dictate all organizational policies."
        },
        a: "b"
    },
    {
        q: "23. Which OPA would contain information about past project risks and how they were mitigated?",
        options: {
            a: "Financial accounting records.",
            b: "Lessons learned knowledge base.",
            c: "Human resources policies and regulations.",
            d: "Customer satisfaction surveys."
        },
        a: "b"
    },
    {
        q: "24. What is a key characteristic of Enterprise Environmental Factors (EEFs)?",
        options: {
            a: "They are always under the project manager's direct control.",
            b: "They are usually inputs to project planning processes.",
            c: "They are created by the project team.",
            d: "They are specific only to a single project."
        },
        a: "b"
    },
    {
        q: "25. The culture of an organization (e.g., highly collaborative or very hierarchical) is categorized as a/an:",
        options: {
            a: "External OPA.",
            b: "Internal EEF.",
            c: "Project deliverable.",
            d: "External market factor."
        },
        a: "b"
    },
    {
        q: "26. If a project needs to comply with certain product safety standards set by an international body, this is an example of a/an:",
        options: {
            a: "Internal OPA.",
            b: "External EEF.",
            c: "Organizational knowledge repository.",
            d: "Project management plan."
        },
        a: "b"
    },
    {
        q: "27. What type of organizational structure provides a balance of power between functional managers and project managers, with project managers often full-time?",
        options: {
            a: "Functional.",
            b: "Weak Matrix.",
            c: "Balanced Matrix.",
            d: "Projectized."
        },
        a: "c"
    },
    {
        q: "28. When a project uses templates for various project documents (e.g., status reports), these templates are considered:",
        options: {
            a: "Enterprise Environmental Factors.",
            b: "External market data.",
            c: "Organizational Process Assets.",
            d: "Project objectives."
        },
        a: "c"
    },
    {
        q: "29. An organizational system's management elements influence:",
        options: {
            a: "Only the project's external vendors.",
            b: "The overall operation and governance of the organization.",
            c: "Only the project's financial budget.",
            d: "The personal skills of the project manager and operation manager."
        },
        a: "b"
    },
    {
        q: "30. Which term refers to the knowledge stored and available for use within an organization, crucial for future projects?",
        options: {
            a: "Operational expenses of the organization.",
            b: "Organizational knowledge repositories.",
            c: "Project team's personal notes.",
            d: "External research papers."
        },
        a: "b"
    }
    // Add the rest of your questions here
];
