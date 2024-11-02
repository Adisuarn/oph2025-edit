import Link from 'next/link';

const Custom500 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">500</h1>
      <p className="mt-4 text-xl text-gray-700">Internal Server Error</p>
      <p className="mt-2 text-gray-500">Something went wrong on our end. Please try again later.</p>
      <div className="flex flex-col text-center mt-2 text-gray-500">
        Or contact the developer{' '}
        <div>
          <Link href="https://www.instagram.com/adisuarn" target='_blank'>
            <div className="inline-block group font-bold text-blue-600 transition-all duration-200 ease-in-out mt-3">
              Adisuarn
              <span className="block h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out origin-left"></span>
            </div>
          </Link>
          <span>, </span>
          <Link href="https://www.instagram.com/ruj22" target='_blank'>
            <div className="inline-block group font-bold text-blue-600 transition-all duration-200 ease-in-out mt-3">
              Siruj
              <span className="block h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out origin-left"></span>
            </div>
          </Link>
        </div>
      </div>
      <Link href="/" className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
        Go Back Home
      </Link>
    </div>
  );
};

export default Custom500;
