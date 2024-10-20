'use server'

import nodemailer from 'nodemailer'

export async function sendEmail(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.error("SMTP credentials are not set in environment variables");
        return { success: false, message: 'Ошибка конфигурации сервера. Пожалуйста, свяжитесь с администратором.' };
    }

    // Создаем транспорт для отправки email
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true для 465, false для других портов
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        // Отправляем email
        let info = await transporter.sendMail({
            from: `"Портфолио сайт" <${process.env.SMTP_USER}>`,
            to: process.env.RECIPIENT_EMAIL, // Замените на ваш email
            subject: "Новое сообщение с сайта портфолио",
            text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
            html: `<p><strong>Имя:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Сообщение:</strong> ${message}</p>`,
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, message: 'Email успешно отправлен!' };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: 'Произошла ошибка при отправке email.' };
    }
}