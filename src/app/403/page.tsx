import Link from 'next/link';

const Custom403 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <p className="mt-4 text-xl text-gray-700">Access Denied</p>
      <p className="mt-2 text-gray-500">You do not have permission to view this page.</p>
      <Link href="/account" className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
        Go Back Home
      </Link>
    </div>
  );
};

export default Custom403;