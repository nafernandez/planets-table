import { PlanetsTable } from './features/planets'

function App() {
  return (
    <div className="mx-auto py-6 px-5">
      <h1 className="text-3xl leading-none font-bold mb-6 px-2">
        Planetas y cuerpos celestes
      </h1>
      <PlanetsTable />
    </div>
  )
}

export default App
