const jobsListingSection = document.querySelector(".jobs-listings");
const locationFilter = document.querySelector("#filter-location");

locationFilter.addEventListener("change", function () {
  const jobs = jobsListingSection?.querySelectorAll(".job-listing-card");

  const selectedLocation = locationFilter.value;

  jobs.forEach(function (job) {
    const dataMode = job.dataset.mode;
    const isShown = selectedLocation === "" || selectedLocation === dataMode;
    job.classList.toggle("is-hidden", !isShown);
  });
});
