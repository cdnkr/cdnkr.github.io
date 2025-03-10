import { cn } from "@/utils/cn";
import { ChevronUp } from "./icons";

export function Block({ children, className, _ref, caretPosition = "top-right", variant = "primary" }) {
    const variants = {
        primary: "bg-primary text-dark",
        secondary: "bg-secondary text-dark",
        tertiary: "bg-tertiary text-dark",
        dark: "bg-dark text-white",
    }

    const caretVariants = {
        primary: "fill-primary",
        secondary: "fill-secondary",
        tertiary: "fill-tertiary",
        dark: "fill-dark",
    }

    const hideBorderVariants = {
        primary: "bg-primary",
        secondary: "bg-secondary",
        tertiary: "bg-tertiary",
        dark: "bg-dark",
    }

  const caretPositionClass = {
    "top-left": "-left-2 -top-[2rem]",
    "top-right": "-right-2 -top-[2rem]",
    "left-top": "-left-[2rem] -top-2 -rotate-90",
  }[caretPosition];

  const hideBorderClass = {
    "top-left": "left-0 -top-[1px] h-[1px]",
    "top-right": "right-0.5 -top-[1px] h-[1px]",
    "left-top": "-left-3.5 top-4 h-[1px] -rotate-90",
  }[caretPosition];

  return (
    <div
      ref={_ref}
      className={cn(
        "w-full p-4 border-2 border-dark transition-all duration-300 relative",
        variants[variant],
        className,
      )}
    >
      <ChevronUp
        strokeWidth={1}
        className={cn(
          "absolute stroke-dark size-12",
          caretVariants[variant],
          caretPositionClass,
        )}
      />
      <div
        className={cn(
          "absolute w-7",
          hideBorderVariants[variant],
          hideBorderClass,
        )}
      />
      {children}
    </div>
  )
}

