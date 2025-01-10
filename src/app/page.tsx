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

function Header({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean, setMobileMenuOpen: (open: boolean) => void }) {
  return (
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b border-muted">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-primary">Графический Дизайнер</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="#about" className="hover:text-primary transition-colors">О себе</a></li>
              <li><a href="#experience" className="hover:text-primary transition-colors">Опыт</a></li>
              <li><a href="#education" className="hover:text-primary transition-colors">Образование</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Проекты</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Контакты</a></li>
            </ul>
          </nav>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="text-primary" />
          </button>
        </div>
        {mobileMenuOpen && (
            <nav className="md:hidden">
              <ul className="flex flex-col items-center space-y-2 py-4">
                <li><a href="#about" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>О себе</a></li>
                <li><a href="#experience" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Опыт</a></li>
                <li><a href="#education" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Образование</a></li>
                <li><a href="#projects" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Проекты</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Контакты</a></li>
              </ul>
            </nav>
        )}
      </header>
  )
}

function About() {
    return (
        <section id="about" className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                <Image
                    src="/avatar.JPG"
                    alt="Анастасия Дизайнер"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border-4 border-primary"
                    loading="lazy"
                />
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">О себе</h2>
                <p className="text-base md:text-lg mb-4">
                    Привет! Я Анастасия, креативный графический дизайнер с 5-летним опытом создания уникальных и запоминающихся дизайнерских решений, которые подчеркивают личность бренда и способствуют достижению его целей.
                </p>
                <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin size={18} className="text-primary" />
                    <span>Минск, Беларусь</span>
                </div>
            </div>
        </section>
    )
}
function Experience() {
  const jobs = [
    {
      "title": "Графический дизайнер",
      "company": "Самозанятость",
      "period": "2021 - настоящее время",
      "description": "За это время я разработала более 200 уникальных работ, включая дизайн социальных сетей, инфографику для маркетплейсов, дизайн тары и упаковки, а также баннеры и интернет-рекламу. Кроме того, я занималась разработкой и дизайном pop-up книг и многими другими проектами. Мой путь в графическом дизайне позволяет мне постоянно совершенствовать свои навыки и расширять горизонты. Я нацелена на создание уникальных и эффективных решений для каждого проекта, уверена, что дизайн должен не только привлекать внимание, но и выполнять практические функции.",
      "skills": ["Дизайн социальных сетей", "Инфографика", "Дизайн упаковки", "Баннеры и реклама", "Pop-up книги", "Креативное мышление", "Адаптивный дизайн"]
    }
  ]

    return (
        <section id="experience">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">Опыт работы</h2>
            <div className="space-y-6">
                {jobs.map((job, index) => (
                    <Card key={index} className="border-muted">
                        <CardContent className="flex flex-col md:flex-row p-4 md:p-6">
                            <div className="flex justify-center">
                                <Briefcase className="w-18 h-18 text-primary shrink-0 mb-4 md:mb-0 md:mr-6" />
                            </div>

                            <div>
                                <h3 className="text-lg md:text-xl font-semibold text-primary">{job.title}</h3>
                                <p className="text-sm md:text-base text-muted-foreground">{job.company} | {job.period}</p>
                                <p className="mt-2 text-sm md:text-base">{job.description}</p>
                                <div className="mt-4">
                                    <h4 className="font-semibold mb-2 text-primary text-sm md:text-base">Полученные навыки:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.map((skill, skillIndex) => (
                                            <span key={skillIndex} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs md:text-sm">
                        {skill}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

function Education() {
  const educations = [
    {
      degree: "Графический дизайн",
      institution: "Минская государственная гимназия-колледж искусств",
      period: "2021 - 2024",
      description: "Образование в области графического дизайна, позволило мне развить навыки в разработке и дизайне тары и упаковки, создании баннеров и плакатов. Обучение способствовало повышению художественных навыков в рисунке и живописи, а также освоению проектирования и разработки pop-up книг и многого другого."
    }
  ]

    return (
        <section id="education">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">Образование</h2>
            <div className="space-y-6">
                {educations.map((edu, index) => (
                    <Card key={index} className="border-muted">
                        <CardContent className="flex flex-col md:flex-row p-4 md:p-6">
                            <div className="flex justify-center">
                                <GraduationCap className="w-18 h-18 text-primary shrink-0 mb-4 md:mb-0 md:mr-6" />
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold text-primary">{edu.degree}</h3>
                                <p className="text-sm md:text-base text-muted-foreground">{edu.institution} | {edu.period}</p>
                                <p className="mt-2 text-sm md:text-base">{edu.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
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
          images: ["/photo/2.jpg", "/photo/3.jpg", "/photo/7.jpg", "/photo/8.jpg", "/photo/9.jpg", "/photo/10.jpg" ],
          description: "Фотоссесия для частного психолога.",
          technologies: ["фотографика", "Photoshop"]
      },
      {
          title: "Фотосессия \"Бильярд\"",
          images: ["/poole/1.jpg", "/poole/3.jpg", "/poole/4.jpg", "/poole/5.jpg", "/poole/6.jpg", "/poole/14.jpg", "/poole/24.jpg", "/poole/48.jpg" ],
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
          images: ["/tatoo/1.JPG", "/tatoo/3.JPG", "/tatoo/4.JPG", "/tatoo/6.JPG", "/tatoo/9.JPG", "/tatoo/10.JPG", "/tatoo/17.jpg" ],
          description: "Фотоссесия для тату-салона \"Vipink\".",
          technologies: ["фотографика", "Photoshop"]
      },
      {
          title: "Упаковка макарон \"Макаронни\"",
          images: ["/mac.jpg"],
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
          images: ["/Card.jpg", ],
          description: "Разработка логотипа для vape shop \"Start Vape Shop\".",
          technologies: ["Illustrator", "Photoshop"]
      },
      {
          title: "Визитка для vape shop “Start Vape Shop”",
          images: ["/визитки другой серый этот_Страница_1.jpg", "/визитки другой серый этот_Страница_2.jpg", ],
          description: "Дизайн визитки для vape shop “Start Vape Shop”",
          technologies: ["Illustrator", "Photoshop"]
      },

      {
          title: "Иллюстрации для принта на футболку",
          images: ["/ilustration/a.jpg", "/ilustration/meat.jpg", ],
          description: "Разработка и дизайн иллюстраций для принта на футболку.",
          technologies: ["Illustrator", "Photoshop"]
      },
      {
          title: "3D модель дома",
          images: ["/photo.jpg", ],
          description: "Разработка 3D модели дома мечты",
          technologies: ["Cinema 4D", ]
      },

  ]

    return (
        <section id="projects">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">Проекты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <ProjectDialog key={index} project={project} />
                ))}
            </div>
        </section>
    )
}

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${type} скопирован в буфер обмена!`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, (err) => {
      console.error('Не удалось скопировать текст: ', err);
      toast.error('Не удалось скопировать текст. Пожалуйста, попробуйте еще раз.');
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = await sendEmail(formData);

    if (result.success) {
      toast.success(result.message);
      (event.target as HTMLFormElement).reset();
    } else {
      toast.error(result.message);
    }

    setIsSubmitting(false);
  };

  return (
      <section id="contact" className="max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary">Свяжитесь со мной</h2>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <Button
              variant="outline"
              className="flex items-center justify-center border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded"
              onClick={() => copyToClipboard('Soldatenkonastasia@gmail.com', 'Email')}
          >
            <Mail className="mr-2" size={18} />
            Soldatenkonastasia@gmail.com
          </Button>
          <Button
              variant="outline"
              className="flex items-center justify-center border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded"
              onClick={() => copyToClipboard('+7 (999) 123-45-67', 'Номер телефона')}
          >
            <Phone className="mr-2" size={18} />
            +375 (44) 740-36-16
          </Button>
            <Button
                variant="outline"
                className="flex items-center justify-center border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded">
                <Link
                    href="https://www.instagram.com/nastasia_kim_/?hl=ru"
                >
                    <Instagram size={18} />
                </Link>
            </Button>

        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Ваше имя" className="border-muted rounded" required />
          <Input name="email" type="email" placeholder="Ваш email" className="border-muted rounded" required />
          <Textarea name="message" placeholder="Ваше сообщение" className="border-muted rounded" required />
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить'} <Send className="ml-2" size={18} />
          </Button>
        </form>
      </section>
  )
}

function Footer() {
  return (
      <footer className="bg-secondary text-secondary-foreground py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-sm md:text-base">
          © 2024 Анастасия Дизайнер. Все права защищены.
        </div>
      </footer>
  )
}

export default function DesignerPortfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
      <div className="min-h-screen bg-background text-foreground">
        <ToastContainer />
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className="container mx-auto px-4 py-8 space-y-16">
          <About />
          <Experience />
          <Education />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
  )
}