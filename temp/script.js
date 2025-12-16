// Resume Data State
let resumeData = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadSampleData();
});

// Event Listeners Setup
function setupEventListeners() {
  const form = document.getElementById("resumeForm");

  // Personal Info Fields
  ["fullName", "email", "phone", "location", "jobTitle", "summary"].forEach(
    (field) => {
      const element = document.getElementById(field);
      if (element) {
        element.addEventListener("input", (e) => {
          resumeData.personal[field] = e.target.value;
          updatePreview();
        });
      }
    }
  );

  // Add Buttons
  document.getElementById("addExperience").addEventListener("click", (e) => {
    e.preventDefault();
    addExperienceField();
  });

  document.getElementById("addEducation").addEventListener("click", (e) => {
    e.preventDefault();
    addEducationField();
  });

  document.getElementById("addSkill").addEventListener("click", (e) => {
    e.preventDefault();
    addSkillField();
  });

  // Action Buttons
  document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

  form.addEventListener("reset", () => {
    resumeData = {
      personal: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        jobTitle: "",
        summary: "",
      },
      experience: [],
      education: [],
      skills: [],
    };
    document.getElementById("experienceList").innerHTML = "";
    document.getElementById("educationList").innerHTML = "";
    document.getElementById("skillsList").innerHTML = "";
    updatePreview();
  });
}

// Add Experience Field
function addExperienceField(data = null) {
  const id = Date.now();
  const item = data || {
    id,
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  if (!data) {
    resumeData.experience.push(item);
  }

  const html = `
        <div class="dynamic-item" data-id="${item.id}">
            <div class="item-header">
                <div>
                    <input type="text" class="form-control" placeholder="Company" value="${
                      item.company || ""
                    }" 
                        onchange="updateExperienceField(${
                          item.id
                        }, 'company', this.value)">
                </div>
                <button type="button" class="btn-remove" onclick="removeExperience(${
                  item.id
                })">×</button>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Job Title" value="${
                  item.position || ""
                }"
                    onchange="updateExperienceField(${
                      item.id
                    }, 'position', this.value)">
            </div>
            <div class="form-row">
                <input type="date" value="${item.startDate || ""}"
                    onchange="updateExperienceField(${
                      item.id
                    }, 'startDate', this.value)">
                <input type="date" value="${item.endDate || ""}"
                    onchange="updateExperienceField(${
                      item.id
                    }, 'endDate', this.value)">
            </div>
            <div class="form-group">
                <textarea placeholder="Job description..." rows="3" 
                    onchange="updateExperienceField(${
                      item.id
                    }, 'description', this.value)">${
    item.description || ""
  }</textarea>
            </div>
        </div>
    `;

  const list = document.getElementById("experienceList");
  const element = document.createElement("div");
  element.innerHTML = html;
  list.appendChild(element.firstElementChild);
  updatePreview();
}

function updateExperienceField(id, field, value) {
  const exp = resumeData.experience.find((e) => e.id === id);
  if (exp) {
    exp[field] = value;
    updatePreview();
  }
}

function removeExperience(id) {
  resumeData.experience = resumeData.experience.filter((e) => e.id !== id);
  document.querySelector(`[data-id="${id}"]`).remove();
  updatePreview();
}

// Add Education Field
function addEducationField(data = null) {
  const id = Date.now();
  const item = data || {
    id,
    school: "",
    degree: "",
    field: "",
    graduationDate: "",
  };

  if (!data) {
    resumeData.education.push(item);
  }

  const html = `
        <div class="dynamic-item" data-id="${item.id}">
            <div class="item-header">
                <div>
                    <input type="text" class="form-control" placeholder="School" value="${
                      item.school || ""
                    }"
                        onchange="updateEducationField(${
                          item.id
                        }, 'school', this.value)">
                </div>
                <button type="button" class="btn-remove" onclick="removeEducation(${
                  item.id
                })">×</button>
            </div>
            <div class="form-row">
                <input type="text" placeholder="Degree" value="${
                  item.degree || ""
                }"
                    onchange="updateEducationField(${
                      item.id
                    }, 'degree', this.value)">
                <input type="text" placeholder="Field of Study" value="${
                  item.field || ""
                }"
                    onchange="updateEducationField(${
                      item.id
                    }, 'field', this.value)">
            </div>
            <div class="form-group">
                <input type="date" value="${item.graduationDate || ""}"
                    onchange="updateEducationField(${
                      item.id
                    }, 'graduationDate', this.value)">
            </div>
        </div>
    `;

  const list = document.getElementById("educationList");
  const element = document.createElement("div");
  element.innerHTML = html;
  list.appendChild(element.firstElementChild);
  updatePreview();
}

function updateEducationField(id, field, value) {
  const edu = resumeData.education.find((e) => e.id === id);
  if (edu) {
    edu[field] = value;
    updatePreview();
  }
}

function removeEducation(id) {
  resumeData.education = resumeData.education.filter((e) => e.id !== id);
  document.querySelector(`[data-id="${id}"]`).remove();
  updatePreview();
}

// Add Skill Field
function addSkillField(data = null) {
  const id = Date.now();
  const item = data || { id, skill: "" };

  if (!data) {
    resumeData.skills.push(item);
  }

  const html = `
        <div class="dynamic-item" data-id="${item.id}">
            <div class="item-header">
                <input type="text" placeholder="Add a skill" value="${
                  item.skill || ""
                }"
                    onchange="updateSkillField(${item.id}, this.value)">
                <button type="button" class="btn-remove" onclick="removeSkill(${
                  item.id
                })">×</button>
            </div>
        </div>
    `;

  const list = document.getElementById("skillsList");
  const element = document.createElement("div");
  element.innerHTML = html;
  list.appendChild(element.firstElementChild);
  updatePreview();
}

function updateSkillField(id, value) {
  const skill = resumeData.skills.find((s) => s.id === id);
  if (skill) {
    skill.skill = value;
    updatePreview();
  }
}

function removeSkill(id) {
  resumeData.skills = resumeData.skills.filter((s) => s.id !== id);
  document.querySelector(`[data-id="${id}"]`).remove();
  updatePreview();
}

// Update Preview
function updatePreview() {
  // Update header
  document.getElementById("previewName").textContent =
    resumeData.personal.fullName || "Your Name";
  document.getElementById("previewTitle").textContent =
    resumeData.personal.jobTitle || "Professional Title";

  const contactItems = [];
  if (resumeData.personal.email)
    contactItems.push(
      `<span class="contact-item">${resumeData.personal.email}</span>`
    );
  if (resumeData.personal.phone)
    contactItems.push(
      `<span class="contact-item">${resumeData.personal.phone}</span>`
    );
  if (resumeData.personal.location)
    contactItems.push(
      `<span class="contact-item">${resumeData.personal.location}</span>`
    );

  document.getElementById("previewContact").innerHTML = contactItems.join("");

  // Update summary
  const summaryHtml = resumeData.personal.summary
    ? `<div class="resume-summary">${resumeData.personal.summary}</div>`
    : "";
  document.getElementById("previewSummary").innerHTML = summaryHtml;

  // Update experience
  let experienceHtml = "";
  if (resumeData.experience.length > 0) {
    experienceHtml =
      '<div class="resume-section-title">Professional Experience</div>';
    resumeData.experience.forEach((exp) => {
      if (exp.company || exp.position) {
        const dateRange = exp.startDate
          ? formatDate(exp.startDate) +
            (exp.endDate ? ` - ${formatDate(exp.endDate)}` : " - Present")
          : "";
        experienceHtml += `
                    <div class="resume-entry">
                        <div class="entry-header">
                            <span class="entry-title">${
                              exp.position || ""
                            }</span>
                            <span class="entry-date">${dateRange}</span>
                        </div>
                        <div class="entry-subtitle">${exp.company || ""}</div>
                        ${
                          exp.description
                            ? `<div class="entry-description">${exp.description}</div>`
                            : ""
                        }
                    </div>
                `;
      }
    });
  }
  document.getElementById("previewExperience").innerHTML = experienceHtml;

  // Update education
  let educationHtml = "";
  if (resumeData.education.length > 0) {
    educationHtml = '<div class="resume-section-title">Education</div>';
    resumeData.education.forEach((edu) => {
      if (edu.school || edu.degree) {
        const date = edu.graduationDate ? formatDate(edu.graduationDate) : "";
        educationHtml += `
                    <div class="resume-entry">
                        <div class="entry-header">
                            <span class="entry-title">${edu.degree || ""}${
          edu.field ? ` in ${edu.field}` : ""
        }</span>
                            <span class="entry-date">${date}</span>
                        </div>
                        <div class="entry-subtitle">${edu.school || ""}</div>
                    </div>
                `;
      }
    });
  }
  document.getElementById("previewEducation").innerHTML = educationHtml;

  // Update skills
  let skillsHtml = "";
  if (resumeData.skills.length > 0 && resumeData.skills.some((s) => s.skill)) {
    skillsHtml = '<div class="resume-section-title">Skills</div>';
    skillsHtml += '<div class="skills-list">';
    resumeData.skills.forEach((skill) => {
      if (skill.skill) {
        skillsHtml += `<div class="skill-item">${skill.skill}</div>`;
      }
    });
    skillsHtml += "</div>";
  }
  document.getElementById("previewSkills").innerHTML = skillsHtml;
}

// Utility Functions
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

// Download PDF (Simple implementation)
function downloadPDF() {
  const element = document.getElementById("resumePreview");
  const opt = {
    margin: 0.5,
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "portrait", unit: "in", format: "letter" },
  };

  // For now, just print
  const printWindow = window.open("", "", "height=400,width=800");
  printWindow.document.write(element.innerHTML);
  printWindow.document.close();
  printWindow.print();
}

// Load Sample Data
function loadSampleData() {
  resumeData = {
    personal: {
      fullName: "Alexandra Johnson",
      email: "alexandra.johnson@email.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      jobTitle: "Product Manager",
      summary:
        "Innovative product manager with 5+ years of experience driving product strategy and development. Proven track record of launching successful products that increase user engagement and revenue. Passionate about user-centered design and data-driven decision making.",
    },
    experience: [
      {
        id: 1,
        company: "Tech Innovations Inc.",
        position: "Senior Product Manager",
        startDate: "2022-03-01",
        endDate: "",
        description:
          "Lead cross-functional teams to develop and launch new features. Increased user retention by 40% through strategic product improvements.",
      },
      {
        id: 2,
        company: "Digital Solutions Co.",
        position: "Product Manager",
        startDate: "2020-06-01",
        endDate: "2022-02-28",
        description:
          "Managed product roadmap and prioritization. Collaborated with engineering and design teams to deliver high-impact features.",
      },
    ],
    education: [
      {
        id: 1,
        school: "University of California",
        degree: "Master of Business Administration",
        field: "Business Administration",
        graduationDate: "2020-05-15",
      },
      {
        id: 2,
        school: "State University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        graduationDate: "2018-05-15",
      },
    ],
    skills: [
      { id: 1, skill: "Product Strategy" },
      { id: 2, skill: "User Research" },
      { id: 3, skill: "Data Analytics" },
      { id: 4, skill: "Agile Management" },
      { id: 5, skill: "Stakeholder Communication" },
      { id: 6, skill: "Figma" },
    ],
  };

  // Populate form fields
  document.getElementById("fullName").value = resumeData.personal.fullName;
  document.getElementById("email").value = resumeData.personal.email;
  document.getElementById("phone").value = resumeData.personal.phone;
  document.getElementById("location").value = resumeData.personal.location;
  document.getElementById("jobTitle").value = resumeData.personal.jobTitle;
  document.getElementById("summary").value = resumeData.personal.summary;

  // Add experience items
  resumeData.experience.forEach((exp) => addExperienceField(exp));

  // Add education items
  resumeData.education.forEach((edu) => addEducationField(edu));

  // Add skills
  resumeData.skills.forEach((skill) => addSkillField(skill));

  updatePreview();
}

// Add focus styles to inputs
document.addEventListener("click", (e) => {
  if (e.target.matches("input, textarea, select")) {
    e.target.closest(".form-group")?.classList.add("focused");
  }
});
