const backendURL = "https://script.google.com/macros/s/AKfycbwSon-dKx8RWIhIvxP328WDdOFirC4Lw6fL99LNF2-4XG5kLIrJdGBHp7nDZ3FmnAIb/exec";

let level = "";
let subjects = [];

const subjectMap = {
  NEET: ["Physics", "Chemistry", "Botany", "Zoology", "Biology"],
  JEE: ["Physics", "Chemistry", "Maths"],
  CET: ["Physics", "Chemistry", "Maths"],
  BOARDS: ["Physics", "Chemistry", "Maths", "Biology"]
};

// LEVEL
document.querySelectorAll(".level-group button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".level-group button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    level = btn.dataset.level;
    loadSubjects();
  };
});

function loadSubjects() {
  const box = document.getElementById("subjects");
  box.innerHTML = "";
  subjects = [];
  subjectMap[level].forEach(s => {
    const d = document.createElement("div");
    d.innerText = s;
    d.onclick = () => {
      d.classList.toggle("active");
      subjects.includes(s) ? subjects.splice(subjects.indexOf(s),1) : subjects.push(s);
    };
    box.appendChild(d);
  });
}

// TERMS
document.getElementById("agree").onchange = e => {
  document.getElementById("submitBtn").disabled = !e.target.checked;
};

// SUBMIT
document.getElementById("submitBtn").onclick = async () => {
  if (!/^\d{10}$/.test(phone.value)) {
    alert("Enter valid 10-digit phone number");
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
    document.getElementById("success").classList.remove("hidden");
    document.getElementById("lecturerId").innerText = out.lecturerId;
    window.scrollTo(0, document.body.scrollHeight);
  }
};
