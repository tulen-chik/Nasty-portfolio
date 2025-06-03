import { Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import * as React from "react";

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

export default Experience; 