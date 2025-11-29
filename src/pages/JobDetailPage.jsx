import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import styles from "./../styles/Detail.module.css";
import snarkdown from "snarkdown";

function JobSection({ title, content }) {
  const html = snarkdown(content);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </section>
  );
}

export function JobDetailPage() {
  const { jobId } = useParams();

  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        setJobData(json);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [jobId]);

  if (loading) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.loading}>
          <p className={styles.loadingText}>loading...</p>
        </div>
      </div>
    );
  }

  if (error || jobData?.error) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Offer not found</h2>
          <button onClick={() => navigate("/")} className={styles.errorButton}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
      {/* <DetailPageBreadCrumb job={jobData} />
      <DetailPageHeader job={jobData} /> */}

      <JobSection
        title="Job Description"
        content={jobData.content.description}
      />
      <JobSection
        title="Responsibilities"
        content={jobData.content.responsibilities}
      />
      <JobSection title="Requirements" content={jobData.content.requirements} />
      <JobSection title="About the Company" content={jobData.content.about} />
    </div>
  );
}
