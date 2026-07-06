type ClubBadgeProps = {
  name: string;
  color?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-base"
};

export function ClubBadge({ name, color = "#d6ad52", size = "md" }: ClubBadgeProps) {
  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-md border font-black text-white shadow-lg`}
      style={{
        borderColor: color,
        background: `linear-gradient(145deg, ${color}, #080b11 70%)`
      }}
      aria-hidden="true"
    >
      {name.slice(0, 3).toUpperCase()}
    </div>
  );
}
