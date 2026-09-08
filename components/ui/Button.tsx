import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

interface BaseProps {
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  external?: boolean;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseStyles =
  "group inline-flex items-center justify-center gap-2 border px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-offwhite bg-offwhite text-charcoal hover:bg-transparent hover:text-offwhite",
  secondary:
    "border-line-strong bg-transparent text-offwhite hover:border-offwhite",
};

export default function Button(props: ButtonProps) {
  const { variant = "primary", showArrow = false, className, children } = props;
  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, variantStyles[variant], className)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cn(baseStyles, variantStyles[variant], className)}>
        {content}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {content}
    </button>
  );
}
