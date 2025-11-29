import { useState } from "react";
import { Link } from "./Link.jsx";

import styles from "./../styles/JobCard.module.css";

function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const buttonClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";

  return (
    <>
      <article className="job-listing-card" data-testid={job.id}>
        <div>
          <h3>
            <Link className={styles.title} href={`/jobs/${job.id}`}>
              {job.titulo}
            </Link>
          </h3>

          <small>{`${job.empresa} | ${job.ubicacion} | ${job.data.nivel}`}</small>
          <p>{job.descripcion}</p>
        </div>
        <div className={styles.actions}>
          <Link href={`/jobs/${job.id}`} className={styles.details}>
            See Details
          </Link>
          <button className={buttonClasses} onClick={handleApplyClick}>
            {isApplied ? "Applied" : "Apply"}
          </button>
        </div>
      </article>
    </>
  );
}

{
  /* <h3>{job.title}</h3>
          <small>{`${job.company} | ${job.location} | ${job.data.level}`}</small>
          <p>{job.description}</p> */
}
export default JobCard;
