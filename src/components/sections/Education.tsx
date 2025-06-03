import { GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import * as React from "react";

function Education() {
  const educations = [
    {
      degree: "Графический дизайн",
      institution: "Минская государственная гимназия-колледж искусств",
      period: "2021 - 2024",
      description: "Образование в области графического дизайна, позволило мне развить навыки в разработке и дизайне тары и упаковки, создании баннеров и плакатов. Обучение способствовало повышению художественных навыков в рисунке и живописи, а также освоению проектирования и разработки pop-up книг и многого другого."
    },
      {
          degree: "Прикладная информатика в дизайне",
          institution: "СПБГУПТД",
          period: "2024-настоящее время",
          description: "Изучая программу по направлению «Прикладная информатика в дизайне», я поняла, насколько важно сочетание творческих и информационных навыков в современной профессиональной среде. Благодаря этому курсу я развиваю свои способности в области дизайна, а также подтягиваю технические навыки работы с информационными системами и программным обеспечением."
      },
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

export default Education; 