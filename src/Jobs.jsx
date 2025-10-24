import { Header, SearchBar, JobCard, Footer } from "./components";
import data from "../data/data.json";

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="jobs-search">
          <h1>Find your next job</h1>
          <p>Explore thousands of opportunities in the tech sector.</p>
          <form id="empleos-search-form" role="search">
            <SearchBar />
          </form>
        </section>

        <section>
          <h2>Search results</h2>
          <div className="jobs-listings">
            {data.jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;