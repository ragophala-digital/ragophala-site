export default function Loading() {
  return (
    <div className="container-x flex min-h-[60vh] items-center justify-center pt-24" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <span aria-hidden className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-cobalt" />
    </div>
  );
}
