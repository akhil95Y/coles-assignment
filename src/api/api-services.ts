import data from "./data.json";

export interface countryWithPopulation {
  country: string;
  population: number;
}

export const getSuggestions = () => {
  return new Promise<countryWithPopulation[]>((resolve, reject) => {
    resolve(data.data);
  });
};
