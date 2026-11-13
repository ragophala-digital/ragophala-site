import { LinkButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <p className="label mb-5">Error 404</p>
      <h1 className="display-lg max-w-[16ch]">This page could not be found.</h1>
      <p className="body-lg mt-5">The page may have moved or the link may be incorrect.</p>
      <div className="mt-8"><LinkButton href="/">Back to home</LinkButton></div>
    </section>
  );
}
