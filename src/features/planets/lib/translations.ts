/**
 * Traducciones directas de valores en inglés de la API a español
 * Solo para climate y terrain
 */

const climateTranslations: Record<string, string> = {
  'temperate': 'Templado',
  'arid': 'Árido',
  'tropical': 'Tropical',
  'frozen': 'Congelado',
  'murky': 'Tenebroso',
  'artificial temperate': 'Templado artificial',
  'frigid': 'Gélido',
  'hot': 'Caliente',
  'humid': 'Húmedo',
  'moist': 'Húmedo',
  'superheated': 'Sobrecalentado',
  'windy': 'Ventoso',
  'polluted': 'Contaminado',
  'subartic': 'Subártico',
  'artic': 'Ártico',
  'rocky': 'Rocoso',
  'unknown': 'Desconocido',
}

const terrainTranslations: Record<string, string> = {
  'desert': 'Desierto',
  'deserts': 'Desiertos',
  'jungle': 'Jungla',
  'jungles': 'Junglas',
  'rainforests': 'Selvas',
  'mountains': 'Montañas',
  'mountain': 'Montaña',
  'oceans': 'Océanos',
  'ocean': 'Océano',
  'swamps': 'Pantanos',
  'swamp': 'Pantano',
  'grasslands': 'Praderas',
  'tundra': 'Tundra',
  'ice caves': 'Cuevas de hielo',
  'ice canyons': 'Cañones de hielo',
  'mountain ranges': 'Cordilleras',
  'rock': 'Roca',
  'canyons': 'Cañones',
  'rocky canyons': 'Cañones rocosos',
  'sinkholes': 'Sumideros',
  'urban': 'Urbano',
  'hills': 'Colinas',
  'grassy hills': 'Colinas herbosas',
  'forests': 'Bosques',
  'fungus forests': 'Bosques de hongos',
  'lakes': 'Lagos',
  'rivers': 'Ríos',
  'rocky': 'Rocoso',
  'barren': 'Yermo',
  'gas giant': 'Gigante gaseoso',
  'volcanoes': 'Volcanes',
  'lava rivers': 'Ríos de lava',
  'caves': 'Cuevas',
  'plains': 'Llanuras',
  'scrublands': 'Matorrales',
  'savanna': 'Sabana',
  'savannas': 'Sabanas',
  'savannahs': 'Sabanas',
  'cityscape': 'Paisaje urbano',
  'cities': 'Ciudades',
  'grass': 'Hierba',
  'fields': 'Campos',
  'rock arches': 'Arcos de roca',
  'bogs': 'Ciénagas',
  'rocky islands': 'Islas rocosas',
  'islands': 'Islas',
  'seas': 'Mares',
  'mesas': 'Mesas',
  'reefs': 'Arrecifes',
  'rocky deserts': 'Desiertos rocosos',
  'valleys': 'Valles',
  'ash': 'Ceniza',
  'toxic cloudsea': 'Mar de nubes tóxico',
  'cloudsea': 'Mar de nubes',
  'plateaus': 'Mesetas',
  'verdant': 'Verdoso',
  'acid pools': 'Piscinas de ácido',
  'glaciers': 'Glaciares',
  'vines': 'Lianas',
  'cliffs': 'Acantilados',
  'airless asteroid': 'Asteroide sin atmósfera',
  'unknown': 'Desconocido',
}

export function translateClimate(climate: string): string {
  if (!climate || climate === 'unknown') {
    return climate
  }
  
  const normalized = climate.toLowerCase().trim()
  return climateTranslations[normalized] || capitalizeFirst(climate)
}

export function translateTerrain(terrain: string): string {
  if (!terrain || terrain === 'unknown') {
    return terrain
  }
  
  const normalized = terrain.toLowerCase().trim()
  return terrainTranslations[normalized] || capitalizeFirst(terrain)
}

function capitalizeFirst(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

