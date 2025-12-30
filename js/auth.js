// ---------------- HELPER FUNCTIONS ----------------
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// ---------------- EMAIL VALIDATION (API) ----------------
async function validateEmail(email) {
    try {
        // Encode email to handle special characters safely
        const targetUrl = `https://rapid-email-verifier.fly.dev/api/validate?email={encodeURIComponent(email)}`;
        
        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const isDeliverable = data.status === "valid";
        const isNotDisposable = !data.disposable;

        return isDeliverable && isNotDisposable;
    } catch (error) {
        console.error("Email validation failed:", error);
        const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return basicRegex.test(email);
    }
}


// ---------------- SIGN UP ----------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();
        const msg = document.getElementById("signupMessage");

        const users = getUsers();

        // check if user already exists
        const exists = users.some(user => user.email === email);
        if (exists) {
            msg.textContent = "User already exists!";
            msg.style.color = "red";
            return;
        }

        const valid = await validateEmail(email);
        if (!valid) {
            msg.textContent = "Invalid email address!";
            msg.style.color = "red";
            return;
        }

        users.push({ email, password });
        saveUsers(users);

        msg.textContent = "Signup successful! Please sign in.";
        msg.style.color = "green";

        setTimeout(() => {
            window.location.href = "signin.html";
        }, 1500);

    });
}

// ---------------- SIGN IN ----------------
const signinForm = document.getElementById("signinForm");

if (signinForm) {
    signinForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("signinEmail").value.trim();
        const password = document.getElementById("signinPassword").value.trim();
        const msg = document.getElementById("signinMessage");

        const users = getUsers();

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            msg.textContent = "Invalid email or password!";
            msg.style.color = "red";
            return;
        }

        localStorage.setItem("currentUser", email);
        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "../choose-template.html";
    });
}
