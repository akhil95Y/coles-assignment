import { CountryWithPopulation } from "../api/api-services";

const CountryContainer = ({
  value,
}: {
  value: CountryWithPopulation | undefined;
}) => {
  return (
    <div className="w-100 mt-5 d-flex flex-column align-items-center justify-content-center">
      <h1 className="smallTitle fw-bold">{value?.country}</h1>
      <p className="population fw-bolder">{value?.population}</p>
    </div>
  );
};

export default CountryContainer;
