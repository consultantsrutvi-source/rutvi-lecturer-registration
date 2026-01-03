const backendURL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";

const loader = document.getElementById("loader");
const form = document.getElementById("lecturerForm");
const success = document.getElementById("success");

setTimeout(() => {
  loader.style.display = "none";
  form.style.display = "block";
}, 2000);

// Subject logic
const subjectsByLevel = {
  NEET: ["Physics", "Chemistry", "Zoology", "Botany", "Biology"],
  JEE: ["Physics", "Chemistry", "Maths"],
  CET: ["Physics", "Chemistry", "Maths"],
  BOARDS: ["Physics", "Chemistry", "Maths", "Biology"]
};

document.getElementById("level").addEventListener("change", function () {
  const sub = document.getElementById("subjects");
  sub.innerHTML = "";
  subjectsByLevel[this.value]?.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    sub.appendChild(opt);
  });
});

// Submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = document.getElementById("phone").value;
  if (!/^\d{10}$/.test(phone)) {
    alert("Phone must be 10 digits");
    return;
  }

  const data = {
    name: name.value,
    age: age.value,
    phone,
    level: level.value,
    subjects: [...subjects.selectedOptions].map(o => o.value).join(", "),
    experience: experience.value,
    location: location.value,
    currentSalary: currentSalary.value,
    expectedSalary: expectedSalary.value,
    notes: notes.value
  };

  const res = await fetch(backendURL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  const result = await res.json();
  if (result.status === "success") {
    form.style.display = "none";
    success.style.display = "block";
    document.getElementById("lecturerId").innerText = result.lecturerId;
  }
});
