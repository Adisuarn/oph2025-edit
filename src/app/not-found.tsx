import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-col space-y-3 justify-center items-center w-full h-screen bg-gradient-to-tl from-grumpyGreen-300 via-oldyGoldy to-redWine'>
            <h1 className='text-4xl'>404 | Page Not Found</h1>
            <Link href="/account" className='hover:underline'>go back to account page</Link>
        </div>
    )
}
