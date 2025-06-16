document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkModeSwitch");
  const body = document.body;

  if (darkToggle) {
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) body.classList.add("dark");
    darkToggle.checked = isDark;

    darkToggle.addEventListener("change", () => {
      body.classList.toggle("dark");
      localStorage.setItem("darkMode", body.classList.contains("dark"));
    });
  }

  const doctorRadio = document.getElementById("doctorOption");
  const patientRadio = document.getElementById("patientOption");
  const signInForm = document.getElementById("signinForm");

  if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email")?.value.trim();
      const password = document.getElementById("password")?.value.trim();

      if (!email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      const isDoctor = doctorRadio?.checked;
      const isPatient = patientRadio?.checked;

      if (!isDoctor && !isPatient) {
        alert("Please select Doctor or Patient.");
        return;
      }

      const validCredentials = {
        doctor: "doctor@example.com",
        patient: "patient@example.com",
        password: "123456"
      };

      const isValid =
        (isDoctor && email === validCredentials.doctor && password === validCredentials.password) ||
        (isPatient && email === validCredentials.patient && password === validCredentials.password);

      if (isValid) {
        const userRole = isDoctor ? "doctor" : "patient";

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", userRole);

        window.location.href = `${userRole}.html`;
      } else {
        alert("Invalid credentials. Try again.");
      }
    });
  }

  const dashboardLinks = document.querySelectorAll(".dashboard-link");
  dashboardLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetHref = link.getAttribute("href");
      if (!targetHref || !targetHref.endsWith(".html")) {
        e.preventDefault();
        alert("Dashboard is not available at the moment.");
      }
    });
  });

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");

  const dashboardWelcome = document.getElementById("dashboard_welcome");
  if (dashboardWelcome && isLoggedIn) {
    dashboardWelcome.textContent = `Welcome, ${userEmail} (${userRole})`;
  }

});
