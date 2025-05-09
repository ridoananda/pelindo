export default function Button({
  type = "button",
  className = "",
  disabled = false,
  children,
  variant = "primary",
  size = "md",
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    white: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
  };

  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
