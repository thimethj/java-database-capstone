// app/src/main/resources/static/js/components/doctorCard.js

// Utility functions that may come from other modules
// Placeholder implementations if not yet wired:
async function getPatientData(token) {
  // TODO: Replace with real API call
  return { id: 1, name: "Demo Patient" };
}
function showBookingOverlay(event, doctor, patientData) {
  // TODO: Replace with your real booking modal logic
  console.log("Booking overlay open for", doctor, "patient", patientData);
  alert(`Booking appointment with Dr. ${doctor.name} for ${patientData.name}`);
}

export function createDoctorCard(doctor) {
  // Create main card container
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  // Current user role
  const role = localStorage.getItem("userRole");

  // Doctor info section
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name || "Unnamed Doctor";

  const specialization = document.createElement("p");
  specialization.textContent = `Specialty: ${doctor.specialty || "N/A"}`;

  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email || "N/A"}`;

  const availability = document.createElement("p");
  if (Array.isArray(doctor.availability)) {
    availability.textContent = `Available: ${doctor.availability.join(", ")}`;
  } else {
    availability.textContent = `Available: ${doctor.availability || "N/A"}`;
  }

  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  // Actions section
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.classList.add("btn", "delete-btn");
    removeBtn.addEventListener("click", async () => {
      const confirmed = confirm(`Delete Dr. ${doctor.name}?`);
      if (!confirmed) return;

      const token = localStorage.getItem("token");
      try {
        // TODO: call API to delete doctor with doctor.id and token
        console.log("Deleting doctor with id", doctor.id, "using token", token);
        // On success, remove card from DOM
        card.remove();
      } catch (err) {
        console.error("Failed to delete doctor", err);
        alert("Failed to delete doctor. Please try again.");
      }
    });
    actionsDiv.appendChild(removeBtn);
  } else if (role === "patient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("btn", "book-btn");
    bookNow.addEventListener("click", () => {
      alert("Patient needs to login first.");
    });
    actionsDiv.appendChild(bookNow);
  } else if (role === "loggedPatient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("btn", "book-btn");
    bookNow.addEventListener("click", async (e) => {
      const token = localStorage.getItem("token");
      try {
        const patientData = await getPatientData(token);
        showBookingOverlay(e, doctor, patientData);
      } catch (err) {
        console.error("Booking error", err);
        alert("Unable to start booking process.");
      }
    });
    actionsDiv.appendChild(bookNow);
  }

  // Assemble card
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  return card;
}
