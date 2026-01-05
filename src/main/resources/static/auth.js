const BASE_URL = "http://localhost:8080";

/* ======================
   AUTH HELPERS
====================== */

function isLoggedIn() {
    const token = localStorage.getItem("token");
    console.log('isLoggedIn check - token exists:', !!token);
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        console.log('Token expiration check - isExpired:', isExpired);
        return !isExpired;
    } catch (e) {
        console.error('Error checking token:', e);
        return false;
    }
}

function getToken() {
    return localStorage.getItem("token");
}

/* 🔍 SAFE ROLE DECODE */
function getUserRole() {
    try {
        const token = getToken();
        if (!token) return "";
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.role || "";
    } catch (e) {
        logout();
        return "";
    }
}

/* 🔐 AUTH HEADER */
function authHeader() {
    const token = getToken();
    return {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
    };
}

/* ======================
   LOGIN
====================== */

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        showError("Username and password are required");
        return;
    }

    fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(async (res) => {
        const text = await res.text();
        try {
            // Try to parse as JSON
            const data = JSON.parse(text);
            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }
            return data;
        } catch (e) {
            // If not JSON, use the text as error message
            if (!res.ok) {
                throw new Error(text || 'Login failed');
            }
            throw new Error('Invalid response from server');
        }
    })
    .then(data => {
        if (data && data.token) {
            localStorage.setItem("token", data.token);
             updateNavbar();
            window.location.href = "/index.html";
        } else {
            throw new Error('No token received');
        }
    })
    .catch(err => {
        showError(err.message || 'Login failed. Please try again.');
    });
}

/* ======================
   REGISTER
====================== */

function register() {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!username || !password) {
        showError("Username and password required");
        return;
    }

    fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password ,role: "ROLE_USER"})
    })
         .then(async (res) => {
                const text = await res.text();
                if (!res.ok) {
                    throw new Error(text || 'Registration failed');
                }
                alert("Registration successful! Please login with your credentials.");
                // Show login form and hide register form
                document.getElementById("registerSection").style.display = "none";
                document.getElementById("loginSection").style.display = "block";
                // Clear the form
                document.getElementById("regUsername").value = "";
                document.getElementById("regPassword").value = "";
            })
            .catch(err => {
                showError(err.message || 'Registration failed. Please try again.');
            });
}

/* ======================
   LOGOUT
====================== */

function logout() {
    localStorage.removeItem("token");
     updateNavbar();
    window.location.href = "/index.html";
}

/* ======================
   NAVBAR
====================== */

function updateNavbar() {
    console.log('updateNavbar called, isLoggedIn:', isLoggedIn());
    const links = document.querySelectorAll(".secure-link");
    const logoutBtn = document.getElementById("logoutBtn");
    const roleBadge = document.getElementById("roleBadge");
    const loginSection = document.getElementById("loginSection");

    console.log('Elements found:', {
        links: links.length,
        logoutBtn: !!logoutBtn,
        roleBadge: !!roleBadge,
        loginSection: !!loginSection
    });

    if (!isLoggedIn()) {
        console.log('User not logged in - hiding elements');
        links.forEach(l => {
            console.log('Hiding link:', l);
            l.style.display = "none";
        });
        if (logoutBtn) {
            console.log('Hiding logout button');
            logoutBtn.style.display = "none";
        }
        if (roleBadge) roleBadge.style.display = "none";
        if (loginSection) loginSection.style.display = "block";
    } else {
        console.log('User is logged in - showing elements');
        const username = getUsername();

        if (links.length > 0) {
            links.forEach(l => l.style.display = "inline");
        }

        if (logoutBtn) {
            console.log('Showing logout button');
            logoutBtn.style.display = "inline-flex";
            logoutBtn.style.alignItems = "center";
            logoutBtn.style.justifyContent = "center";
        }

        if (roleBadge) {
            roleBadge.innerHTML = username;
            roleBadge.style.display = "inline";
        }

        if (loginSection) {
            loginSection.style.display = "none";
        }
    }
}
/* 🔍 GET USERNAME FROM TOKEN */
function getUsername() {
    try {
        const token = getToken();
        if (!token) return "";
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.sub || "User"; // 'sub' typically contains the username
    } catch (e) {
        return "User";
    }
}

/* ======================
   ERROR
====================== */

function showError(message) {
    const errorBox = document.getElementById("errorBox");
    if (errorBox) {
        errorBox.textContent = message;
        errorBox.style.display = "block";
        // Auto-hide after 5 seconds
        setTimeout(clearError, 5000);
    } else {
        console.error("Error box not found");
    }
}
function clearError() {
    const errorBox = document.getElementById("errorBox");
    if (errorBox) {
        errorBox.style.display = "none";
        errorBox.textContent = "";
    }
}
function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const icon = document.getElementById(`toggle${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}Icon`);

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    } else {
        passwordField.type = "password";
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    }
}
// Update date and time with user's local timezone
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    // Get user's locale
    const userLocale = navigator.language || 'en-US';

    // Format date and time according to user's locale and timezone
    const dateTimeStr = now.toLocaleString(userLocale, options);
    document.getElementById('datetime').textContent = dateTimeStr;
}

// Get user's location using geolocation API
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                    const data = await response.json();

                    if (data.countryCode) {
                        const countryCode = data.countryCode;
                        const countryName = data.countryName;
                        try {
                            const flag = String.fromCodePoint(...Array.from(countryCode).map(c => 127397 + c.charCodeAt(0)));
                            document.getElementById('flag').textContent = flag;
                            document.getElementById('country').textContent = countryName;
                        } catch (e) {
                            document.getElementById('flag').textContent = '🌐';
                            document.getElementById('country').textContent = countryName;
                        }
                    }
                } catch (error) {
                    console.error('Error getting location:', error);
                    // Fallback to browser's locale
                    setDefaultLocation();
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                setDefaultLocation();
            }
        );
    } else {
        setDefaultLocation();
    }
}

// Set default location based on browser's locale
function setDefaultLocation() {
    const userLocale = navigator.language || 'en-US';
    const regionNames = new Intl.DisplayNames([userLocale], { type: 'region' });
    const countryCode = (userLocale.split('-')[1] || 'US').toUpperCase();

    try {
        const flag = String.fromCodePoint(...Array.from(countryCode).map(c => 127397 + c.charCodeAt(0)));
        document.getElementById('flag').textContent = flag;
        document.getElementById('country').textContent = regionNames.of(countryCode) || 'Unknown';
    } catch (e) {
        document.getElementById('flag').textContent = '🌐';
        document.getElementById('country').textContent = 'Online';
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initial update
    updateDateTime();
    getUserLocation();

    // Update time every minute (60000 milliseconds)
    setInterval(updateDateTime, 60000);
});
/* ======================
   AUTO INIT (ONLY ONCE)
====================== */

document.addEventListener('DOMContentLoaded', updateNavbar);
