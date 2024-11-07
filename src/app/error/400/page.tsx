import Link from 'next/link'

const Custom400 = () => {
  return (
    <div className="bg-gray-100 flex h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-600">400</h1>
      <p className="text-gray-700 mt-4 text-xl">Bad Request</p>
      <p className="text-gray-500 mt-2">
        The server could not understand your request. Please check and try again.
      </p>
      <Link href="/" className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Go Back Home
      </Link>
    </div>
  )
}

export default Custom400
