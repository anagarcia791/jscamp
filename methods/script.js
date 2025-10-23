const jobsListingSection = document.querySelector(".jobs-listings");

jobsListingSection?.addEventListener("click", function (event) {
  const element = event.target;

  if (element.classList.contains("button-apply-job")) {
    element.textContent = "¡Aplicado!";
    element.classList.add("is-applied");
    element.disabled = true;
  }
});

const technologyFilter = document.querySelector("#filter-technology");
const locationFilter = document.querySelector("#filter-location");
const experienceLevelFilter = document.querySelector(
  "#filter-experience-level"
);

const jobs = jobsListingSection?.querySelectorAll(".job-listing-card");

// locationFilter.addEventListener("change", function () {
//   const selectedLocation = locationFilter.value;

//     jobs.forEach(function (job) {
//       const dataMode = job.dataset.mode;
//       // const mode = job.getAttribute("data-mode"); alternative way to get data attributes
//       if (selectedLocation === "" || selectedLocation === dataMode) {
//         job.style.display = "flex";
//       } else {
//         job.style.display = "none";
//       }
//     });
// });

locationFilter.addEventListener("change", function () {
  const selectedLocation = locationFilter.value;

  jobs.forEach(function (job) {
    const dataMode = job.dataset.mode;
    const isShown = selectedLocation === "" || selectedLocation === dataMode;
    job.classList.toggle("is-hidden", !isShown);
  });
});

const searchInput = document.querySelector("#job-search-input");

searchInput.addEventListener("submit", function (event) {
  event.preventDefault(); // avoid default form submission behavior
  console.log("Formulario enviado");
});
