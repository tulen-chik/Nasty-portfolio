import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gradientTextVariants = cva("gradient-text", {
  variants: {
    variant: {
      default: "bg-gradient-to-r from-primary to-accent",
      subtle: "bg-gradient-to-r from-primary/80 to-accent/80",
      vibrant: "bg-gradient-to-r from-primary via-accent to-primary",
      monochrome: "bg-gradient-to-r from-foreground/90 to-foreground/70",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    weight: "normal",
  },
})

interface GradientTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: VariantProps<typeof gradientTextVariants>["variant"]
  size?: VariantProps<typeof gradientTextVariants>["size"]
  weight?: VariantProps<typeof gradientTextVariants>["weight"]
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"
}

const GradientText = ({
  className,
  variant,
  size,
  weight,
  as: Component = "span",
  ...props
}: GradientTextProps) => {
  return (
    <Component
      className={cn(gradientTextVariants({ variant, size, weight, className }))}
      {...props}
    />
  )
}
GradientText.displayName = "GradientText"

export { GradientText, gradientTextVariants } 