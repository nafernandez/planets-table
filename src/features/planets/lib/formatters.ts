import type { Planet } from '../types'

export function formatGravity(gravity: string): string {
  if (gravity === 'unknown' || gravity === 'N/A' || gravity === 'n/a' || !gravity) return '-'
  
  const match = gravity.match(/(\d+\.?\d*)/)
  if (match) {
    const value = parseFloat(match[1])

    const gravityInMs2 = value * 9.81
    return `${gravityInMs2.toFixed(2)} m/s²`
  }
  
  return gravity
}

export function formatDiameter(diameter: string): string {
  if (diameter === 'unknown' || !diameter) return '-'
  
  const num = parseInt(diameter, 10)
  if (isNaN(num)) return diameter
  if (num === 0) return '-'
  
  return `${num.toLocaleString('en-US')} km`
}

export function formatRotationPeriod(period: string): string {
  if (period === 'unknown' || !period) return '-'
  
  const hours = parseFloat(period)
  if (isNaN(hours)) return period
  if (hours === 0) return '-'
  
  const days = Math.floor(hours / 24)
  const remainingHours = Math.floor(hours % 24)
  
  if (days === 0) {
    return `${remainingHours} hs`
  } else if (remainingHours === 0) {
    return `${days} d`
  } else {
    return `${days} d ${remainingHours} hs`
  }
}

export function formatOrbitalPeriod(period: string): string {
  if (period === 'unknown' || !period) return '-'
  
  const days = parseFloat(period)
  if (isNaN(days)) return period
  if (days === 0) return '-'
  
  if (days < 1) {
    return `${days.toFixed(2)} d`
  }
  
  if (days % 1 === 0) {
    return `${Math.floor(days).toLocaleString('en-US')} d`
  }
  
  return `${days.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} d`
}

export function formatPopulation(population: string): string {
  if (population === 'unknown' || !population) return '-'
  
  const num = parseInt(population, 10)
  if (isNaN(num)) return '-'
  
  return num.toLocaleString('en-US')
}

export function formatSurfaceWater(surfaceWater: string): 'Sí' | 'No' | '-' {
  if (surfaceWater === 'unknown' || !surfaceWater) return '-'
  
  const percentage = parseFloat(surfaceWater)
  if (isNaN(percentage)) return '-'
  
  return percentage > 0 ? 'Sí' : 'No'
}

export function getTotalPopulation(planets: Planet[]): string {
  const total = planets.reduce((sum, planet) => {
    if (planet.population === 'unknown' || !planet.population) return sum
    const num = parseInt(planet.population, 10)
    return sum + (isNaN(num) ? 0 : num)
  }, 0)
  
  return total.toLocaleString('en-US')
}

