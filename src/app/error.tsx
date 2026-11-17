"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surfaced in the browser console and hosting logs; no user data is included.
    console.error("Route error", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="container-x flex min-h-[70vh] flex-col items-start justify-center pt-24" role="alert">
      <p className="label mb-5">Something went wrong</p>
      <h1 className="display-lg max-w-[16ch]">This page hit a problem.</h1>
      <p className="body-lg mt-5 max-w-xl">It is on our side, not yours. Try again, or go back to the home page. If it keeps happening, please contact us.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">Try again</button>
        <Link href="/" className="btn btn-line">Back to home</Link>
      </div>
    </section>
  );
}
