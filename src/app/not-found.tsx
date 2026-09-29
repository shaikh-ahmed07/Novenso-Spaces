import ButtonLink from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center bg-ink text-ivory">
      <div className="container-x py-32">
        <p className="eyebrow flex items-center gap-4 text-brass-light">
          <span className="rule-brass" />
          Error 404
        </p>
        <h1 className="display-xl mt-8 max-w-[14ch]">This space hasn&apos;t been designed yet.</h1>
        <p className="lead mt-8 max-w-lg text-ivory/65">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-12 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/" tone="light">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/projects" variant="outline" tone="light">
            View Projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
