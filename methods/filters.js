const jobsListingSection = document.querySelector(".jobs-listings");
const technologyFilter = document.querySelector("#filter-technology");
const locationFilter = document.querySelector("#filter-location");
const experienceFilter = document.querySelector("#filter-experience-level");

// Combined filter function that considers 3 filters
function applyFilters() {
  const jobs = jobsListingSection?.querySelectorAll(".job-listing-card");
  const selectedTechnology = technologyFilter.value;
  const selectedLocation = locationFilter.value;
  const selectedExperience = experienceFilter.value;

  jobs.forEach(function (job) {
    const dataMode = job.dataset.mode;
    const dataExperience = job.dataset.level;
    const dataTechnology = (job.dataset.technology).split(",");

    const matchesTechnology = selectedTechnology === "" || dataTechnology.includes(selectedTechnology);
    
    const matchesLocation = selectedLocation === "" || selectedLocation === dataMode;
    
    // Check if job matches experience filter (or no experience filter applied)
    const matchesExperience = selectedExperience === "" || selectedExperience === dataExperience;
    
    // Job should be shown only if it matches 3 filters
    const isShown = matchesTechnology && matchesLocation && matchesExperience;

    job.classList.toggle("is-hidden", !isShown);
  });
}

technologyFilter.addEventListener("change", applyFilters);

locationFilter.addEventListener("change", applyFilters);

// Apply filters when experience level changes
experienceFilter.addEventListener("change", applyFilters);
