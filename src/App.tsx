import { PlanetsTable } from './features/planets'

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-shrink-0 px-5 pt-6 pb-4">
        <h1 className="text-3xl leading-none font-bold px-2 title-planets">
          Planetas y cuerpos celestes
        </h1>
      </div>
      <div className="flex-1 overflow-hidden px-5 pb-6">
        <PlanetsTable />
      </div>
    </div>
  )
}

export default App
