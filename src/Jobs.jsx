import { useState } from "react";

import {
  Header,
  SearchForm,
  JobListing,
  Pagination,
  Footer,
} from "./components";
import data from "../data/data.json";

const RESULTS_PER_PAGE = 4;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.jobs.length / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pagedResults = data.jobs.slice(
    (currentPage - 1) * RESULTS_PER_PAGE, // page 1 -> 0, page 2 -> 5, page 3 -> 10
    currentPage * RESULTS_PER_PAGE // page 1 -> 5, page 2 -> 10, page 3 -> 15
  );

  return (
    <>
      <Header />
      <main>
        <section className="jobs-search">
          <SearchForm />
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
