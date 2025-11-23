# Planets Table SWAPI

Aplicación web desarrollada en React que muestra una tabla interactiva de planetas y cuerpos celestes de Star Wars, consumiendo datos de la [SWAPI (Star Wars API)](https://swapi.dev/).

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

- **Períodos**: Los valores de rotación están expresados en horas en la API. En Figma se muestran como días/horas/minutos, pero la API no contempla minutos, por lo que lo adapté a días/horas.
Los valores de orbitación están en días y no figuran en Figma, así que prioricé el requerimiento enviado por mail y lo dejé solo en días.
- **Valores faltantes**: Se representan con guión (-) para mantener la consistencia visual.
- **Agregado de exponente a la gravedad**: El exponencial se muestra como numero entero, lo modifico a exponente.

### Visualización

- **Terrenos y climas**: Se muestran como chips con un indicador "+N" cuando hay múltiples terrenos o climas.
- **Scroll interno**: El scroll está dentro de la tabla para mejorar la experiencia de usuario con grandes cantidades de datos.
- **Población total**: Se muestra en el footer de la tabla, calculada dinámicamente según los planetas cargados.Priorice el requerimiento por sobre el diseño ya que tenia que agregar el label:
POBLACIÓN ACTUAL DE LOS PLANETAS: <suma>
- **Evasión de formato de población**: Por desconocimiento del formato del numero de población, se evito el '.

## Posibles Mejoras Futuras

- Implementar filtrado de filas irrelevantes (ej: planetas con todos los valores "unknown" o "0").
- Poner magnitudes arriba en los headers en vez de cada celda.
- Columna checkbox es irrelevante, considerar quitarla.
- Cambio de titulo para que coincida con el contenido de SWAPI, ya que son planetas y planetoides.
- La aplicación consume datos de la API pública de Star Wars: `https://swapi.py4e.com/api/planets`
- Los datos se cargan de forma paginada, mostrando 10 planetas por página
- El cálculo de población total solo incluye los planetas actualmente cargados en la tabla
