function JobCard({ job }) {
  return (
    <>
      <article className="job-listing-card" data-testid={job.id}>
        <div>
          <h3>{job.title}</h3>
          <small>{`${job.company} | ${job.location} | ${job.data.level}`}</small>
          <p>{job.description}</p>
        </div>
        <button className="button-apply-job">Apply</button>
      </article>
    </>
  );
}
export default JobCard;
