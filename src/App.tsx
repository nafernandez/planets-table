import { PlanetsTable } from './features/planets'

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div 
        className="flex-shrink-0 opacity-100 gap-6 pt-6 pb-6 w-full max-w-[1265px] min-h-[78px] pr-4 sm:pr-[32px] pl-4 sm:pl-[32px] flex flex-wrap items-center"
      >
        <h1 className="text-2xl sm:text-3xl leading-tight font-bold px-2 title-planets break-words">
          Planetas y cuerpos celestes
        </h1>
      </div>
      <div className="flex-1 overflow-hidden pb-6">
        <PlanetsTable />
      </div>
    </div>
  )
}

export default App
