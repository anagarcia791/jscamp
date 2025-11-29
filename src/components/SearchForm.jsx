import { useId, useState, useRef } from "react";

const useSearchForm = ({
  idText,
  idTechnology,
  idLocation,
  idExperienceLevel,
  onSearch,
}) => {
  const timeoutId = useRef(null);
  const [searchText, setSearchText] = useState("");

  // apply filters when any filter changes
  const handleFiltersChange = (event) => {
    const form = event.target.closest("form");
    if (!form) return;
    
    const formData = new FormData(form);

    const filters = {
      text: formData.get(idText) || "",
      technology: formData.get(idTechnology) || "",
      location: formData.get(idLocation) || "",
      experienceLevel: formData.get(idExperienceLevel) || "",
    };

    setSearchText(filters.text);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      onSearch(filters);
    }, 500);
  };

  //reset all filters
  const handleClearFilters = () => {
    document.getElementById("filter-technology").value = "";
    document.getElementById("filter-location").value = "";
    document.getElementById("filter-experience-level").value = "";
    document.getElementById("empleos-search-input").value = "";

    onSearch({
      text: "",
      technology: "",
      location: "",
      experienceLevel: "",
    });
  };

  return {
    searchText,
    handleFiltersChange,
    handleClearFilters,
  };
};

function SearchForm({ initialText, onSearch }) {
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperienceLevel = useId();
  const filtersRef = useRef(null);

  const { handleFiltersChange, handleClearFilters } = useSearchForm({
    idText,
    idTechnology,
    idLocation,
    idExperienceLevel,
    onSearch,
  });

  return (
    <>
      <h1>Find your next job</h1>
      <p>Explore thousands of opportunities in the tech sector.</p>
      <form
        onChange={handleFiltersChange}
        id="empleos-search-form"
        role="search"
      >
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            name={idText}
            id="empleos-search-input"
            type="text"
            placeholder="Look for jobs, companies or skills"
            defaultValue={initialText}
          />
        </div>

        <div className="search-filters" id="search-filters">
          <select
            name={idTechnology}
            id="filter-technology"
            ref={filtersRef}
          >
            <optgroup>
              <option value="">Technology</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="react">React</option>
              <option value="node">Node</option>
            </optgroup>
          </select>

          <select
            name={idLocation}
            id="filter-location"
            ref={filtersRef}
          >
            <optgroup>
              <option value="">Location</option>
              <option value="remote">Remote</option>
              <option value="cdmx">Mexico City</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="monterrey">Monterrey</option>
              <option value="barcelona">Barcelona</option>
            </optgroup>
          </select>

          <select
            name={idExperienceLevel}
            id="filter-experience-level"
            ref={filtersRef}
          >
            <optgroup>
              <option value="">Experience Level</option>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </optgroup>
          </select>

          <button type="button" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
      </form>
    </>
  );
}
export default SearchForm;
