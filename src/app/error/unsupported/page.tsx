import Link from 'next/link'

const UnsupportedBrowser = () => {
  return (
    <div className="bg-gray-100 flex h-screen flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-red-600">Unsupported Browser</h1>
      <p className="text-gray-700 mt-4 text-xl">Sorry, this browser is not supported.</p>
      <p className="text-gray-500 mt-2 text-center">
        To view this site properly, please use a modern browser like Chrome, Firefox, Safari, or Edge.
      </p>
      <div className="mt-6 flex flex-col items-center">
        <Link href="/" className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Go Back Home
        </Link>
        <p className="mt-4 text-gray-500 text-sm">
          If you are on an outdated browser, consider updating or switching to a more recent version.
        </p>
      </div>
    </div>
  )
}

export default UnsupportedBrowser
