import { useEffect, useState } from "react";
import { CountryWithPopulation, getSuggestions } from "../api/api-services";
import CountryContainer from "./CountryContainer";

let data: CountryWithPopulation[] = [];
let dropdownElement: HTMLElement | null;

const TypeAheadSearch = () => {
  const [selectedOption, setSelectedOption] = useState<CountryWithPopulation>();
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestion] = useState<CountryWithPopulation[]>([]);

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
    setInputValue(value);
    setSuggestion(tempArray);
  };

  const setValue = (value: CountryWithPopulation) => {
    setSelectedOption(value);
    setInputValue(value.country);
    setSuggestion([]);
  };

  return (
    <div className="searchBar w-100 h-100 d-flex flex-column flex-grow-1">
      <form className="d-flex flex-column w-100" role="search">
        <input
          className="form-control me-2 dropdown-toggle"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={inputValue}
          onChange={(e) =>
            showSuggestions((e.target as HTMLInputElement).value)
          }
        ></input>
        <div>
          <ul className="dropdown-menu dropdown-menu-dark w-100" id="dropdown">
            {suggestions.map((e, i) => {
              return (
                <li
                  className="dropdown-item"
                  key={i}
                  onClick={() => {
                    setValue(e);
                  }}
                >
                  {e.country}
                </li>
              );
            })}
          </ul>
        </div>
      </form>

      <CountryContainer value={selectedOption}></CountryContainer>
    </div>
  );
};

export default TypeAheadSearch;
