interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "lg";
  children: React.ReactNode;
}

export function CustomButton({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-cyan-500 text-white hover:bg-cyan-600",
    outline: "border border-white/10 bg-transparent hover:bg-white/10",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    lg: "h-11 px-8 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
