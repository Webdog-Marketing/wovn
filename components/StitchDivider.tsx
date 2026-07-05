export default function StitchDivider({ className = "" }: { className?: string }) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`stitch-line w-full ${className}`}
    />
  );
}
