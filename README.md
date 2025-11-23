# Planets Table SWAPI

Cosas que cambie:
- Cambio periodo de rotacion y orbitacion a dias y horas porque el valor aparece en horas. Ademas los exponentes visualizados como exponent en vez de numero.
- Puse chip con +numero para mostrar todos los terrenos de cada planeta/planetoide.
- Priorice el requerimiento por sobre el diseño. Por ejemplo: forma de mostrar poblacion total
- Puse el scroll dentro de la tabla.
- Guion para denotar ausencia de valores provenientes de la API.
- Por desconocmiento del formato del numero de poblacion, se evito el '.

Cosas considerables a cambiar:
- magnitudes
- checkbox
- Ambiguedad en cifra de poblacion.
- Filtrar rows irrelevantes. Por ejemplo:
```json
{
  "name": "unknown",
  "rotation_period": "0",
  "orbital_period": "0",
  "diameter": "0",
  "climate": "unknown",
  "gravity": "unknown",
  "terrain": "unknown",
  "surface_water": "unknown",
  "population": "unknown",
  "residents": [
    "https://swapi.py4e.com/api/people/20/",
    "https://swapi.py4e.com/api/people/23/",
    "https://swapi.py4e.com/api/people/29/",
    "https://swapi.py4e.com/api/people/32/",
    "https://swapi.py4e.com/api/people/75/",
    "https://swapi.py4e.com/api/people/84/",
    "https://swapi.py4e.com/api/people/85/",
    "https://swapi.py4e.com/api/people/86/",
    "https://swapi.py4e.com/api/people/87/",
    "https://swapi.py4e.com/api/people/88/"
  ],
  "films": [],
  "created": "2014-12-15T12:25:59.569000Z",
  "edited": "2014-12-20T20:58:18.466000Z",
  "url": "https://swapi.py4e.com/api/planets/28/"
}
```

preguntas:
- No en rojo y si en gris
- Por que la population total
- Por que planetas y cuerpos celestes y no planetas y planetoides.
- Porque el ' en el formato del numero de poblacion. 