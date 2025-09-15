import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const dividerVariants = cva("divider", {
  variants: {
    variant: {
      default: "",
      gradient: "bg-gradient-to-r from-transparent via-border to-transparent",
      dashed: "border-dashed border-t",
      dotted: "border-dotted border-t",
    },
    orientation: {
      horizontal: "w-full h-px my-6",
      vertical: "h-full w-px mx-6",
    },
    size: {
      default: "",
      thin: "h-[1px]",
      thick: "h-[2px]",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
    size: "default",
  },
})

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: string
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, variant, orientation, size, label, ...props }, ref) => {
    if (label) {
      return (
        <div className="relative flex items-center justify-center my-6">
          <div
            className={cn(
              dividerVariants({ variant, orientation, size, className }),
              "absolute inset-0"
            )}
            ref={ref}
            {...props}
          />
          <span className="relative px-4 text-sm text-muted-foreground bg-background">
            {label}
          </span>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(dividerVariants({ variant, orientation, size, className }))}
        {...props}
      />
    )
  }
)
Divider.displayName = "Divider"

export { Divider, dividerVariants } 