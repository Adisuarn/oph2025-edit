import Link from 'next/link'

const Custom403 = () => {
  return (
    <div className="bg-gray-100 flex h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <p className="text-gray-700 mt-4 text-xl">Access Denied</p>
      <p className="text-gray-500 mt-2">You do not have permission to view this page.</p>
      <Link
        href="/account"
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default Custom403
