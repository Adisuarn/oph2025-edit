import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-3 bg-gradient-to-tl from-grumpyGreen-300 via-oldyGoldy to-redWine">
      <h1 className="text-4xl">404 | Page Not Found</h1>
      <Link href="/account" className="hover:underline">
        go back to account page
      </Link>
    </div>
  )
}
