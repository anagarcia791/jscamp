import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import { SearchForm, JobListing, Pagination } from "./../components";

const RESULTS_PER_PAGE = 4;

const buildQueryParams = (filters, currentPage) => {
  const params = new URLSearchParams();

  if (filters.text) params.set("text", filters.text);
  if (filters.technology) params.set("technology", filters.technology);
  if (filters.location) params.set("type", filters.location);
  if (filters.experienceLevel) params.set("level", filters.experienceLevel);

  if (currentPage > 1) params.set("page", currentPage);

  return params;
};

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get("page"));
    return page > 0 ? page : 1;
  });

  const [textToFilter, setTextToFilter] = useState(
    () => searchParams.get("text") || ""
  );

  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get("technology") || "",
      location: searchParams.get("type") || "",
      experienceLevel: searchParams.get("level") || "",
    };
  });

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const filtersWithText = { ...filters, text: textToFilter };
        const params = buildQueryParams(filtersWithText, currentPage);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        params.append("limit", RESULTS_PER_PAGE);
        params.append("offset", offset);

        const queryParams = params.toString();

        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`
        );

        const json = await response.json();

        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        throw new Error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [filters, currentPage, textToFilter]);

  useEffect(() => {
    const filtersWithText = { ...filters, text: textToFilter };
    const params = buildQueryParams(filtersWithText, currentPage);
    setSearchParams(params);
  }, [filters, currentPage, textToFilter, setSearchParams]);

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters);
    setTextToFilter(filters.text);
    setCurrentPage(1);
  };

  return {
    currentPage,
    loading,
    jobs,
    textToFilter,
    totalPages,
    handlePageChange,
    handleSearch,
  };
};

export function SearchPage() {
  const {
    currentPage,
    loading,
    jobs,
    textToFilter,
    totalPages,
    handlePageChange,
    handleSearch,
  } = useFilters();

  return (
    <main>
      <section className="jobs-search">
        <SearchForm initialText={textToFilter} onSearch={handleSearch} />
      </section>

      <section>
        <h2 className="search-results-title">Search results</h2>
        {loading ? <p>Cargando empleos...</p> : <JobListing jobs={jobs} />}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
