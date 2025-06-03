import { useState } from "react"
import { Menu, X } from "lucide-react"
import * as React from "react"
import Link from "next/link"

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

export default Header; 