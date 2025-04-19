
import React from 'react';
import Layout from '@/components/layout/Layout';
import Gallery from '@/components/ui/Gallery';
import ImageTextSection from '@/components/ui/ImageTextSection';
import Link from 'next/link';

const Home: React.FC = () => {
  // Demo images for the gallery
  const galleryImages = [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-artisan-light py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-artisan-dark mb-6">
            Soluciones digitales para artesanos y comercios
          </h1>
          <p className="text-artisan-secondary text-lg md:text-xl max-w-3xl mb-8">
            Impulsa tu negocio con una presencia online profesional, diseñada específicamente para valorar y mostrar tus productos artesanales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/ProductsPage"
              className="px-6 py-3 bg-artisan-primary text-white rounded-md hover:bg-artisan-secondary transition-colors font-medium"
            >
              Ver Productos
            </Link>
            <Link
              href="/Contact"
              className="px-6 py-3 bg-white text-artisan-primary border border-artisan-primary rounded-md hover:bg-artisan-light transition-colors font-medium"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-artisan-dark text-center mb-10">
            Nuestros trabajos destacados
          </h2>
          <Gallery images={galleryImages} className="h-96" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-artisan-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-artisan-dark text-center mb-10">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="📱"
              title="Diseño Responsive"
              description="Nuestras aplicaciones se adaptan perfectamente a cualquier dispositivo, desde móviles hasta ordenadores de escritorio."
            />
            <FeatureCard
              icon="🛒"
              title="Catálogo de Productos"
              description="Muestra tus productos con estilo, permitiendo a tus clientes explorar fácilmente tu catálogo completo."
            />
            <FeatureCard
              icon="🔒"
              title="Seguridad Integrada"
              description="Protección avanzada para tu sitio con medidas como reCAPTCHA para prevenir spam y abusos."
            />
          </div>
        </div>
      </section>

      {/* Image & Text Sections */}
      <ImageTextSection
        image="/images/about-preview.jpg"
        title="Artesanía con pasión"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui."
        imageLeft={true}
      />

      <ImageTextSection
        image="/images/contact-preview.jpg"
        title="Estamos para ayudarte"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."
        imageLeft={false}
        className="bg-white"
      />

      {/* CTA Section */}
      <section className="py-16 bg-artisan-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            ¿Listo para impulsar tu negocio?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Contáctanos hoy mismo y descubre cómo podemos ayudarte a crear una presencia online que resalte la calidad de tus productos artesanales.
          </p>
          <Link
            href="/Contact"
            className="px-8 py-3 bg-white text-artisan-primary rounded-md hover:bg-artisan-light transition-colors font-medium inline-block"
          >
            Solicita información
          </Link>
        </div>
      </section>
    </Layout>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-serif font-semibold text-artisan-dark mb-2">{title}</h3>
      <p className="text-artisan-secondary">{description}</p>
    </div>
  );
};

export default Home;
