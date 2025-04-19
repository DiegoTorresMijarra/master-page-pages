import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout/Layout';
import { ContactForm } from '@/types/models';

declare global {
  interface Window {
    showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  }
}

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (data: ContactForm) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      // In a real app, this would be an API call to submit the form
      // For now, we'll simulate it
      console.log('Form data:', data);

      // Simulate reCAPTCHA verification
      data.recaptchaToken = 'dummy-token';

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitSuccess(true);
      reset();
      
      // Show success toast
      if (window.showToast) {
        window.showToast('Mensaje enviado correctamente. Gracias por contactar con nosotros.', 'success');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo.');
      
      // Show error toast
      if (window.showToast) {
        window.showToast('Error al enviar el formulario. Por favor, inténtalo de nuevo.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="relative bg-artisan-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-artisan-dark mb-6 text-center">
            Contacto
          </h1>
          <p className="text-artisan-secondary text-lg max-w-3xl mx-auto text-center mb-8">
            ¿Tienes alguna pregunta o quieres más información sobre nuestros productos? Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-artisan-dark mb-6">
                Envíanos un mensaje
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-artisan-dark font-medium mb-1">
                      Nombre
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className={`artisan-input w-full ${errors.firstName ? 'border-red-500' : ''}`}
                      placeholder="Tu nombre"
                      {...register('firstName', { required: 'El nombre es obligatorio' })}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-red-500 text-sm">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-artisan-dark font-medium mb-1">
                      Apellidos
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className={`artisan-input w-full ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder="Tus apellidos"
                      {...register('lastName', { required: 'Los apellidos son obligatorios' })}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-red-500 text-sm">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-artisan-dark font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`artisan-input w-full ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="tu.email@ejemplo.com"
                    {...register('email', {
                      required: 'El email es obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-artisan-dark font-medium mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`artisan-input w-full ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Escribe tu mensaje aquí..."
                    {...register('message', { required: 'El mensaje es obligatorio' })}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="artisan-button w-full py-3 flex justify-center items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </button>
                </div>
                
                {/* Form Error */}
                {submitError && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-md">
                    {submitError}
                  </div>
                )}
                
                {/* Google reCAPTCHA Note */}
                <div className="text-xs text-artisan-secondary text-center">
                  Este sitio está protegido por Google reCAPTCHA.
                  <br />
                  Al enviar este formulario, aceptas los Términos de Servicio y la Política de Privacidad.
                </div>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-artisan-dark mb-6">
                Información de contacto
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-artisan-light p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-artisan-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-artisan-dark mb-1">Dirección</h3>
                    <p className="text-artisan-secondary">
                      Calle Artesanos, 123<br />
                      Ciudad Creativa, 28001<br />
                      España
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-artisan-light p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-artisan-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-artisan-dark mb-1">Email</h3>
                    <p className="text-artisan-secondary">
                      <a href="mailto:info@artisanwebcorner.com" className="hover:text-artisan-primary">
                        info@artisanwebcorner.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-artisan-light p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-artisan-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-artisan-dark mb-1">Teléfono</h3>
                    <p className="text-artisan-secondary">
                      <a href="tel:+34123456789" className="hover:text-artisan-primary">
                        +34 123 456 789
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-artisan-light p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-artisan-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-artisan-dark mb-1">Horario</h3>
                    <p className="text-artisan-secondary">
                      Lunes - Viernes: 9:00 - 18:00<br />
                      Sábado: 10:00 - 14:00<br />
                      Domingo: Cerrado
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map or Image */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-md">
                <img
                  src="/images/map.jpg"
                  alt="Ubicación en el mapa"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-artisan-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-artisan-dark mb-6 text-center">
            Preguntas Frecuentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <FAQItem
              question="¿Cuál es el tiempo de respuesta para consultas?"
              answer="Nos esforzamos por responder a todas las consultas en un plazo máximo de 24 horas laborables."
            />
            <FAQItem
              question="¿Realizan envíos internacionales?"
              answer="Sí, realizamos envíos a nivel internacional. El coste y tiempo de entrega dependerá del país de destino."
            />
            <FAQItem
              question="¿Puedo solicitar productos personalizados?"
              answer="Absolutamente. Muchos de nuestros artesanos están encantados de crear productos personalizados. Contacta con nosotros para más detalles."
            />
            <FAQItem
              question="¿Cuál es la política de devoluciones?"
              answer="Aceptamos devoluciones dentro de los 14 días posteriores a la recepción del producto, siempre que esté en su estado original."
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-serif font-semibold text-artisan-dark mb-2">
        {question}
      </h3>
      <p className="text-artisan-secondary">
        {answer}
      </p>
    </div>
  );
};

export default Contact;
