"use client";

/** Last-resort boundary for errors in the root layout. Uses inline styles because global CSS may not have loaded. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-ZA">
      <body style={{ margin: 0, background: "#F5F3EF", color: "#101827", fontFamily: "system-ui, sans-serif" }}>
        <main role="alert" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
          <div style={{ maxWidth: 480 }}>
            <h1 style={{ fontSize: 32, margin: "0 0 12px" }}>Something went wrong.</h1>
            <p style={{ lineHeight: 1.6, margin: "0 0 24px" }}>The site could not load properly. Please try again.</p>
            <button type="button" onClick={reset} style={{ background: "#315BFA", color: "#fff", border: 0, borderRadius: 999, padding: "12px 24px", fontSize: 16, cursor: "pointer" }}>
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
