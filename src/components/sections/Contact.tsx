import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Instagram, Send } from "lucide-react"
import { toast } from 'react-toastify'
import { sendEmail } from '@/actions/sendEmail'
import Link from "next/link";
import * as React from "react";

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
              onClick={() => copyToClipboard('+375447403616', 'Номер телефона')}
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

export default Contact; 