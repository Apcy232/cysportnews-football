type PageShellProps = {
  title: string;
  description: string;
};

export function PageShell({ title, description }: PageShellProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-normal text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-normal sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}
