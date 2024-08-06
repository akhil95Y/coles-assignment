import { useEffect, useState } from "react";
import { countryWithPopulation, getSuggestions } from "../api/api-services";

let data: countryWithPopulation[] = [];
let dropdownElement: HTMLElement | null;

const TypeAheadSearch = () => {
  const [suggestions, setSuggestion] = useState<countryWithPopulation[]>([]);

  useEffect(() => {
    getSuggestions().then((res) => {
      data = res;
    });
  }, []);

  useEffect(() => {
    if (suggestions.length > 0) {
      dropdownElement?.classList.add("show");
    } else {
      dropdownElement?.classList.remove("show");
    }
  }, [suggestions]);

  const showSuggestions = (value: string) => {
    let tempArray = [];
    if (!dropdownElement) {
      dropdownElement = document.getElementById("dropdown");
    }
    if (value) {
      for (let item of data) {
        if (item.country.toLowerCase().includes(value.toLowerCase())) {
          tempArray.push(item);
        }
      }
    }
    setSuggestion(tempArray);
  };

  return (
    <div className="searchBar w-100 h-100 d-flex flex-column flex-grow-1">
      <form className="d-flex flex-column w-100" role="search">
        <input
          className="form-control me-2 dropdown-toggle"
          type="search"
          placeholder="Search"
          aria-label="Search"
          data-bs-toggle="dropdown"
          onChange={(e) =>
            showSuggestions((e.target as HTMLInputElement).value)
          }
        ></input>
        <div>
          <ul className="dropdown-menu dropdown-menu-dark w-100" id="dropdown">
            {suggestions.map((e, i) => {
              return (
                <li key={i}>
                  <a className="dropdown-item">{e.country}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default TypeAheadSearch;
