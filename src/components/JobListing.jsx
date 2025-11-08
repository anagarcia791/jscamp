import JobCard from "./JobCard.jsx";

function JobListing({ jobs }) {
  return (
    <>
      <h2>Search results</h2>
      <div className="jobs-listings">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}

export default JobListing;
