import * as React from "react"
import { cn } from "@/lib/utils"
import { ProjectCard, type Project } from "./project-card"

interface ProjectGridProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: Project[]
  columns?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  variant?: "default" | "glass" | "gradient"
  size?: "default" | "compact"
  onProjectClick?: (project: Project) => void
}

const ProjectGrid = React.forwardRef<HTMLDivElement, ProjectGridProps>(
  ({
    className,
    projects,
    columns = 3,
    gap = "md",
    variant = "default",
    size = "default",
    onProjectClick,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full gap-4 sm:gap-6 lg:gap-8",
          {
            "grid-cols-1": columns === 1,
            "grid-cols-1 sm:grid-cols-2": columns === 2,
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3": columns === 3,
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4": columns === 4,
            "gap-4": gap === "sm",
            "gap-6": gap === "md",
            "gap-8": gap === "lg",
          },
          className
        )}
        {...props}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title + index}
            variant={variant}
            size={size}
            project={project}
            onClick={onProjectClick}
            index={index}
          />
        ))}
      </div>
    )
  }
)
ProjectGrid.displayName = "ProjectGrid"

export { ProjectGrid }
export type { ProjectGridProps } 