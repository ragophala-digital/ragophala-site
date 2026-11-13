import { LinkButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <p className="eyebrow">Error 404</p>
      <h1 className="h-display">This page could not be found.</h1>
      <p className="lead mt-4 max-w-md">The page may have moved or the link may be incorrect.</p>
      <div className="mt-8">
        <LinkButton href="/">Back to home</LinkButton>
      </div>
    </section>
  );
}
