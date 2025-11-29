import { useState, useEffect } from "react";

import { SearchForm, JobListing, Pagination } from "./../components";

import { useRouter } from "../hooks/useRouter.jsx";

const RESULTS_PER_PAGE = 4;

const useFilters = () => {
  const { navigateTo } = useRouter();

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get("page"));
    return Number.isNaN(page) ? page : 1;
  });

  const [textToFilter, setTextToFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("text") || "";
  });

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      technology: params.get("technology") || "",
      location: params.get("type") || "",
      experienceLevel: params.get("level") || "",
    };
  });

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (textToFilter) params.append("text", textToFilter);
        if (filters.technology) params.append("technology", filters.technology);
        if (filters.location) params.append("type", filters.location);
        if (filters.experienceLevel)
          params.append("level", filters.experienceLevel);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        params.append("limit", RESULTS_PER_PAGE);
        params.append("offset", offset);

        const queryParams = params.toString();

        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`
        );

        console.log("Fetching jobs with URL:", response.url);
        const json = await response.json();

        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [filters, currentPage, textToFilter]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (textToFilter) params.append("text", textToFilter);
    if (filters.technology) params.append("technology", filters.technology);
    if (filters.location) params.append("type", filters.location);
    if (filters.experienceLevel)
      params.append("level", filters.experienceLevel);

    if (currentPage > 1) params.append("page", currentPage);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    navigateTo(newUrl);
  }, [filters, currentPage, textToFilter, navigateTo]);

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
    handleSearch
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
    handleSearch
  } = useFilters();

  return (
    <main>
      <section className="jobs-search">
        <SearchForm
          initialText={textToFilter}
          onSearch={handleSearch}
        />
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
