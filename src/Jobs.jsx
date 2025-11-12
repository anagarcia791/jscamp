import { useState } from "react";

import {
  Header,
  SearchForm,
  JobListing,
  Pagination,
  Footer,
} from "./components";
import jobsData from "../data/data.json";

const RESULTS_PER_PAGE = 4;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [textToFilter, setTextToFilter] = useState("");
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experienceLevel: "",
  });

  const jobsFilteredByFilters = jobsData.jobs.filter((job) => {
    return (
      (filters.technology === "" ||
        job.data.technology.includes(filters.technology)) &&
      (filters.location === "" || job.data.mode === filters.location) &&
      (filters.experienceLevel === "" || job.data.level === filters.experienceLevel)
    );
  });

  const jobsWithTextFilter =
    textToFilter === ""
      ? jobsFilteredByFilters
      : jobsFilteredByFilters.filter((job) => {
          return job.title.toLowerCase().includes(textToFilter.toLowerCase());
        });

  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE, // page 1 -> 0, page 2 -> 5, page 3 -> 10
    currentPage * RESULTS_PER_PAGE // page 1 -> 5, page 2 -> 10, page 3 -> 15
  );

  const handleSearch = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <main>
        <section className="jobs-search">
          <SearchForm onSearch={handleSearch} onTextFilter={handleTextFilter} />
        </section>

        <section>
          <JobListing jobs={pagedResults} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
