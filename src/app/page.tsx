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
import { Briefcase, Mail, MapPin, Phone, Send, X } from "lucide-react"
import Image from "next/image"

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
            <Image src={project.image} alt={project.title} width={300} height={200} className="w-full h-48 object-cover" />
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
            <Image src={project.image} alt={project.title} width={400} height={300} className="w-full h-56 object-cover rounded-lg" />
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

export default function DesignerPortfolio() {
  const projects: Project[] = [
    {
      title: "Редизайн приложения для фитнеса",
      image: "/placeholder.svg?height=200&width=300",
      description: "Полный редизайн мобильного приложения для фитнеса, включающий улучшение пользовательского опыта и внедрение новых функций для отслеживания прогресса.",
      technologies: ["Figma", "Protopie", "Adobe XD"]
    },
    {
      title: "Дизайн системы для финтех стартапа",
      image: "/placeholder.svg?height=200&width=300",
      description: "Разработка комплексной дизайн-системы для быстрорастущего финтех стартапа, обеспечивающей согласованность во всех продуктах компании.",
      technologies: ["Sketch", "InVision", "Zeplin"]
    },
    {
      title: "UX исследование и редизайн e-commerce платформы",
      image: "/placeholder.svg?height=200&width=300",
      description: "Проведение глубокого UX исследования и последующий редизайн крупной e-commerce платформы, что привело к увеличению конверсии на 25%.",
      technologies: ["Figma", "Hotjar", "UserTesting"]
    }
  ]

  return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b border-muted">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Анастасия Дизайнер</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#about" className="hover:text-primary transition-colors">О себе</a></li>
                <li><a href="#experience" className="hover:text-primary transition-colors">Опыт</a></li>
                <li><a href="#projects" className="hover:text-primary transition-colors">Проекты</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </nav>
          </div>
        </header>
a
        <main className="container mx-auto px-4 py-8 space-y-16">
          <section id="about" className="flex flex-col md:flex-row items-center gap-8">
            <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Анастасия Дизайнер"
                width={300}
                height={300}
                className="rounded-full border-4 border-primary"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">О себе</h2>
              <p className="text-lg mb-4">
                Привет! Я Анастасия, креативный UI/UX дизайнер с 5-летним опытом создания интуитивных и привлекательных интерфейсов. Моя страсть - превращать сложные проблемы в простые и элегантные решения.
              </p>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin size={18} className="text-primary" />
                <span>Москва, Россия</span>
              </div>
            </div>
          </section>

          <section id="experience">
            <h2 className="text-3xl font-bold mb-8 text-primary">Опыт работы</h2>
            <div className="space-y-6">
              {[
                {
                  title: "Ведущий UI/UX дизайнер",
                  company: "ТехноСофт",
                  period: "2020 - настоящее время",
                  description: "Руководство командой дизайнеров, разработка дизайн-систем и создание пользовательских интерфейсов для веб и мобильных приложений.",
                  skills: ["Управление проектами", "Дизайн-системы", "Прототипирование", "User Research", "A/B тестирование"]
                },
                {
                  title: "UI дизайнер",
                  company: "Креатив Диджитал",
                  period: "2018 - 2020",
                  description: "Создание визуальных концепций и прототипов для различных клиентских проектов.",
                  skills: ["Wireframing", "Визуальный дизайн", "Анимация интерфейсов", "Адаптивный дизайн"]
                }
              ].map((job, index) => (
                  <Card key={index} className="border-muted">
                    <CardContent className="flex flex-col p-6">
                      <div className="flex items-start">
                        <Briefcase className="mr-4 mt-1 text-primary" />
                        <div>
                          <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
                          <p className="text-muted-foreground">{job.company} | {job.period}</p>
                          <p className="mt-2">{job.description}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2 text-primary">Полученные навыки:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, skillIndex) => (
                              <span key={skillIndex} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
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

          <section id="projects">
            <h2 className="text-3xl font-bold mb-8 text-primary">Проекты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                  <ProjectDialog key={index} project={project} />
              ))}
            </div>
          </section>

          <section id="contact" className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Свяжитесь со мной</h2>
            <div className="flex justify-center space-x-4 mb-8">
              <Button variant="outline" className="flex items-center border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Mail className="mr-2" size={18} />
                anna@example.com
              </Button>
              <Button variant="outline" className="flex items-center border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Phone className="mr-2" size={18} />
                +7 (999) 123-45-67
              </Button>
            </div>
            <form className="space-y-4">
              <Input placeholder="Ваше имя" className="border-muted" />
              <Input type="email" placeholder="Ваш email" className="border-muted" />
              <Textarea placeholder="Ваше сообщение" className="border-muted" />
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Отправить <Send className="ml-2" size={18} />
              </Button>
            </form>
          </section>
        </main>

        <footer className="bg-secondary text-secondary-foreground py-6 mt-16">
          <div className="container mx-auto px-4 text-center">
            © 2024 Анастасия Дизайнер. Все права защищены.
          </div>
        </footer>
      </div>
  )
}