# Planets Table SWAPI

Aplicación web desarrollada en React que muestra una tabla interactiva de planetas y cuerpos celestes de Star Wars, consumiendo datos de la [SWAPI (Star Wars API)](https://swapi.dev/)

Video ilustrativo sobre la tabla en [VIMEO](https://vimeo.com/1139860643?share=copy&fl=sv&fe=ci)

Proyecto deployado en [VERCEL](https://planets-table.vercel.app/)

## Características

- **Tabla interactiva** con datos de planetas de Star Wars
- **Paginación infinita** con botón "Cargar más" de a 10 items por página.
- **Cálculo de población total** de todos los planetas cargados
- **La aplicación consume datos de la API pública de Star Wars: `https://swapi.py4e.com/api/planets`**
- **El cálculo de población total** solo incluye los planetas actualmente cargados en la tabla

## Tecnologías Utilizadas

- **React**
- **TypeScript**
- **Vite** 
- **TanStack Table (React Table)**
- **Tailwind CSS**
- **Radix UI**
- **Lucide React**
- **shadcn/ui** 

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm

## Instalación

1. **Clonar el repositorio** (o navegar al directorio del proyecto):
```bash
cd planets-table
```

2. **Instalar dependencias**:
```bash
npm install
```

## Cómo Ejecutar el Proyecto

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## Estructura del Proyecto

```
src/
├── features/
│   └── planets/           # Feature de planetas
│       ├── api/           # Llamadas a la API
│       ├── components/    # Componentes específicos
│       │   ├── columns.tsx      # Definición de columnas de la tabla
│       │   └── planets-table.tsx # Componente principal de la tabla
│       ├── hooks/         # Custom hooks
│       │   └── use-planets.ts   # Hook para manejo de datos de planetas
│       ├── lib/           # Utilidades y formateadores
│       │   ├── formatters.ts    # Funciones de formateo
│       │   └── translations.ts  # Traducciones
│       ├── types.ts       # Tipos TypeScript
│       └── index.ts       # Exports del feature
├── shared/
│   └── ui/                # Componentes UI compartidos
│       ├── badge.tsx
│       ├── button.tsx
│       ├── checkbox.tsx
│       ├── data-table.tsx
│       └── table.tsx
├── lib/
│   └── utils.ts
├── App.tsx
└── main.tsx
```

## Decisiones de Diseño e Implementación

### Formateo de Datos

- Los valores de `orbital_period` se expresan en días y no figuran en Figma, así que prioricé el requerimiento enviado por mail y lo dejé solo en días.
- Los valores de `rotation_period` están expresados en horas en la API y en Figma se muestran como días/horas/minutos, pero la API no contempla minutos, por lo que lo adapté a días/horas.
- Los valores nulos o vacíos se representan con guión (-) para mantener la consistencia visual.
- En el diseño de Figma, se muestra los valores de gravedad como m/s2 y decidí modificarlo a m/s².

### Visualización

- Tanto la columna `climate` como la columna `terrain`, se muestran como chips con un indicador "+N" cuando hay múltiples terrenos o climas.
- El scroll está dentro de la tabla para mejorar la experiencia de usuario con grandes cantidades de datos.
- La población total se muestra en el footer de la tabla, calculada dinámicamente según los planetas cargados. Prioricé el requerimiento por sobre el diseño. El diseño decía mostrar solo la suma de población y el requerimiento agregaba el label POBLACIÓN ACTUAL DE LOS PLANETAS: `suma`. Mismo tambien se mostraba debajo de la columna de población y lo agregué a la derecha por completo.
- Por desconocimiento del formato del numero de población, se evito el ' en el campo `population`.

## Posibles Mejoras Futuras

- Implementar filtrado de filas irrelevantes (ej: planetas con todos los valores "unknown" o "0").
- Poner magnitudes arriba en los headers en vez de cada celda.
- Columna checkbox es irrelevante, considerar quitarla.
- Cambio de titulo para que coincida con el contenido de SWAPI, ya que son planetas y planetoides.
