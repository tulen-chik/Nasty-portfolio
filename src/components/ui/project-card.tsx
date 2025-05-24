import * as React from "react"
import Image from "next/image"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Button } from "./button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'

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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof projectCardVariants> {
  project: Project
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({
    className,
    variant,
    size,
    project,
    ...props
  }, ref) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })
    const [currentIndex, setCurrentIndex] = React.useState(0)

    const scrollPrev = React.useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = React.useCallback(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = React.useCallback(() => {
      if (!emblaApi) return
      setCurrentIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    React.useEffect(() => {
      if (!emblaApi) return;
      onSelect();
      emblaApi.on('select', onSelect);

      return () => {
        emblaApi.off('select', onSelect);
      };
    }, [emblaApi, onSelect]);

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Card
            ref={ref}
            className={cn(
              projectCardVariants({ variant, size, className }),
              "cursor-pointer transition-transform hover:scale-105"
            )}
            {...props}
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>
              Детали проекта
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="relative overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {project.images.map((src, index) => (
                  <div className="flex-[0_0_100%] min-w-0 relative h-96 mr-4" key={index}>
                    <Image
                      src={src}
                      alt={`${project.title} - изображение ${index + 1}`}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 mx-2"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 mx-2"
                onClick={scrollNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-center text-sm text-muted-foreground">
              {currentIndex + 1} / {project.images.length}
            </div>
            <p className="mt-4">{project.description}</p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Использованные технологии:</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)
ProjectCard.displayName = "ProjectCard"

export { ProjectCard, projectCardVariants } 