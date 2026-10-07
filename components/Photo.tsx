import Image from "next/image";

type Props = {
  src: string | null | undefined;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
  position?: string; // CSS object-position, e.g. "50% 20%"
};

// Renders a photo that fills its (relatively positioned) parent. If no photo has
// been added yet, shows a quiet placeholder so the layout still holds together.
export default function Photo({ src, alt, className = "", sizes = "100vw", priority, label, position }: Props) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 flex items-end bg-night p-4 ${className}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(184,117,46,0.14) 0 2px, transparent 2px 14px)",
        }}
      >
        {label && (
          <span className="font-tag text-[10px] uppercase tracking-tag text-white/50">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={position ? { objectPosition: position } : undefined}
      className={`object-cover ${className}`}
    />
  );
}
