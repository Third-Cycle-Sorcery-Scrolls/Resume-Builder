// --- STATE MANAGEMENT ---
// We keep the data in arrays to easily render lists
let experienceData = [
  {
    title: "New Position",
    date: "Year - Year",
    company: "Company",
    desc: "Responsibility 1\nResponsibility 2",
  },
];

let educationData = [
  {
    degree: "Degree",
    school: "School",
    year: "Year - Year",
  },
];

let skillsData = [{ name: "Skill 1", percent: 90 }];

// --- INITIAL RENDER ---
window.onload = function () {
  renderExperienceInputs();
  renderExperiencePreview();

  renderEducationInputs();
  renderEducationPreview();

  renderSkillsInputs();
  renderSkillsPreview();
};

// --- SIMPLE FIELDS UPDATE ---
function updateText(id, value) {
  document.getElementById(id).innerText = value;
}

function updatePhoto(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("user_photo").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// --- EXPERIENCE SECTION ---
function renderExperienceInputs() {
  const container = document.getElementById("experience_inputs");
  container.innerHTML = "";
  experienceData.forEach((job, index) => {
    container.innerHTML += `
            <div class="dynamic-list-item">
              <button class="btn btn-remove" onclick="removeExperience(${index})">X</button>
              <div class="form-group">
                <input placeholder="Job Title" value="${job.title}" oninput="updateExperience(${index}, 'title', this.value)">
              </div>
              <div class="form-group">
                <input placeholder="Date" value="${job.date}" oninput="updateExperience(${index}, 'date', this.value)">
              </div>
              <div class="form-group">
                <input placeholder="Company" value="${job.company}" oninput="updateExperience(${index}, 'company', this.value)">
              </div>
              <div class="form-group">
                <textarea placeholder="Description (One bullet per line)" oninput="updateExperience(${index}, 'desc', this.value)">${job.desc}</textarea>
              </div>
            </div>
          `;
  });
}

function renderExperiencePreview() {
  const container = document.getElementById("experience_section");
  container.innerHTML = "";
  experienceData.forEach(job => {
    // Split description by new lines to make list items
    const listItems = job.desc
      .split("\n")
      .map(line => (line.trim() ? `<li>${line}</li>` : ""))
      .join("");

    container.innerHTML += `
            <div class="job">
              <div style="display:flex; justify-content:space-between;">
                <h3 class="job-title">${job.title}</h3>
                <div class="job-date">${job.date}</div>
              </div>
              <div class="job-company">${job.company}</div>
              <ul>${listItems}</ul>
            </div>
          `;
  });
}

function addExperience() {
  experienceData.push({
    title: "New Position",
    date: "Year",
    company: "Company",
    desc: "Responsibility 1",
  });
  renderExperienceInputs();
  renderExperiencePreview();
}

function updateExperience(index, field, value) {
  experienceData[index][field] = value;
  renderExperiencePreview();
}

function removeExperience(index) {
  experienceData.splice(index, 1);
  renderExperienceInputs();
  renderExperiencePreview();
}

// --- EDUCATION SECTION ---
function renderEducationInputs() {
  const container = document.getElementById("education_inputs");
  container.innerHTML = "";
  educationData.forEach((edu, index) => {
    container.innerHTML += `
            <div class="dynamic-list-item">
              <button class="btn btn-remove" onclick="removeEducation(${index})">X</button>
              <div class="form-group">
                <input placeholder="Degree" value="${edu.degree}" oninput="updateEducation(${index}, 'degree', this.value)">
              </div>
              <div class="form-group">
                <input placeholder="School" value="${edu.school}" oninput="updateEducation(${index}, 'school', this.value)">
              </div>
              <div class="form-group">
                <input placeholder="Year" value="${edu.year}" oninput="updateEducation(${index}, 'year', this.value)">
              </div>
            </div>
          `;
  });
}

function renderEducationPreview() {
  const container = document.getElementById("education_section");
  container.innerHTML = "";
  educationData.forEach(edu => {
    container.innerHTML += `
            <div style="margin-bottom: 10px;">
              <p><strong>${edu.degree}</strong></p>
              <p>${edu.school}</p>
              <p>${edu.year}</p>
            </div>
          `;
  });
}

function addEducation() {
  educationData.push({ degree: "Degree", school: "School", year: "Year" });
  renderEducationInputs();
  renderEducationPreview();
}

function updateEducation(index, field, value) {
  educationData[index][field] = value;
  renderEducationPreview();
}

function removeEducation(index) {
  educationData.splice(index, 1);
  renderEducationInputs();
  renderEducationPreview();
}

// --- SKILLS SECTION ---
function renderSkillsInputs() {
  const container = document.getElementById("skills_inputs");
  container.innerHTML = "";
  skillsData.forEach((skill, index) => {
    container.innerHTML += `
            <div class="dynamic-list-item">
              <button class="btn btn-remove" onclick="removeSkill(${index})">X</button>
              <div class="form-group">
                <input placeholder="Skill Name" value="${skill.name}" oninput="updateSkill(${index}, 'name', this.value)">
              </div>
              <div class="form-group">
                <label>Level: <span id="skill_val_${index}">${skill.percent}%</span></label>
                <input type="range" min="0" max="100" value="${skill.percent}" oninput="updateSkill(${index}, 'percent', this.value)">
              </div>
            </div>
          `;
  });
}

function renderSkillsPreview() {
  const container = document.getElementById("skills_section");
  container.innerHTML = "";
  skillsData.forEach(skill => {
    container.innerHTML += `
            <div class="skill-item">
              <div class="skill-label">
                <span>${skill.name}</span>
                <span>${skill.percent}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-fill" style="width:${skill.percent}%"></div>
              </div>
            </div>
          `;
  });
}

function addSkill() {
  skillsData.push({ name: "New Skill", percent: 50 });
  renderSkillsInputs();
  renderSkillsPreview();
}

function updateSkill(index, field, value) {
  skillsData[index][field] = value;
  if (field === "percent") {
    document.getElementById(`skill_val_${index}`).innerText = value + "%";
  }
  renderSkillsPreview();
}

function removeSkill(index) {
  skillsData.splice(index, 1);
  renderSkillsInputs();
  renderSkillsPreview();
}
