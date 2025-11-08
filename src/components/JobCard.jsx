import { useState } from "react";

function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job';

  return (
    <>
      <article className="job-listing-card" data-testid={job.id}>
        <div>
          <h3>{job.title}</h3>
          <small>{`${job.company} | ${job.location} | ${job.data.level}`}</small>
          <p>{job.description}</p>
        </div>
        <button className={buttonClasses} onClick={handleApplyClick}>
          {isApplied ? "Applied" : "Apply"}
        </button>
      </article>
    </>
  );
}
export default JobCard;
