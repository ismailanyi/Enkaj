import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-800 p-4">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-full">
        Return Home
      </Link>
    </div>
  )
}

