'use client'

import { useState } from "react"
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
import { Briefcase, GraduationCap, Mail, MapPin, Menu, Phone, Send, X } from "lucide-react"
import Image from "next/image"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { sendEmail } from '@/actions/sendEmail'

interface Project {
  title: string
  image: string
  description: string
  technologies: string[]
}

function ProjectDialog({ project }: { project: Project }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer transition-transform hover:scale-105">
                    <div className="relative w-full h-48">
                        <Image
                            src={project.image}
                            alt={project.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform hover:scale-105"
                        />
                    </div>
                    <CardContent className="p-4">
                        <h3 className="font-semibold">{project.title}</h3>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>
                        Детали проекта
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <div className="relative w-full h-56">
                        <Image
                            src={project.image}
                            alt={project.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
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
          <h1 className="text-xl md:text-2xl font-bold text-primary">Анастасия Дизайнер</h1>
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
                    src="/avatar.jpg"
                    alt="Анастасия Дизайнер"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border-4 border-primary"
                />
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">О себе</h2>
                <p className="text-base md:text-lg mb-4">
                    Привет! Я Анастасия, креативный графический дизайнер с 5-летним опытом создания уникальных и запоминающихся дизайнерских решений, которые подчеркивают личность бренда и способствуют достижению его целей.
                </p>
                <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin size={18} className="text-primary" />
                    <span>Москва, Россия</span>
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
      "description": "За это время я разработала более 200 уникальных работ, включая дизайн социальных сетей, инфографику для маркетплейсов, дизайн тары и упаковки, а также баннеры и интернет-рекламу. Кроме того, я занималась разработкой и дизайном pop-up книг и многими другими проектами. Мой путь в графическом дизайне позволяет мне постоянно совершенствовать свои навыки и расширять горизонты. Я нацелена на создание уникальных и эффективных решений для каждого проекта, уверенная, что дизайн должен не только привлекать внимание, но и выполнять практические функции.",
      "skills": ["Дизайн социальных сетей", "Инфографика", "Дизайн упаковки", "Баннеры и реклама", "Pop-up книги", "Креативное мышление", "Адаптивный дизайн"]
    }
  ]

    return (
        <section id="experience">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">Опыт работы</h2>
            <div className="space-y-6">
                {jobs.map((job, index) => (
                    <Card key={index} className="border-muted">
                        <CardContent className="flex flex-col p-4 md:p-6">
                            <div className="flex items-start">
                                <Briefcase className="mr-4 mt-1 text-primary hidden md:block" />
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold text-primary">{job.title}</h3>
                                    <p className="text-sm md:text-base text-muted-foreground">{job.company} | {job.period}</p>
                                    <p className="mt-2 text-sm md:text-base">{job.description}</p>
                                </div>
                            </div>
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
                <CardContent className="flex flex-col p-4 md:p-6">
                  <div className="flex items-start">
                    <GraduationCap className="mr-4 mt-1 text-primary hidden md:block" />
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-primary">{edu.degree}</h3>
                      <p className="text-sm md:text-base text-muted-foreground">{edu.institution} | {edu.period}</p>
                      <p className="mt-2 text-sm md:text-base">{edu.description}</p>
                    </div>
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
      title: "Pop-up book \"Свято-Успенски кафедральный собор\"",
      image: "/cathedral.JPG",
      description: "Разработка и дизайн pop-up book \"Свято-Успенский кафедральный собор\", с использованием вытинанки.",
      technologies: ["Illustrator", "Photoshop"]
    },
    {
      title: "Дизайн упаковки чая \"Раніца\"",
      image: "/me.JPG",
      description: "Разработка и дизайн подарочной упаковки чая, с использованием вытинанки.",
      technologies: ["Illustrator", "Photoshop"]
    }
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