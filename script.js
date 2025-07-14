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
        q: "1. A project manager's role is typically visible from which phase of the project lifecycle?",
        options: {
            a: "Planning.",
            b: "Initiation through closing.",
            c: "Execution only.",
            d: "Monitoring and controlling."
        },
        a: "b"
    },
    {
        q: "2. What is a primary responsibility of the project manager?",
        options: {
            a: "Handling daily operational tasks.",
            b: "Performing all project work themselves.",
            c: "Setting organizational strategic objectives.",
            d: "Leading the project team and coordinating efforts."
        },
        a: "d"
    },
    {
        q: "3. The project manager's influence extends across what primary domains?",
        options: {
            a: "Project, organization, and industry.",
            b: "Personal life, work, and hobbies.",
            c: "Financial, legal, and marketing.",
            d: "Past, present, and future projects."
        },
        a: "a"
    },
    {
        q: "4. Which of the following is considered part of the project manager's sphere of influence within the project?",
        options: {
            a: "Negotiating new business contracts.",
            b: "Managing external market changes.",
            c: "Balancing competing project constraints.",
            d: "Developing new company policies."
        },
        a: "c"
    },
    {
        q: "5. When a project manager interacts with senior leaders to align project objectives with strategic goals, they are influencing which domain?",
        options: {
            a: "The project itself.",
            b: "The organization.",
            c: "The professional discipline.",
            d: "Across other disciplines."
        },
        a: "b"
    },
    {
        q: "6. Understanding current product development and market niches falls under the project manager's influence on which domain?",
        options: {
            a: "The industry.",
            b: "The organization.",
            c: "The project team.",
            d: "Professional discipline."
        },
        a: "a"
    },
    {
        q: "7. The PMI Talent Triangle® emphasizes what three key skill areas for project managers?",
        options: {
            a: "Technical, financial, and legal.",
            b: "Leadership, communication, and negotiation.",
            c: "Technical project management, strategic and business management, and leadership.",
            d: "Planning, executing, and closing."
        },
        a: "c"
    },
    {
        q: "8. Which skill set involves the knowledge of project management processes, tools, and techniques?",
        options: {
            a: "Business acumen.",
            b: "Strategic management.",
            c: "Interpersonal skills.",
            d: "Technical project management skills."
        },
        a: "d"
    },
    {
        q: "9. What type of skills enable a project manager to understand the organization's strategy and how projects contribute to it?",
        options: {
            a: "Leadership skills.",
            b: "Technical skills.",
            c: "Strategic and business management skills.",
            d: "Personal communication skills."
        },
        a: "c"
    },
    {
        q: "10. A project manager who inspires the team, fosters collaboration, and resolves conflicts is demonstrating strong:",
        options: {
            a: "Technical project management skills.",
            b: "Strategic and business management skills.",
            c: "Leadership skills.",
            d: "Administrative skills."
        },
        a: "c"
    },
    {
        q: "11. How does leadership primarily differ from management in the context of project management?",
        options: {
            a: "Leadership focuses on relationships and vision, while management focuses on processes and tasks.",
            b: "Leadership is about control, management is about inspiring.",
            c: "They are identical concepts with no differences.",
            d: "Management is for senior roles, leadership is for junior roles."
        },
        a: "a"
    },
    {
        q: "12. A project manager who is optimistic, positive, and collaborative exhibits traits of a good:",
        options: {
            a: "Administrator.",
            b: "Leader.",
            c: "Technical expert.",
            d: "Financial analyst."
        },
        a: "b"
    },
    {
        q: "13. Which of the following is a key aspect of a project manager's integration role at the process level?",
        options: {
            a: "Guiding the team to integrate various project management processes.",
            b: "Developing personal hobbies.",
            c: "Conducting external market research.",
            d: "Managing daily operational duties."
        },
        a: "a"
    },
    {
        q: "14. What does 'integration at the cognitive level' refer to for a project manager?",
        options: {
            a: "Combining different project management software.",
            b: "Integrating new team members into the project.",
            c: "Merging different organizational departments.",
            d: "The ability to understand and combine different pieces of information."
        },
        a: "d"
    },
    {
        q: "15. When a project manager aligns project objectives with the organization's strategic objectives, they are performing integration at what level?",
        options: {
            a: "Process level.",
            b: "Cognitive level.",
            c: "Context level.",
            d: "Personal level."
        },
        a: "c"
    },
    {
        q: "16. What does 'performing integration' primarily mean for a project manager?",
        options: {
            a: "Separating all project components.",
            b: "Combining project processes, knowledge, and people effectively.",
            c: "Automating all project tasks.",
            d: "Delegating all responsibilities to the team."
        },
        a: "b"
    },
    {
        q: "17. Effective project managers often develop extensive formal and informal networks to:",
        options: {
            a: "Solve problems and navigate organizational structures.",
            b: "Avoid communication.",
            c: "Limit team interactions.",
            d: "Increase project complexity."
        },
        a: "a"
    },
    {
        q: "18. What kind of skills help a project manager manage conflict and build consensus among stakeholders?",
        options: {
            a: "Technical coding skills.",
            b: "Interpersonal and communication skills.",
            c: "Financial auditing skills.",
            d: "Data entry skills."
        },
        a: "b"
    },
    {
        q: "19. A project manager's involvement in 'pre-initiation activities' might include:",
        options: {
            a: "Writing the final project report.",
            b: "Decommissioning project resources.",
            c: "Conducting post-project audits.",
            d: "Consulting with leaders on strategic objectives."
        },
        a: "d"
    },
    {
        q: "20. What is a crucial aspect of a project manager's role in managing stakeholder expectations?",
        options: {
            a: "Balancing competing demands.",
            b: "Ignoring their concerns.",
            c: "Always agreeing to all requests.",
            d: "Limiting communication."
        },
        a: "a"
    },
    {
        q: "21. The ability of a project manager to effectively influence stakeholders is often based on their:",
        options: {
            a: "Formal authority alone.",
            b: "Personal and professional networks.",
            c: "Technical expertise only.",
            d: "Number of certifications."
        },
        a: "b"
    },
    {
        q: "22. What is a core characteristic of a project manager's communication approach?",
        options: {
            a: "Relying solely on formal written documents.",
            b: "Using only verbal communication in meetings.",
            c: "Avoiding any communication with external parties.",
            d: "Employing both written and real-time communication."
        },
        a: "d"
    },
    {
        q: "23. Which aspect of a project manager's role includes managing relationships and building trust?",
        options: {
            a: "Technical expertise.",
            b: "Leadership.",
            c: "Administrative tasks.",
            d: "Financial oversight."
        },
        a: "b"
    },
    {
        q: "24. What contributes to a project manager's political acumen?",
        options: {
            a: "Ignoring organizational dynamics.",
            b: "Strictly adhering to formal rules only.",
            c: "Avoiding all forms of negotiation.",
            d: "Understanding power structures and influence within an organization."
        },
        a: "d"
    },
    {
        q: "25. The project manager's responsibilities for a project's business benefits realization might involve:",
        options: {
            a: "Ending the project immediately after launch.",
            b: "Delegating all benefit realization to operations.",
            c: "Only focusing on project costs.",
            d: "Follow-on activities after project closeout."
        },
        a: "d"
    },
    {
        q: "26. What does a project manager do to ensure project objectives are met?",
        options: {
            a: "Guides the project team.",
            b: "Avoids decision-making.",
            c: "Focuses solely on budget.",
            d: "Ignores team input."
        },
        a: "a"
    },
    {
        q: "27. The project manager's influence on the 'Professional Discipline' relates to:",
        options: {
            a: "Developing new industry standards.",
            b: "Managing governmental regulations.",
            c: "Setting international trade policies.",
            d: "Contributing to knowledge transfer and integration within the profession."
        },
        a: "d"
    },
    {
        q: "28. The continuous application of persuasion, negotiation, compromise, and conflict resolution is critical for a project manager exhibiting:",
        options: {
            a: "Technical prowess.",
            b: "Business acumen.",
            c: "Leadership qualities.",
            d: "Administrative efficiency."
        },
        a: "c"
    },
    {
        q: "29. A project manager should be aware of factors like economic forces and process improvement strategies in their:",
        options: {
            a: "Sphere of influence - The Organization.",
            b: "Sphere of influence - Professional Discipline.",
            c: "Sphere of influence - The Project.",
            d: "Sphere of influence - The Industry."
        },
        a: "d"
    },
    {
        q: "30. What is a two-fold role for the project manager involving working with the sponsor and guiding the team?",
        options: {
            a: "Risk identification.",
            b: "Scope definition.",
            c: "Performing integration.",
            d: "Quality control."
        },
        a: "c"
    }
];


