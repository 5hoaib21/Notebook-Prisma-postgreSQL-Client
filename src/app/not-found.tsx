import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="mt-2 mb-6 text-stone-500">This note or page does not exist.</p>
        <Link
          href="/notes"
          className="inline-flex items-center gap-1.5 rounded-md bg-teal-700 px-4 py-2 text-white hover:bg-teal-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to notes
        </Link>
      </div>
    </div>
  );
};

export default NotFound;