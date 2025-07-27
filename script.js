const quizForm = document.getElementById("quizForm");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const timeDisplay = document.getElementById("time");

let timeLeft = 3600; // 5 minutes
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
            c: "Stakeholder expectations and requirements and financial resources allocated to a project",
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
    },

    {
        q: "31. A project manager's role is typically visible from which phase of the project lifecycle?",
        options: {
            a: "Planning.",
            b: "Initiation through closing.",
            c: "Execution only.",
            d: "Monitoring and controlling."
        },
        a: "b"
    },
    {
        q: "32. What is a primary responsibility of the project manager?",
        options: {
            a: "Handling daily operational tasks.",
            b: "Performing all project work themselves.",
            c: "Setting organizational strategic objectives.",
            d: "Leading the project team and coordinating efforts."
        },
        a: "d"
    },
    {
        q: "33. The project manager's influence extends across what primary domains?",
        options: {
            a: "Project, organization, and industry.",
            b: "Personal life, work, and hobbies.",
            c: "Financial, legal, and marketing.",
            d: "Past, present, and future projects."
        },
        a: "a"
    },
    {
        q: "34. Which of the following is considered part of the project manager's sphere of influence within the project?",
        options: {
            a: "Negotiating new business contracts.",
            b: "Managing external market changes.",
            c: "Balancing competing project constraints.",
            d: "Developing new company policies."
        },
        a: "c"
    },
    {
        q: "35. When a project manager interacts with senior leaders to align project objectives with strategic goals, they are influencing which domain?",
        options: {
            a: "The project itself.",
            b: "The organization.",
            c: "The professional discipline.",
            d: "Across other disciplines."
        },
        a: "b"
    },
    {
        q: "36. Understanding current product development and market niches falls under the project manager's influence on which domain?",
        options: {
            a: "The industry.",
            b: "The organization.",
            c: "The project team.",
            d: "Professional discipline."
        },
        a: "a"
    },
    {
        q: "37. The PMI Talent Triangle® emphasizes what three key skill areas for project managers?",
        options: {
            a: "Technical, financial, and legal.",
            b: "Leadership, communication, and negotiation.",
            c: "Technical project management, strategic and business management, and leadership.",
            d: "Planning, executing, and closing."
        },
        a: "c"
    },
    {
        q: "38. Which skill set involves the knowledge of project management processes, tools, and techniques?",
        options: {
            a: "Business acumen.",
            b: "Strategic management.",
            c: "Interpersonal skills.",
            d: "Technical project management skills."
        },
        a: "d"
    },
    {
        q: "39. What type of skills enable a project manager to understand the organization's strategy and how projects contribute to it?",
        options: {
            a: "Leadership skills.",
            b: "Technical skills.",
            c: "Strategic and business management skills.",
            d: "Personal communication skills."
        },
        a: "c"
    },
    {
        q: "40. A project manager who inspires the team, fosters collaboration, and resolves conflicts is demonstrating strong:",
        options: {
            a: "Technical project management skills.",
            b: "Strategic and business management skills.",
            c: "Leadership skills.",
            d: "Administrative skills."
        },
        a: "c"
    },
    {
        q: "41. How does leadership primarily differ from management in the context of project management?",
        options: {
            a: "Leadership focuses on relationships and vision, while management focuses on processes and tasks.",
            b: "Leadership is about control, management is about inspiring.",
            c: "They are identical concepts with no differences.",
            d: "Management is for senior roles, leadership is for junior roles."
        },
        a: "a"
    },
    {
        q: "42. A project manager who is optimistic, positive, and collaborative exhibits traits of a good:",
        options: {
            a: "Administrator.",
            b: "Leader.",
            c: "Technical expert.",
            d: "Financial analyst."
        },
        a: "b"
    },
    {
        q: "43. Which of the following is a key aspect of a project manager's integration role at the process level?",
        options: {
            a: "Guiding the team to integrate various project management processes.",
            b: "Developing personal hobbies.",
            c: "Conducting external market research.",
            d: "Managing daily operational duties."
        },
        a: "a"
    },
    {
        q: "44. What does 'integration at the cognitive level' refer to for a project manager?",
        options: {
            a: "Combining different project management software.",
            b: "Integrating new team members into the project.",
            c: "Merging different organizational departments.",
            d: "The ability to understand and combine different pieces of information."
        },
        a: "d"
    },
    {
        q: "45. When a project manager aligns project objectives with the organization's strategic objectives, they are performing integration at what level?",
        options: {
            a: "Process level.",
            b: "Cognitive level.",
            c: "Context level.",
            d: "Personal level."
        },
        a: "c"
    },
    {
        q: "46. What does 'performing integration' primarily mean for a project manager?",
        options: {
            a: "Separating all project components.",
            b: "Combining project processes, knowledge, and people effectively.",
            c: "Automating all project tasks.",
            d: "Delegating all responsibilities to the team."
        },
        a: "b"
    },
    {
        q: "47. Effective project managers often develop extensive formal and informal networks to:",
        options: {
            a: "Solve problems and navigate organizational structures.",
            b: "Avoid communication.",
            c: "Limit team interactions.",
            d: "Increase project complexity."
        },
        a: "a"
    },
    {
        q: "48. What kind of skills help a project manager manage conflict and build consensus among stakeholders?",
        options: {
            a: "Technical coding skills.",
            b: "Interpersonal and communication skills.",
            c: "Financial auditing skills.",
            d: "Data entry skills."
        },
        a: "b"
    },
    {
        q: "49. A project manager's involvement in 'pre-initiation activities' might include:",
        options: {
            a: "Writing the final project report.",
            b: "Decommissioning project resources.",
            c: "Conducting post-project audits.",
            d: "Consulting with leaders on strategic objectives."
        },
        a: "d"
    },
    {
        q: "50. What is a crucial aspect of a project manager's role in managing stakeholder expectations?",
        options: {
            a: "Balancing competing demands.",
            b: "Ignoring their concerns.",
            c: "Always agreeing to all requests.",
            d: "Limiting communication."
        },
        a: "a"
    },
    {
        q: "51. The ability of a project manager to effectively influence stakeholders is often based on their:",
        options: {
            a: "Formal authority alone.",
            b: "Personal and professional networks.",
            c: "Technical expertise only.",
            d: "Number of certifications."
        },
        a: "b"
    },
    {
        q: "52. What is a core characteristic of a project manager's communication approach?",
        options: {
            a: "Relying solely on formal written documents.",
            b: "Using only verbal communication in meetings.",
            c: "Avoiding any communication with external parties.",
            d: "Employing both written and real-time communication."
        },
        a: "d"
    },
    {
        q: "53. Which aspect of a project manager's role includes managing relationships and building trust?",
        options: {
            a: "Technical expertise.",
            b: "Leadership.",
            c: "Administrative tasks.",
            d: "Financial oversight."
        },
        a: "b"
    },
    {
        q: "54. What contributes to a project manager's political acumen?",
        options: {
            a: "Ignoring organizational dynamics.",
            b: "Strictly adhering to formal rules only.",
            c: "Avoiding all forms of negotiation.",
            d: "Understanding power structures and influence within an organization."
        },
        a: "d"
    },
    {
        q: "55. The project manager's responsibilities for a project's business benefits realization might involve:",
        options: {
            a: "Ending the project immediately after launch.",
            b: "Delegating all benefit realization to operations.",
            c: "Only focusing on project costs.",
            d: "Follow-on activities after project closeout."
        },
        a: "d"
    },
    {
        q: "56. What does a project manager do to ensure project objectives are met?",
        options: {
            a: "Guides the project team.",
            b: "Avoids decision-making.",
            c: "Focuses solely on budget.",
            d: "Ignores team input."
        },
        a: "a"
    },
    {
        q: "57. The project manager's influence on the 'Professional Discipline' relates to:",
        options: {
            a: "Developing new industry standards.",
            b: "Managing governmental regulations.",
            c: "Setting international trade policies.",
            d: "Contributing to knowledge transfer and integration within the profession."
        },
        a: "d"
    },
    {
        q: "58. The continuous application of persuasion, negotiation, compromise, and conflict resolution is critical for a project manager exhibiting:",
        options: {
            a: "Technical prowess.",
            b: "Business acumen.",
            c: "Leadership qualities.",
            d: "Administrative efficiency."
        },
        a: "c"
    },
    {
        q: "59. A project manager should be aware of factors like economic forces and process improvement strategies in their:",
        options: {
            a: "Sphere of influence - The Organization.",
            b: "Sphere of influence - Professional Discipline.",
            c: "Sphere of influence - The Project.",
            d: "Sphere of influence - The Industry."
        },
        a: "d"
    },
    {
        q: "60. What is a two-fold role for the project manager involving working with the sponsor and guiding the team?",
        options: {
            a: "Risk identification.",
            b: "Scope definition.",
            c: "Performing integration.",
            d: "Quality control."
        },
        a: "c"
    },
    {
        q: "61. What is the unique responsibility of the project manager that cannot be delegated?",
        options: {
            a: "Resource allocation.",
            b: "Risk identification.",
            c: "Project integration management.",
            d: "Quality assurance."
        },
        a: "c"
    },
    {
        q: "62. A project's cost estimate for a contingency plan integrates processes from which Project Management Knowledge Areas?",
        options: {
            a: "Scope, Communication, and Quality.",
            b: "Cost, Schedule, and Risk.",
            c: "Procurement, Stakeholder, and Resources.",
            d: "Time, Scope, and Integration."
        },
        a: "b"
    },
    {
        q: "63. The links among project management processes are often described as being:",
        options: {
            a: "Strictly sequential.",
            b: "Always one-way.",
            c: "Highly iterative.",
            d: "Rarely connected."
        },
        a: "c"
    },
    {
        q: "64. Which process formally authorizes the existence of a project and grants the project manager authority?",
        options: {
            a: "Develop Project Management Plan.",
            b: "Direct and Manage Project Work.",
            c: "Develop Project Charter.",
            d: "Close Project or Phase."
        },
        a: "c"
    },
    {
        q: "65. The Project Charter serves to link the project to what?",
        options: {
            a: "Individual team member goals.",
            b: "Vendor contracts.",
            c: "Strategic objectives of the organization.",
            d: "Daily operational tasks."
        },
        a: "c"
    },
    {
        q: "66. Which document is explicitly stated as not being a contract?",
        options: {
            a: "The Project Management Plan.",
            b: "The Project Charter.",
            c: "The Scope Statement.",
            d: "The Requirements Documentation."
        },
        a: "b"
    },
    {
        q: "67. What is the primary benefit of the Direct and Manage Project Work process?",
        options: {
            a: "Defining project scope.",
            b: "Providing overall management of project work.",
            c: "Identifying project risks.",
            d: "Closing project contracts."
        },
        a: "b"
    },
    {
        q: "68. Collecting and communicating work performance data to controlling processes for analysis is an output of which process?",
        options: {
            a: "Monitor and Control Project Work.",
            b: "Direct and Manage Project Work.",
            c: "Develop Project Management Plan.",
            d: "Close Project or Phase."
        },
        a: "a"
    },
    {
        q: "69. What is the main purpose of the Manage Project Knowledge process?",
        options: {
            a: "To limit information sharing.",
            b: "To strictly adhere to old practices.",
            c: "To leverage existing and create new knowledge for organizational learning.",
            d: "To prevent any new knowledge from being created."
        },
        a: "c"
    },
    {
        q: "70. Which type of knowledge is personal and difficult to express or codify?",
        options: {
            a: "Explicit knowledge.",
            b: "Implicit knowledge.",
            c: "Tacit knowledge.",
            d: "Procedural knowledge."
        },
        a: "c"
    },
    {
        q: "71. What is the key output of the Manage Project Knowledge process that is created early and updated throughout the project?",
        options: {
            a: "Project Charter.",
            b: "Lessons Learned Register.",
            c: "Risk Report.",
            d: "Stakeholder Register."
        },
        a: "b"
    },
    {
        q: "72. The Monitor and Control Project Work process primarily focuses on what activity?",
        options: {
            a: "Initiating new projects.",
            b: "Tracking, reviewing, and reporting overall progress.",
            c: "Recruiting new team members.",
            d: "Finalizing project deliverables."
        },
        a: "b"
    },
    {
        q: "73. This process involves comparing actual project performance to the planned performance:",
        options: {
            a: "Develop Project Charter.",
            b: "Direct and Manage Project Work.",
            c: "Monitor and Control Project Work.",
            d: "Perform Integrated Change Control."
        },
        a: "c"
    },
    {
        q: "74. What is the primary purpose of the Perform Integrated Change Control process?",
        options: {
            a: "To avoid all project changes.",
            b: "To quickly implement every change request.",
            c: "To review, approve or reject, and manage changes to baselines.",
            d: "To solely document changes without approval."
        },
        a: "c"
    },
    {
        q: "75. What are the two main types of management supported by change control tools?",
        options: {
            a: "Risk and Quality Management.",
            b: "Configuration and Change Management.",
            c: "Scope and Schedule Management.",
            d: "Cost and Resource Management."
        },
        a: "b"
    },
    {
        q: "76. What group is typically responsible for reviewing and deciding on change requests?",
        options: {
            a: "The project team alone.",
            b: "The Project Sponsor.",
            c: "The Change Control Board (CCB).",
            d: "External stakeholders only."
        },
        a: "c"
    },
    {
        q: "77. Which process formally completes the project, phase, or contract?",
        options: {
            a: "Direct and Manage Project Work.",
            b: "Monitor and Control Project Work.",
            c: "Perform Integrated Change Control.",
            d: "Close Project or Phase."
        },
        a: "d"
    },
    {
        q: "78. The use of Project Management Information Systems (PMIS) is a trend in integration management that helps manage:",
        options: {
            a: "Team morale.",
            b: "The volume of project data.",
            c: "Individual skill sets.",
            d: "External economic factors."
        },
        a: "b"
    },
    {
        q: "79. Which trend in integration management involves more rigorous processes due to a mobile workforce?",
        options: {
            a: "Use of visual management tools.",
            b: "Hybrid methodologies.",
            c: "Project knowledge management.",
            d: "Expanded project manager responsibilities."
        },
        a: "d"
    },
    {
        q: "80. When project managers are involved in business case development and benefits management, this reflects which trend?",
        options: {
            a: "Less stakeholder engagement.",
            b: "Automation of all tasks.",
            c: "Expanding project manager responsibilities.",
            d: "Reducing project complexity."
        },
        a: "c"
    },
    {
        q: "81. What approach involves delegating control of detailed product planning and delivery to the project team?",
        options: {
            a: "Predictive methodologies.",
            b: "Waterfall approach.",
            c: "Adaptive (agile/iterative) environments.",
            d: "Traditional project management."
        },
        a: "c"
    },
    {
        q: "82. What is a key tailoring consideration regarding the project life cycle?",
        options: {
            a: "The project's physical location.",
            b: "The appropriate phases for the project.",
            c: "The project manager's personal preference.",
            d: "The size of the project team."
        },
        a: "b"
    },
    {
        q: "83. When tailoring, determining whether a predictive, adaptive, or hybrid approach is best for the product or service refers to the:",
        options: {
            a: "Management approaches.",
            b: "Development life cycle.",
            c: "Knowledge management strategy.",
            d: "Governance framework."
        },
        a: "b"
    },
    {
        q: "84. A project manager's ability to build a collaborative decision-making environment is especially important in:",
        options: {
            a: "Functional organizations.",
            b: "Very large, complex projects.",
            c: "Adaptive environments.",
            d: "Projects with minimal changes."
        },
        a: "c"
    },
    {
        q: "85. The project manager's responsibility for project integration management cannot be:",
        options: {
            a: "Documented.",
            b: "Accounted for.",
            c: "Delegated or transferred.",
            d: "Understood."
        },
        a: "c"
    },
    {
        q: "86. An input to the Develop Project Charter process that provides project objectives and contributions to business goals is the:",
        options: {
            a: "Work Breakdown Structure.",
            b: "Benefits Management Plan.",
            c: "Stakeholder Register.",
            d: "Risk Management Plan."
        },
        a: "b"
    },
    {
        q: "87. Corrective actions, preventive actions, and defect repairs are outputs or results of which process?",
        options: {
            a: "Monitor and Control Project Work.",
            b: "Perform Integrated Change Control.",
            c: "Direct and Manage Project Work.",
            d: "Close Project or Phase."
        },
        a: "c"
    },
    {
        q: "88. This process includes activities like comparing actual project performance against the plan and assessing performance periodically:",
        options: {
            a: "Direct and Manage Project Work.",
            b: "Close Project or Phase.",
            c: "Monitor and Control Project Work.",
            d: "Develop Project Charter."
        },
        a: "c"
    },
    {
        q: "89. What type of data analysis involves comparing different courses of action to achieve a specific outcome?",
        options: {
            a: "Regression analysis.",
            b: "Variance analysis.",
            c: "Alternatives analysis.",
            d: "Earned value analysis."
        },
        a: "c"
    },
    {
        q: "90. In agile environments, the project manager focuses on what concerning the team?",
        options: {
            a: "Micro-managing their daily tasks.",
            b: "Ensuring the team can respond to changes.",
            c: "Dictating all project decisions.",
            d: "Limiting team interaction."
        },
        a: "b"
    }
];


