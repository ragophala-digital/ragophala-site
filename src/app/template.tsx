export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span aria-hidden className="route-sweep pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-cobalt" />
      {children}
    </>
  );
}
