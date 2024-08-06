import { useEffect, useState } from "react";
import { CountryWithPopulation, getSuggestions } from "../api/api-services";
import CountryContainer from "./CountryContainer";

let data: CountryWithPopulation[] = [];
let dropdownElement: HTMLElement | null;

const TypeAheadSearch = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
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

  useEffect(() => {
    document.getElementsByClassName("active")[0]?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }, [selectedIndex]);

  const showSuggestions = (value: string) => {
    let tempArray = [];
    if (!dropdownElement) {
      dropdownElement = document.getElementById("suggestion-dropdown");
    }
    if (value) {
      for (let item of data) {
        if (item.country.toLowerCase().includes(value.toLowerCase())) {
          tempArray.push(item);
        }
      }
    } else {
      setSelectedOption({ country: "", population: "" });
    }
    setInputValue(value);
    setSuggestion(tempArray);
  };

  const setValue = (value: CountryWithPopulation) => {
    setSelectedOption(value);
    setInputValue(value.country);
    setSuggestion([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev === suggestions.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev === 0 ? suggestions.length - 1 : prev - 1
      );
      console.log(selectedIndex);
    } else if (e.key === "Enter") {
      if (suggestions.length > 0) {
        setValue(suggestions[selectedIndex]);
      }
    } else {
      setSelectedIndex(0);
    }
  };

  return (
    <div className="searchBar w-100 h-100 d-flex flex-column flex-grow-1">
      <form
        className="d-flex flex-column w-100"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          className="form-control me-2 dropdown-toggle"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) =>
            showSuggestions((e.target as HTMLInputElement).value)
          }
        ></input>
        <div>
          <ul
            className="dropdown-menu dropdown-menu-dark w-100"
            id="suggestion-dropdown"
          >
            {suggestions.map((e, i) => {
              return (
                <li
                  className={`dropdown-item ${
                    i === selectedIndex ? "active" : ""
                  }`}
                  key={i}
                  onClick={(event) => {
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
