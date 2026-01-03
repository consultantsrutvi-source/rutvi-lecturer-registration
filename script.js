const backendURL = "https://script.google.com/macros/s/AKfycbwSon-dKx8RWIhIvxP328WDdOFirC4Lw6fL99LNF2-4XG5kLIrJdGBHp7nDZ3FmnAIb/exec";

const entry = document.getElementById("entryScreen");
const container = document.getElementById("container");
const steps = document.querySelectorAll(".step");

let level = "";
let subjects = [];

setTimeout(() => {
  entry.style.display = "none";
  container.classList.remove("hidden");
  steps[0].classList.add("active");
}, 2000);

// STEP 1
document.querySelectorAll(".select-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".select-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    level = btn.dataset.level;
    loadSubjects();
    nextStep(1);
  };
});

function loadSubjects() {
  const map = {
    NEET: ["Physics", "Chemistry", "Botany", "Zoology", "Biology"],
    JEE: ["Physics", "Chemistry", "Maths"],
    CET: ["Physics", "Chemistry", "Maths"],
    BOARDS: ["Physics", "Chemistry", "Maths", "Biology"]
  };
  const box = document.getElementById("subjects");
  box.innerHTML = "";
  subjects = [];
  map[level].forEach(s => {
    const pill = document.createElement("div");
    pill.className = "pill";
    pill.innerText = s;
    pill.onclick = () => {
      pill.classList.toggle("active");
      subjects.includes(s) ? subjects.splice(subjects.indexOf(s),1) : subjects.push(s);
    };
    box.appendChild(pill);
  });
}

// Continue buttons
document.querySelectorAll(".next-btn").forEach(btn => {
  btn.onclick = () => nextStep();
});

function nextStep(index) {
  steps.forEach(s => s.classList.remove("active"));
  steps[index ?? getActive()+1].classList.add("active");
}

function getActive() {
  return [...steps].findIndex(s => s.classList.contains("active"));
}

// Terms checkbox
document.getElementById("agree").onchange = e => {
  document.getElementById("submitBtn").disabled = !e.target.checked;
};

// Submit
document.getElementById("submitBtn").onclick = async () => {
  if (!/^\d{10}$/.test(phone.value)) {
    alert("Phone number must be 10 digits");
    return;
  }

  const payload = {
    name: name.value,
    age: age.value,
    phone: phone.value,
    level,
    subjects: subjects.join(", "),
    experience: experience.value,
    location: location.value,
    currentSalary: currentSalary.value,
    expectedSalary: expectedSalary.value,
    notes: notes.value
  };

  const res = await fetch(backendURL, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  const out = await res.json();
  if (out.status === "success") {
    steps.forEach(s => s.classList.remove("active"));
    document.getElementById("success").classList.add("active");
    document.getElementById("lecturerId").innerText = out.lecturerId;
  }
};
