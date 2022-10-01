/* This example requires Tailwind CSS v2.0+ */
import { Header } from '../components/Header'


export function Home() {

  return (
    <>
      <div className="min-h-full pb-4">
        <div className="bg-gray-800 pb-32">
          <Header name="Home"/>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">Home</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl max-h-screen px-4 pb-12 sm:px-6 gap-4 lg:grid-cols-3 lg:px-8">
            {/* Replace with your content */}
            
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}
