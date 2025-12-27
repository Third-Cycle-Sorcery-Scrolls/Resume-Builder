//global variable,
let isEditingProfile = false;

//function to load sidebar content
function loadSideBar() {
  const profileHeader = document.getElementById("profile_header");
  const p_header = getProfileHeader();
  profileHeader.innerHTML = p_header;
}

function saveProfile() {
  //get values from inputs
  console.log("Saving profile...");

  if (isEditingProfile) {
    //only save changes if in editing mode
    console.log("In editing mode, saving changes...");
    //get old profile details to retain image if not changed
    const oldProfileDetails =
      JSON.parse(localStorage.getItem("profileDetails")) || {};
    const profileDetails = {};
    profileDetails.fullName =
      document.getElementById("first_name").value || oldProfileDetails.fullName;
    profileDetails.proTitle =
      document.getElementById("Pro_title").value || oldProfileDetails.proTitle;
    profileDetails.email =
      document.getElementById("email").value || oldProfileDetails.email;
    profileDetails.phone =
      document.getElementById("phone").value || oldProfileDetails.phone;
    profileDetails.address =
      document.getElementById("address").value || oldProfileDetails.address;

    const profileImageInput = document.getElementById("profile_image");
    const file = profileImageInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileDetails.profileImage = e.target.result;
        console.log("Profile Details with Image:", profileDetails);
        //save to local storage after image is loaded
        localStorage.setItem("profileDetails", JSON.stringify(profileDetails));
      };
      reader.readAsDataURL(file);
    } else {
      //retain old image if no new image is selected
      profileDetails.profileImage = oldProfileDetails.profileImage || "";
      //save to local storage if no image is selected
      localStorage.setItem("profileDetails", JSON.stringify(profileDetails));
    }
    isEditingProfile = false;
    //reload sidebar to show preview
    setTimeout(() => {
      loadSideBar();
    }, 100);
  } else {
    const profileDetails = {};
    profileDetails.fullName = document.getElementById("first_name").value;
    profileDetails.proTitle = document.getElementById("Pro_title").value;
    profileDetails.email = document.getElementById("email").value;
    profileDetails.phone = document.getElementById("phone").value;
    profileDetails.address = document.getElementById("address").value;

    const profileImageInput = document.getElementById("profile_image");
    const file = profileImageInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileDetails.profileImage = e.target.result;
        console.log("Profile Details with Image:", profileDetails);
        //save to local storage after image is loaded
        localStorage.setItem("profileDetails", JSON.stringify(profileDetails));
      };
      reader.readAsDataURL(file);
    } else {
      //save to local storage if no image is selected
      localStorage.setItem("profileDetails", JSON.stringify(profileDetails));
    }
    isEditingProfile = false;
    //reload sidebar to show preview
    setTimeout(() => {
      loadSideBar();
    }, 100);
  }
}

//atach event listener to image input for preview
function setupImagePreview() {
  const imageInput = document.getElementById("profile_image");
  const imagePreview = document.getElementById("image_preview");
  const cameraIcon = document.getElementById("camera_icon");

  imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        //remove camera icon
        cameraIcon.style.display = "none";
        //set preview image
        imagePreview.style.backgroundImage = `url(${e.target.result})`;
        imagePreview.style.backgroundSize = "cover";
        imagePreview.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(file);
    }
  });
}

//atach to window for global access
window.loadSideBar = loadSideBar;
//loadSidebar
document.addEventListener("DOMContentLoaded", loadSideBar);
window.editProfile = editProfile;
window.saveProfile = saveProfile;
window.showPreviewProfileDetails = showPreviewProfileDetails;
window.setupImagePreview = setupImagePreview;

//edit profile function
function editProfile() {
  //reload sidebar with form
  console.log("Editing profile...");
  isEditingProfile = true;
  loadSideBar();
}

//function to show preview of profile details in sidebar

function showPreviewProfileDetails() {
  const profileDetails = JSON.parse(localStorage.getItem("profileDetails"));
  if (!profileDetails) return;

  //create a preview container
  const p_c = document.createElement("div"); //preview container
  p_c.className = "profile-preview";
  //   relative position for edit button
  p_c.style.position = "relative";

  //add two sections: details left, image right
  const detailsDiv = document.createElement("div");
  detailsDiv.className = "details-left";

  const imageDiv = document.createElement("div");
  imageDiv.className = "image-right";

  //add details to detailsDiv
  detailsDiv.innerHTML = `
        <h2><i class="fas fa-user"></i> ${profileDetails.fullName || ""}</h2>
        <h3><i class="fas fa-briefcase"></i> ${
          profileDetails.proTitle || ""
        }</h3>
        <p><i class="fas fa-envelope"></i> ${profileDetails.email || ""}</p>
        <p><i class="fas fa-phone"></i> ${profileDetails.phone || ""}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${
          profileDetails.address || ""
        }</p>
        <button type="button" class="edit-button" style="position: absolute; top: 10px; right: 10px;" onclick="editProfile()" id="edit_button">
          <i class="fas fa-edit"></i>
        </button>
    `;

  //add image to imageDiv
  if (profileDetails.profileImage) {
    imageDiv.style.backgroundImage = `url(${profileDetails.profileImage})`;
    imageDiv.style.backgroundSize = "cover";
    imageDiv.style.backgroundPosition = "center";
    imageDiv.style.width = "100px";
    imageDiv.style.height = "100px";
    imageDiv.style.borderRadius = "50%";
  }

  //hide the form inputs
  const personalDetailsForm = document.querySelector(
    ".personal-details-section"
  );
  console.log(personalDetailsForm);
  // personalDetailsForm.style.display = "none";

  //append details and image divs to preview container
  p_c.appendChild(detailsDiv);
  p_c.appendChild(imageDiv);

  //append preview_container to profile_header
  const profileHeader = document.getElementById("profile_header");
  profileHeader.appendChild(p_c);
}

function getProfileHeader() {
  const profileDetails = JSON.parse(localStorage.getItem("profileDetails"));
  if (profileDetails && !isEditingProfile) {
    //show preview if details exist
    return setTimeout(() => {
      showPreviewProfileDetails();
    }, 0);
  }
  return `
  <div class="sidebar-section personal-details-section">
    <h2 class="sidebar-title">Edit Personal Details</h2>
    <div class="personal-details-form">
      <div class="name-image">
           <div class="name-inputs">
                <label for="first_name">Full Name</label>
                <input
                    value="${profileDetails ? profileDetails.fullName : ""}"
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Full Name"
                />
                <label for="Pro_title">Professional Title</label>
                <input
                   value="${profileDetails ? profileDetails.proTitle : ""}"
                    type="text"
                    id="Pro_title"
                    name="Pro_title"
                    placeholder="Professional Title"
                />
           </div>
           <div class="image-input">
                <p>Profile Image</p>
                <label for="profile_image" class="image-preview" id="image_preview">
                    <img id="camera_icon" src="./public/camera.png" alt="Camera Icon" />
                </label>
                <input
                    onChange="setupImagePreview()"
                    value="${profileDetails ? profileDetails.profileImage : ""}"
                    type="file"
                    id="profile_image"
                    name="profile_image"
                    accept="image/*"
                />
             </div>

        </div>
        <div class="input_sidebar">
            <label for="email">Email</label>
            <input value="${
              profileDetails ? profileDetails.email : ""
            }" type="email" id="email" name="email" placeholder="Email" />
      </div>
      <div class="input_sidebar">
        <label for="phone">Phone</label>
        <input value="${
          profileDetails ? profileDetails.phone : ""
        }" type="tel" id="phone" name="phone" placeholder="Phone" />
      </div>
      <div class="input_sidebar">
        <label for="address">Address</label>
        <input value="${
          profileDetails ? profileDetails.address : ""
        }" type="text" id="address" name="address" placeholder="Address" />
      </div>

      <button type="button" onclick="saveProfile()" id="done_button">
        Done
      </button>
    </div>
</div>
    `;
}

function loadResumePreview() {
  console.log("resume preview loaded");
  const resumePreviewData = {
    personal: {
      fullName: "Lorna Alvarado",
      jobTitle: "Marketing Manager",
      email: "hello@reallygreatsite.com",
      phone: "+123-456-7890",
      location: "123 Anywhere St., Any City, ST 12345",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    education: [
      {
        id: 1,
        school: "Barcelie University",
        degree: "Bachelor of Business Management",
        startDate: "2016",
        endDate: "2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec lacus egestas accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque. Sed leo nisl, semper ac hendrerit a, sollicitudin in arcu.",
      },
      {
        id: 2,
        school: "Barcelie University",
        degree: "Bachelor of Business Management",
        startDate: "2020",
        endDate: "2023",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec lacus egestas accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque. Sed leo nisl, semper ac hendrerit a, sollicitudin in arcu.",
      },
    ],
    experience: [
      {
        id: 1,
        position: "Product Design Manager",
        company: "Arowawi Industries",
        startDate: "2016",
        endDate: "2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec lacus egestas accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque.",
      },
      {
        id: 2,
        position: "Marketing Manager",
        company: "Arowawi Industries",
        startDate: "2019",
        endDate: "2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec lacus egestas accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque.",
      },
      {
        id: 3,
        position: "Marketing Manager",
        company: "Arowawi Industries",
        startDate: "2017",
        endDate: "2019",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec lacus egestas accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque.",
      },
      {
        id: 4,
        position: "Marketing Manager",
        company: "Arowawi Industries",
        startDate: "2016",
        endDate: "2017",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec lacus egestas accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque.",
      },
    ],
    skills: [
      { id: 1, skill: "Management Skills" },
      { id: 2, skill: "Creativity" },
      { id: 3, skill: "Digital Marketing" },
      { id: 4, skill: "Negotiation" },
      { id: 5, skill: "Critical Thinking" },
      { id: 6, skill: "Leadership" },
    ],
    references: [
      {
        id: 1,
        name: "Harumi Kobayashi",
        position: "Wardiere Inc. / CEO",
        phone: "123-456-7890",
        email: "hello@reallygreatsite.com",
      },
      {
        id: 2,
        name: "Bailey Dupont",
        position: "Wardiere Inc. / CEO",
        phone: "123-456-7890",
        email: "hello@reallygreatsite.com",
      },
    ],
  };

  // Load Preview
  const preview = document.getElementById("preview");

  // Create left and right containers
  const leftContainer = document.createElement("div");
  leftContainer.className = "left-preview";
  const rightContainer = document.createElement("div");
  rightContainer.className = "right-preview";

  // Create triangle and image
  const triangle = document.createElement("div");
  triangle.className = "triangle";
  leftContainer.appendChild(triangle);

  const img = document.createElement("img");
  img.src = "../public/avatar.svg"; // place your image inside same folder
  img.alt = "Profile Image";
  img.classList = "profile_image";
  leftContainer.appendChild(img);

  // Populate left side
  function populateLeftContainer(leftContainer) {
    const nameTitle = document.createElement("div");
    nameTitle.className = "name-title";
    nameTitle.innerHTML = `
    <h2 class="full-name">Alehegne Geta</h2>
    <p class="job-title">Marketing Manager</p>
  `;
    leftContainer.appendChild(nameTitle);

    // Contact Section
    const contactSection = document.createElement("div");
    contactSection.className = "section contact";
    contactSection.innerHTML = `
    <h3 class="section-title">Contact</h3>
    <ul>
      <li><i class="fa fa-phone"></i> +123-456-7890</li>
      <li><i class="fa fa-envelope"></i> hello@reallygreatsite.com</li>
      <li><i class="fa fa-map-marker"></i> 123 Anywhere St, Any City, ST 12345</li>
    </ul>
  `;
    leftContainer.appendChild(contactSection);

    // About Section
    const aboutSection = document.createElement("div");
    aboutSection.className = "section about";
    aboutSection.innerHTML = `
    <h3 class="section-title">About Me</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  `;
    leftContainer.appendChild(aboutSection);

    // Skills Section
    const skillsSection = document.createElement("div");
    skillsSection.className = "section skills";
    skillsSection.innerHTML = `
    <h3 class="section-title">Skills</h3>
    <ul>
      <li>Management Skills</li>
      <li>Creativity</li>
      <li>Digital Marketing</li>
      <li>Negotiation</li>
      <li>Critical Thinking</li>
      <li>Leadership</li>
    </ul>
  `;
    leftContainer.appendChild(skillsSection);
  }

  populateLeftContainer(leftContainer);

  // Populate right side
  function populateRightContainer(rightContainer) {
    // Education
    const education = document.createElement("div");
    education.className = "right-section";
    education.innerHTML = `
    <h3>Education</h3>
    <div class="items"> 
    <div class="item">
       <div class="dot"></div>
      <h4>Bachelor of Business Management</h4>
      <p><em>Borcelle University</em> | 2016 - 2020</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="item">
       <div class="dot"></div>
      <h4>Bachelor of Business Management</h4>
      <p><em>Borcelle University</em> | 2020 - 2023</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    </div>
  `;
    rightContainer.appendChild(education);

    // Experience
    const experience = document.createElement("div");
    experience.className = "right-section";
    experience.innerHTML = `
    <h3>Experience</h3>
    <div class="items">
    <div class="item">
        <div class="dot"></div>
      <h4>Product Design Manager</h4>
      <p><em>Arowawi Industries</em> | 2016 - 2020</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="item">
       <div class="dot"></div>
      <h4>Marketing Manager</h4>
      <p><em>Arowawi Industries</em> | 2019 - 2020</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="item">
  `;
    rightContainer.appendChild(experience);

    // References
    const references = document.createElement("div");
    references.className = "right-section";
    references.innerHTML = `
    <h3>References</h3>
    <div class="items">
    <div class="item">
        <div class="dot"></div>
        <strong>Harumi Kobayashi</strong><br />
        Wardiere Inc. / CEO <br />
        Phone: 123-456-7890 <br /> 
        Email: hello@reallygreatsite.com
      </div>
      <div class="item">
        <div class="dot"></div>
        <strong>Bailey Dupont</strong><br />
        Wardiere Inc. / CEO <br />
        Phone: 123-456-7890 <br />
        Email: hello@reallygreatsite.com
    </div>
    </div>
  `;
    rightContainer.appendChild(references);
  }

  populateRightContainer(rightContainer);

  // Append containers to preview
  preview.appendChild(leftContainer);
  preview.appendChild(rightContainer);
}

loadResumePreview();
