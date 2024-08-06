import data from "./data.json";

export interface CountryWithPopulation {
  country: string;
  population: number | string;
}

export const getSuggestions = () => {
  return new Promise<CountryWithPopulation[]>((resolve, reject) => {
    resolve(data.data);
  });
};
