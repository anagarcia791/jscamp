import JobCard from "./JobCard.jsx";

function JobListing({ jobs }) {
  return (
    <>
      {jobs.length === 0 && (
        <p
          style={{ textAlign: "center", padding: "1rem", textWrap: "balance" }}
        >
          We don&apos;t have a job found that match the search criteria.
        </p>
      )}

      <div className="jobs-listings">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}

export default JobListing;
