import type { PlanetsResponse } from '../types';

const BASE_URL = 'https://swapi.py4e.com/api/planets';

export async function fetchPlanets(page: number = 1): Promise<PlanetsResponse> {
  const response = await fetch(`${BASE_URL}/?page=${page}`);
  
  if (!response.ok) {
    throw new Error('Error al cargar los planetas');
  }
  
  return response.json();
}

export async function fetchAllPlanets(): Promise<PlanetsResponse['results']> {
  const allPlanets: PlanetsResponse['results'] = []
  let nextUrl: string | null = `${BASE_URL}/?page=1`;
  
  while (nextUrl) {
    const response = await fetch(nextUrl);
    
    if (!response.ok) {
      throw new Error('Error al cargar los planetas');
    }
    
    const data: PlanetsResponse = await response.json();
    allPlanets.push(...data.results);
    nextUrl = data.next;
  }
  
  return allPlanets;
}

