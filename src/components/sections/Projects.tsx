import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import { ProjectGrid } from "@/components/ui/project-grid"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import * as React from "react";

interface Project {
  title: string
  images: string[]
  description: string
  technologies: string[]
}

// Новый компонент для содержимого модального окна
function ProjectModalContent({ project }: { project: Project }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, [project])

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
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect])

  return (
    <>
      <DialogHeader>
        <DialogTitle>{project.title}</DialogTitle>
        <DialogDescription>Детали проекта</DialogDescription>
      </DialogHeader>
      <div className="mt-4">
        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {project.images.map((src, index) => (
              <div className="flex-[0_0_100%] min-w-0 relative h-96 mr-4" key={index}>
                <Image
                  src={src}
                  alt={`${project.title} - изображение ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
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
    </>
  )
}

function Projects() {
    const projects: Project[] = [
        {
            title: "Фирменный стиль для кафе-пекарни \"Моретта\"",
            images: ["/фирменный стиль1.jpg", "/фирменный стиль -2.jpg", ],
            description: "Разработка и дизайн фирменного стиля для кафе-пекарни \"Моретта\".",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Фирменный стиль для бренда одежды \"Palmistry\"",
            images: ["/68.jpg",  ],
            description: "Разработка и дизайн фирменного стиля для бренда одежды \"Palmistry\".",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Фирменный стиль для бренда одежды \"Bershka\"",
            images: ["/Бершка.jpg",  ],
            description: "Разработка и дизайн фирменного стиля для бренда одежды \"Bershka\".",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Дизайн сайта для обучающей платформы",
            images: ["/site1.png",  "/site2.png", "/site3.png",],
            description: "Разработка и дизайн сайта для обучающей платформы.",
            technologies: ["Figma",]
        },
        {
            title: "Календарь",
            images: ["/календарь.jpg", ],
            description: "Разработка и дизайн страницы в календаре.",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Плакаты \"ATI.SU\"",
            images: ["/доставка  копия.jpg", "/вселенная.jpg", "/пакмен.jpg", "/фото плакат.jpg",],
            description: "Разработка и дизайн плакатов на тему \"Биржа грузоперевозок ATI.SU\".",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Чат-бот «Kiney!»",
            images: ["/Chat-bot_Страница_1.jpg", "/Chat-bot_Страница_2.jpg", "/Chat-bot_Страница_3.jpg", "/Chat-bot_Страница_4.jpg", "/Chat-bot_Страница_5.jpg", "/Chat-bot_Страница_6.jpg", "/Chat-bot_Страница_7.jpg", "/Chat-bot_Страница_8.jpg", "/Chat-bot_Страница_9.jpg", ],
            description: "Разработка и дизайн чат-бота “Kiney”, который позволяет создавать задания.",
            technologies: ["Figma", ]
        },
        {
            title: "Плакаты на тему «Вторая мировая война»",
            images: ["/на печать стена_page-0001.jpg", "/на печать рельсы.jpg", "/на печать освобождение_page-0001.jpg", ],
            description: "Разработка плакатов ко дню празднования победы во Второй мировой войне ",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Брендбук «ATI.SU»",
            images: ["/печать брендбук_Страница_01.jpg", "/печать брендбук_Страница_02.jpg", "/печать брендбук_Страница_04.jpg", "/печать брендбук_Страница_05.jpg", "/печать брендбук_Страница_06.jpg", "/печать брендбук_Страница_07.jpg", "/печать брендбук_Страница_08.jpg", "/печать брендбук_Страница_09.jpg", "/печать брендбук_Страница_10.jpg", "/печать брендбук_Страница_11.jpg", "/печать брендбук_Страница_12.jpg", "/печать брендбук_Страница_13.jpg", "/печать брендбук_Страница_14.jpg", "/печать брендбук_Страница_15.jpg", "/печать брендбук_Страница_16.jpg", "/печать брендбук_Страница_17.jpg", "/печать брендбук_Страница_18.jpg", "/печать брендбук_Страница_19.jpg", "/печать брендбук_Страница_20.jpg", "/печать брендбук_Страница_21.jpg", "/печать брендбук_Страница_22.jpg", "/печать брендбук_Страница_23.jpg", "/печать брендбук_Страница_24.jpg", "/печать брендбук_Страница_25.jpg", "/печать брендбук_Страница_26.jpg", "/печать брендбук_Страница_27.jpg", "/печать брендбук_Страница_28.jpg", "/печать брендбук_Страница_29.jpg", "/печать брендбук_Страница_30.jpg", "/печать брендбук_Страница_31.jpg", "/печать брендбук_Страница_32.jpg", ],
            description: "Разработка и дизайн брендбука, а также фирменного стиля для биржи грузоперевозок «ATI.SU”",
            technologies: ["Illustrator", "Photoshop", "InDesign", ]
        },
        {
            title: "Инфографика для маркетплейсов \"Наушники hoco\"",
            images: ["/headphones-1.jpg", "/headphones-2.jpg",  ],
            description: "Разработка и дизайн инфографики для маркетплейсов \"Наушники hoco\".",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Инфографика для маркетплейсов \"Белая футболка с принтом \"",
            images: ["/t-shirt-1.jpg", "/t-shirt-2.jpg", "/t-shirt-3.jpg", "/t-shirt-4.jpg", "/t-shirt-5.jpg",  ],
            description: "Разработка и дизайн инфографики для маркетплейсов, а также разработка принта для футболки.",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Инфографика для маркетплейсов \"Защитное стекло для Realme c11\"",
            images: ["/glass-1.jpg", "/glass-2.jpg", "/glass-3.jpg", "/glass-4.jpg", ],
            description: "Разработка и дизайн инфографики для маркетплейсов \"Защитное стекло для Realme c11\".",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Pop-up book \"Свято-Успенски кафедральный собор\"",
            images: ["/cathedral.JPG"],
            description: "Разработка и дизайн pop-up book \"Свято-Успенский кафедральный собор\" с использованием вытинанки.",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Дизайн упаковки чая \"Раніца\"",
            images: ["/me.JPG", "/IMG_1841.JPG", "/IMG_1899.JPG", ],
            description: "Разработка и дизайн подарочной упаковки чая с использованием вытинанки.",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Pop-up book \"Алиса в стране чудес\"",
            images: ["/IMG_3760.JPG", "/IMG_3767.JPG", ],
            description: "Разработка и дизайн pop-up book \"Алиса в стране чудес\".",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Фотосессия \"Частный психолог\"",
            images: [ "/photo/3.jpg", "/photo/7.jpg", "/photo/8.jpg", "/photo/9.jpg", "/photo/10.jpg" ],
            description: "Фотоссесия для частного психолога.",
            technologies: ["фотографика", "Photoshop"]
        },
        {
            title: "Фотосессия \"Бильярд\"",
            images: ["/poole/1.jpg", "/poole/3.jpg", "/poole/5.jpg", "/poole/24.jpg", "/poole/48.jpg" ],
            description: "Фотоссесия для продажи бильярдных киев.",
            technologies: ["фотографика", "Photoshop"]
        },
        {
            title: "Уличная фотосессия",
            images: ["/p1.jpg", "/p2.jpg", "/p3.jpg", ],
            description: "Фотоссесия на улице.",
            technologies: ["фотографика", "Photoshop"]
        },
        {
            title: "Фотосессия \"Тату-салон\"",
            images: ["/tatoo/1.JPG", "/tatoo/3.JPG", "/tatoo/6.JPG", "/tatoo/9.JPG", "/tatoo/10.JPG" ],
            description: "Фотоссесия для тату-салона \"Vipink\".",
            technologies: ["фотографика", "Photoshop"]
        },
        {
          title: "Фотосессия для игры страйкбол",
          images: ["/strikeball/15.jpg", "/strikeball/22.jpg", "/strikeball/52.jpg", "/strikeball/55.jpg", "/strikeball/59.jpg", "/strikeball/61.jpg" ],
          description: "Фотоссесия для игры страйкбол.",
          technologies: ["фотографика", "Photoshop"]
      },
        {
            title: "Упаковка макарон \"Макаронни\"",
            images: ["/mac.jpg", "/mac2.jpg"],
            description: "Разработка и дизайн упаковки макарон для детей \"Макаронни\".",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Шрифт",
            images: ["/шрифт на печать в кривых_Страница_1.jpg", "/шрифт на печать в кривых_Страница_2.jpg",],
            description: "Разработка шрифта на русском языке.",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
            title: "Логотип для vape shop \"Start Vape Shop\"",
            images: ["/для авы копия.jpg", ],
            description: "Разработка логотипа для vape shop \"Start Vape Shop\".",
            technologies: ["Illustrator", "Photoshop"]
        },
        {
          title: "Логотип для \"Цуруги\"",
          images: ["/Аватарка.png", ],
          description: "Разработка логотипа для \"Цуруги\".",
          technologies: ["Illustrator", "Photoshop"]
      },
        {
            title: "Визитка для vape shop “Start Vape Shop”",
            images: ["/Card.jpg", ],
            description: "Дизайн визитки для vape shop “Start Vape Shop”",
            technologies: ["Illustrator", "Photoshop"]
        },

        // {
        //     title: "Иллюстрации для принта на футболку",
        //     images: ["/ilustration/a.jpg", "/ilustration/meat.jpg", ],
        //     description: "Разработка и дизайн иллюстраций для принта на футболку.",
        //     technologies: ["Illustrator", "Photoshop"]
        // },
        {
            title: "3D модель дома",
            images: ["/photo.jpg", ],
            description: "Разработка 3D модели дома мечты",
            technologies: ["Cinema 4D", ]
        },

    ]


  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects">
      <h2 className="text-xl md:text-2xl font-bold mb-8 text-primary">Проекты</h2>
      <ProjectGrid
        projects={projects}
        columns={3}
        gap="lg"
        variant="glass"
        className="mt-8"
        onProjectClick={setSelectedProject}
      />

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedProject && (
            <ProjectModalContent project={selectedProject} />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export { Projects, ProjectModalContent } 