import type { Planet } from '../types'

export function formatGravity(gravity: string): string {
  if (gravity === 'unknown' || !gravity) return 'Desconocido'
  
  const match = gravity.match(/(\d+\.?\d*)/)
  if (match) {
    const value = parseFloat(match[1])
    // Aproximación: 1 standard = 9.8 m/s²
    const gravityInMs2 = value * 9.8
    return `${gravityInMs2.toFixed(2)} m/s²`
  }
  
  return gravity
}

export function formatDiameter(diameter: string): string {
  if (diameter === 'unknown' || !diameter) return 'Desconocido'
  
  const num = parseInt(diameter, 10)
  if (isNaN(num)) return diameter
  
  return `${num.toLocaleString('es-ES')} km`
}

export function formatRotationPeriod(rotationPeriod: string): string {
  if (rotationPeriod === 'unknown' || !rotationPeriod) return 'Desconocido'
  
  const hours = parseFloat(rotationPeriod)
  if (isNaN(hours)) return rotationPeriod
  
  const days = Math.floor(hours / 24)
  const remainingHours = Math.floor(hours % 24)
  const minutes = Math.floor((hours % 1) * 60)
  
  if (days > 0) {
    return `${days} d ${remainingHours} hs ${minutes} min`
  } else if (remainingHours > 0) {
    return `${remainingHours} hs ${minutes} min`
  } else {
    return `${minutes} min`
  }
}

export function formatPopulation(population: string): string {
  if (population === 'unknown' || !population) return '0'
  
  const num = parseInt(population, 10)
  if (isNaN(num)) return '0'
  
  return num.toLocaleString('es-ES')
}

export function formatSurfaceWater(surfaceWater: string): 'Sí' | 'No' {
  if (surfaceWater === 'unknown' || !surfaceWater) return 'No'
  
  const percentage = parseFloat(surfaceWater)
  if (isNaN(percentage)) return 'No'
  
  return percentage > 0 ? 'Sí' : 'No'
}

export function getTotalPopulation(planets: Planet[]): string {
  const total = planets.reduce((sum, planet) => {
    if (planet.population === 'unknown' || !planet.population) return sum
    const num = parseInt(planet.population, 10)
    return sum + (isNaN(num) ? 0 : num)
  }, 0)
  
  return total.toLocaleString('es-ES')
}

