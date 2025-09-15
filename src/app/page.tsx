'use client'

import {useCallback, useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Briefcase,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    Instagram,
    Mail,
    MapPin,
    Menu,
    Phone,
    Send,
    X
} from "lucide-react"
import Image from "next/image"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { sendEmail } from '@/actions/sendEmail'
import useEmblaCarousel from 'embla-carousel-react'
import Link from "next/link";
import { ProjectGrid } from "@/components/ui/project-grid"
import React, { lazy, Suspense } from "react"
import { ToastContainer as ReactToastifyToastContainer } from 'react-toastify'
import Header from "@/components/sections/Header"

interface Project {
    title: string
    images: string[]
    description: string
    technologies: string[]
}

function ProjectDialog({ project }: { project: Project }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })
    const [currentIndex, setCurrentIndex] = useState(0)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setCurrentIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);

        // Cleanup the event listener on component unmount
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer transition-transform hover:scale-105">
                    <div className="relative w-full h-48">
                        <Image
                            src={project.images[0]}
                            alt={project.title}
                            layout="fill"
                            objectFit="contain"
                            className="transition-transform hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                    <CardContent className="p-4">
                        <h3 className="font-semibold">{project.title}</h3>
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
                                        objectFit={"contain"}
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

// Динамические импорты для ленивой загрузки секций
const About = lazy(() => import("@/components/sections/About"));
const Experience = lazy(() => import("@/components/sections/Experience"));
const Education = lazy(() => import("@/components/sections/Education"));
const Projects = lazy(() => import("@/components/sections/Projects").then(module => ({ default: module.Projects })));
const Contact = lazy(() => import("@/components/sections/Contact"));
const Footer = lazy(() => import("@/components/sections/Footer"));

// Ленивая загрузка ToastContainer
const LazyToastContainer = lazy(() => import('react-toastify').then(module => ({ default: module.ToastContainer })));

export default function DesignerPortfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Используем ленивую загрузку для ToastContainer */}
        <Suspense fallback={null}> {/* fallback={null} чтобы не показывать ничего во время загрузки */}
          <LazyToastContainer />
        </Suspense>

        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

        <main className="container mx-auto px-4 py-8 space-y-16">
          {/* Используем React.Suspense для ленивой загрузки секций */}
          {/* Каждая секция будет загружена по мере необходимости (например, при прокрутке) */}
          <Suspense fallback={<div>Загрузка секции "О себе"...</div>}> {/* Fallback для первой видимой секции */}
            <About />
          </Suspense>

          <Suspense fallback={<div>Загрузка секции "Опыт"...</div>}> {/* Fallback для следующих секций */}
            <Experience />
          </Suspense>

          <Suspense fallback={<div>Загрузка секции "Образование"...</div>}> {/* Fallback для следующих секций */}
            <Education />
          </Suspense>

          <Suspense> {/* Fallback для секции проектов */}
            <Projects />
          </Suspense>

          <Suspense fallback={<div>Загрузка секции "Контакты"...</div>}> {/* Fallback для секции контактов */}
            <Contact />
          </Suspense>
        </main>

        {/* Footer тоже лениво грузим */}
        <Suspense fallback={null}> {/* fallback={null} чтобы не показывать ничего во время загрузки */}
           <Footer />
        </Suspense>
      </div>
  )
}