const jobsListingSection = document.querySelector(".jobs-listings");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.jobs[0].title);

    data.jobs.forEach((job) => {
      const jobElement = document.createElement("article");
      jobElement.className = "job-listing-card";
      //jobElement.setAttribute("data-mode", job.data.mode);
      jobElement.dataset.mode = job.data.mode;
      jobElement.dataset.level = job.data.level;
      jobElement.innerHTML = `
        <div>
          <h3>${job.title}</h3>
          <small>${job.company} | ${job.location}</small>
          <p>${job.description}</p>
        </div>
        <button class="button-apply-job">Apply</button>
      `;
      jobsListingSection.appendChild(jobElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
