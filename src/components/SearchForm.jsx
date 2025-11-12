import { useId } from "react";

function SearchForm({ onSearch, onTextFilter }) {
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperienceLevel = useId();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const filters = {
      text: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
    };

    onSearch(filters);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    onTextFilter(text);
  };

  return (
    <>
      <h1>Find your next job</h1>
      <p>Explore thousands of opportunities in the tech sector.</p>
      <form onSubmit={handleSubmit} id="empleos-search-form" role="search">
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
            //required
            type="text"
            placeholder="Look for jobs, companies or skills"
            onChange={handleTextChange}
          />
        </div>

        <div className="search-filters">
          <select name={idTechnology} id="filter-technology">
            <optgroup>
              <option value="">Technology</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="react">React</option>
              <option value="node">Node</option>
            </optgroup>
          </select>

          <select name={idLocation} id="filter-location">
            <optgroup>
              <option value="">Location</option>
              <option value="remote">Remote</option>
              <option value="cdmx">Mexico City</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="monterrey">Monterrey</option>
              <option value="barcelona">Barcelona</option>
            </optgroup>
          </select>

          <select name={idExperienceLevel} id="filter-experience-level">
            <optgroup>
              <option value="">Experience Level</option>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </optgroup>
          </select>
        </div>
      </form>
    </>
  );
}
export default SearchForm;
