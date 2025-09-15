// app/src/main/resources/static/js/components/header.js

(function () {
  /**
   * Render the header based on current page, user role, and token.
   * Usage: included with <script ... defer>, it will auto-render on DOMContentLoaded.
   */

  function renderHeader() {
    const headerDiv = document.getElementById("header");
    if (!headerDiv) return;

    // 1) If we're on the site root (homepage), clear session
    //    (prevents showing role-based header on homepage)
    if (window.location.pathname.endsWith("/")) {
      localStorage.removeItem("userRole");
      localStorage.removeItem("token");
    }

    // 2) Read role & token from localStorage
    const role = localStorage.getItem("userRole");        // "admin" | "doctor" | "patient" | "loggedPatient" | null
    const token = localStorage.getItem("token");

    // 3) Guard: invalid session (role suggests logged in but token missing)
    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
      localStorage.removeItem("userRole");
      alert("Session expired or invalid login. Please log in again.");
      window.location.href = "/";
      return;
    }

    // 4) Build header HTML based on role
    let headerContent = `
      <div class="header">
        <div class="logo">
          <a href="/" aria-label="Clinic Home">🏥 Clinic</a>
        </div>
        <nav class="nav-actions" style="display:flex; gap:.5rem; align-items:center;">
    `;

    if (role === "admin") {
      // Admin: Add Doctor + Logout
      headerContent += `
        <button id="addDocBtn" class="adminBtn" type="button">Add Doctor</button>
        <a id="logoutBtn" href="#" role="button">Logout</a>
      `;
    } else if (role === "doctor") {
      // Doctor: Home + Logout
      headerContent += `
        <a id="homeBtn" href="/doctor/doctorDashboard" role="button">Home</a>
        <a id="logoutBtn" href="#" role="button">Logout</a>
      `;
    } else if (role === "loggedPatient") {
      // Logged Patient: Home + Appointments + Logout
      headerContent += `
        <a id="homeBtn" href="/pages/patientDashboard.html" role="button">Home</a>
        <a id="appointmentsBtn" href="/pages/appointments.html" role="button">Appointments</a>
        <a id="logoutBtn" href="#" role="button">Logout</a>
      `;
    } else {
      // Visitor / Patient (not logged in): Login + Sign Up
      // Keep a plain "patient" role so patient header shows login/signup
      if (!role) localStorage.setItem("userRole", "patient");
      headerContent += `
        <a id="loginBtn" href="/pages/login.html" role="button">Login</a>
        <a id="signupBtn" href="/pages/signup.html" role="button">Sign Up</a>
      `;
    }

    headerContent += `
        </nav>
      </div>
    `;

    // 5) Inject header
    headerDiv.innerHTML = headerContent;

    // 6) Attach listeners after injection
    attachHeaderButtonListeners();
  }

  function attachHeaderButtonListeners() {
    // Add Doctor (Admin)
    const addDocBtn = document.getElementById("addDocBtn");
    if (addDocBtn) {
      addDocBtn.addEventListener("click", () => {
        // Open the "Add Doctor" modal (provided by your modals.js)
        if (typeof window.openModal === "function") {
          window.openModal("addDoctor");
        } else {
          // Fallback if modals.js not wired yet
          console.warn("openModal('addDoctor') not available. Include js/components/modals.js");
          alert("Add Doctor modal would open (demo).");
        }
      });
    }

    // Home (Doctor / Logged Patient)
    const homeBtn = document.getElementById("homeBtn");
    if (homeBtn) {
      homeBtn.addEventListener("click", (e) => {
        // let the link navigate; this is a placeholder if you want custom routing
      });
    }

    // Appointments (Logged Patient)
    const appointmentsBtn = document.getElementById("appointmentsBtn");
    if (appointmentsBtn) {
      appointmentsBtn.addEventListener("click", (e) => {
        // let the link navigate; placeholder hook
      });
    }

    // Login / Signup (Patient not logged in)
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        // optional: set role baseline to 'patient'
        localStorage.setItem("userRole", "patient");
      });
    }
    const signupBtn = document.getElementById("signupBtn");
    if (signupBtn) {
      signupBtn.addEventListener("click", () => {
        localStorage.setItem("userRole", "patient");
      });
    }

    // Logout (Admin / Doctor / Logged Patient)
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const role = localStorage.getItem("userRole");
        if (role === "loggedPatient") {
          logoutPatient();
        } else {
          logout();
        }
      });
    }
  }

  /**
   * Global logout for admin / doctor (and generic)
   * Clears token and role, then go to homepage.
   */
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  }

  /**
   * Logout for patient, but keep base role as "patient"
   * so the header shows Login/Signup again.
   */
  function logoutPatient() {
    localStorage.removeItem("token");
    localStorage.setItem("userRole", "patient");
    // You can route them to patient dashboard or homepage
    window.location.href = "/pages/patientDashboard.html";
  }

  // Expose a couple functions globally if needed elsewhere
  window.renderHeader = renderHeader;
  window.logout = logout;
  window.logoutPatient = logoutPatient;

  // Auto-render on DOM ready
  document.addEventListener("DOMContentLoaded", renderHeader);
})();
