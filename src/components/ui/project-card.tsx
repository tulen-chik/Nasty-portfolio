import * as React from "react"
import Image from "next/image"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card"

const projectCardVariants = cva(
  "group relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card hover:shadow-soft",
        glass: "bg-card/80 backdrop-blur-sm hover:bg-card/90",
        gradient: "bg-gradient-to-br from-card to-card/80 hover:from-card/90 hover:to-card/70",
      },
      size: {
        default: "rounded-xl",
        compact: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface Project {
  title: string
  images: string[]
  description: string
  technologies: string[]
}

export interface ProjectCardProps
  extends VariantProps<typeof projectCardVariants> {
  project: Project
  onClick?: (project: Project) => void
  className?: string
  variant?: "default" | "glass" | "gradient"
  size?: "default" | "compact"
  index: number
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({
    className,
    variant,
    size,
    project,
    onClick,
    index,
    ...props
  }, ref) => {
    const isPriority = index < 9;

    return (
      <Card
        ref={ref}
        className={cn(
          projectCardVariants({ variant, size, className }),
          "cursor-pointer transition-transform hover:scale-105"
        )}
        onClick={() => onClick?.(project)}
        {...props}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={isPriority ? "eager" : "lazy"}
            priority={isPriority}
          />
        </div>
        <CardContent className="p-6">
          <h3 className="mb-2 line-clamp-1 font-semibold">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-muted-foreground">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
)
ProjectCard.displayName = "ProjectCard"

export { ProjectCard, projectCardVariants } 