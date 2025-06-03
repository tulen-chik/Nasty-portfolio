import Image from "next/image"
import { MapPin } from "lucide-react"
import * as React from "react";

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

export default About; 