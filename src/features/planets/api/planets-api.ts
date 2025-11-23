import type { PlanetsResponse } from '../index';

const BASE_URL = 'https://swapi.py4e.com/api/planets';

export async function fetchPlanets(page: number = 1): Promise<PlanetsResponse> {
  const response = await fetch(`${BASE_URL}/?page=${page}`);
  
  if (!response.ok) {
    throw new Error('Error al cargar los planetas');
  }
  
  return response.json();
}
