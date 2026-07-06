import Link from "next/link";
import { ChevronRight } from "lucide-react";

type SectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
  href?: string;
};

export function SectionHeader({ icon, title, href }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="inline-flex items-center gap-2 text-lg font-black text-white">
        <span className="gold-text">{icon}</span>
        {title}
      </h2>
      {href ? (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-bold text-[var(--brand)]"
        >
          View all <ChevronRight size={15} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
