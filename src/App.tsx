import "./App.css";
import TypeAheadSearch from "./components/TypeAheadSearch";

function App() {
  return (
    <div
      className="justify-content-center d-flex flex-column align-items-center min-vh-100"
      data-bs-theme="dark"
    >
      <div className="title h-10 w-100 col-12 d-flex justify-content-center">
        <h1 className="smallTitle">Search Countries for population</h1>
      </div>

      <div className="w-50 col-6 pt-1 h-100 d-flex flex-grow-1 justify-content-center">
        <TypeAheadSearch></TypeAheadSearch>
      </div>
    </div>
  );
}

export default App;
