import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const {name, email, subject, message} = await req.json()

  if (!email || !message || !name || !subject) {
    return NextResponse.json({error: 'Missing fields'}, {status: 400})
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `Message de ${name}: ${subject}`,
    text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({success: true})
  } catch (err) {
    console.error('❌ Erreur envoi email:', err)
    return NextResponse.json({success: false, error: 'Erreur serveur'}, {status: 500})
  }
}
