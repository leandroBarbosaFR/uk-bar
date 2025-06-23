import React, {useState} from 'react'
import {MailCheck} from 'lucide-react'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to send email')
      }

      setSubmitSuccess(true)
      setFormData({name: '', email: '', subject: '', message: ''})
    } catch (error) {
      setSubmitError('Something went wrong. Please try again later.')
      console.error('Failed to fetch:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4 flex justify-center">
          <MailCheck color={'#f1f0e7'} />
        </div>
        <h3 className="text-2xl font-medium text-white">Thank you for your message!</h3>
        <p className="mt-2 text-white">We will get back to you as soon as possible.</p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="mt-6 px-6 py-2 bg-[#f1f0e7] text-[#33483e] rounded-md "
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {['name', 'email', 'subject'].map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium text-[#f1f0e7] capitalize">
            {field}
          </label>
          <input
            type={field === 'email' ? 'email' : 'text'}
            id={field}
            name={field}
            value={formData[field as keyof FormData]}
            onChange={handleChange}
            required
            className="mt-1 text-[#33483e] block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none "
          />
        </div>
      ))}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#f1f0e7]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full text-[#33483e] border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none "
        />
      </div>

      {submitError && <div className="text-red-600 text-sm">{submitError}</div>}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#f1f0e7] text-[#33483e] py-3 px-4 rounded-md hover:bg-[#f4f1d9ef] focus:outline-none focus:ring-2  transition disabled:opacity-75"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
