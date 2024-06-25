import { SimpleJsonEditor } from '@/components'

const App = () => (
  <div className="font-mono grid grid-flow-row min-h-screen bg-amber-200">
    <header className="text-center pl-0 mt-3 sm:text-left sm:pl-4">
      <a
        href="https://github.com/tjmaynes/json-validator"
        className="text-2xl font-bold text-blue-600 dark:text-blue-500"
      >
        JSON Validator
      </a>
    </header>
    <section className="p-7">
      <SimpleJsonEditor />
    </section>
    <footer className="pl-0 mb-4 sm:pl-4">
      <p className="text-sm text-center sm:text-left">
        Built for fun & learning by{' '}
        <a
          href="https://tjmaynes.com/"
          className="text-blue-600 dark:text-blue-500"
        >
          TJ Maynes
        </a>
      </p>
    </footer>
  </div>
)

export default App
