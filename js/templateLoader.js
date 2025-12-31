function loadSideBar() {
  const profileHeader = document.getElementById("profile_header");
  const p_header = getProfileHeader();
  profileHeader.innerHTML = p_header;
}

//function to get profile header html
function getProfileHeader() {
  const profileDetails = JSON.parse(localStorage.getItem("profileDetails"));
  if (profileDetails) {
    //if profile details exist, show preview
    setTimeout(showPreviewProfileDetails, 100); //delay to ensure elements are loaded
  }
  return `
  <div class="sidebar-section personal-details-section">
    <h2 class="sidebar-title">Edit Personal Details</h2>
    <div class="personal-details-form">
      <div class="name-image">
           <div class="name-inputs">
                <label for="first_name">Full Name</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Full Name"
                />
                <label for="Pro_title">Professional Title</label>
                <input
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
                    type="file"
                    id="profile_image"
                    name="profile_image"
                    accept="image/*"
                />
             </div>

        </div>
        <div class="input_sidebar">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" />
      </div>
      <div class="input_sidebar">
        <label for="phone">Phone</label>
        <input type="tel" id="phone" name="phone" placeholder="Phone" />
      </div>
      <div class="input_sidebar">
        <label for="address">Address</label>
        <input type="text" id="address" name="address" placeholder="Address" />
      </div>

      <button type="button" onclick="saveProfile()" id="done_button">
        Done
      </button>
    </div>
</div>
    `;
}

function saveProfile() {
  //get values from inputs
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
        // edit button
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
  personalDetailsForm.style.display = "none";

  //append details and image divs to preview container
  p_c.appendChild(detailsDiv);
  p_c.appendChild(imageDiv);

  //append preview_container to profile_header
  const profileHeader = document.getElementById("profile_header");
  profileHeader.appendChild(p_c);
}

//atach to window for global access
window.loadSideBar = loadSideBar;
window.setupImagePreview = setupImagePreview;

function loadingAnimation() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.innerHTML = `<div class="loading">Loading...</div>`;
  setTimeout(() => {
    sidebar.innerHTML = "";
  }, 2000);
}

//edit profile function
function editProfile() {
  //remove preview container
  const profileHeader = document.getElementById("profile_header");
  const previewContainer = document.querySelector(".profile-preview");
  if (previewContainer) {
    profileHeader.removeChild(previewContainer);
  }
  z;
  //call loadSideBar to show form again
  loadSideBar();
}
