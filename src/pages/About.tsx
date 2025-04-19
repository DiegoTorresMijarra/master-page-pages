
import React from 'react';
import Layout from '@/components/layout/Layout';
import ImageTextSection from '@/components/ui/ImageTextSection';

const About: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-artisan-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-artisan-dark mb-6 text-center">
            Quiénes Somos
          </h1>
          <p className="text-artisan-secondary text-lg md:text-xl max-w-3xl mx-auto text-center mb-8">
            Conoce nuestra historia, valores y la pasión que nos impulsa a apoyar a artesanos y pequeños comercios.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <ImageTextSection
        image="/images/our-story.jpg"
        title="Nuestra Historia"
        text={
          <div className="space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        }
        imageLeft={true}
      />

      {/* Our Mission Section */}
      <ImageTextSection
        image="/images/our-mission.jpg"
        title="Nuestra Misión"
        text={
          <div className="space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        }
        imageLeft={false}
        className="bg-white"
      />

      {/* Team Section */}
      <section className="py-16 bg-artisan-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-artisan-dark text-center mb-10">
            Nuestro Equipo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TeamMember
              name="María López"
              role="Fundadora & Directora"
              image="/images/team-1.jpg"
              bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore."
            />
            <TeamMember
              name="Carlos Gómez"
              role="Desarrollador Principal"
              image="/images/team-2.jpg"
              bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore."
            />
            <TeamMember
              name="Elena Martínez"
              role="Diseñadora UX/UI"
              image="/images/team-3.jpg"
              bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore."
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-artisan-dark text-center mb-10">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon="🤝"
              title="Colaboración"
              description="Trabajamos estrechamente con nuestros clientes para entender sus necesidades específicas."
            />
            <ValueCard
              icon="✨"
              title="Calidad"
              description="Nos comprometemos a ofrecer soluciones digitales de la más alta calidad."
            />
            <ValueCard
              icon="🚀"
              title="Innovación"
              description="Buscamos constantemente nuevas formas de mejorar y optimizar nuestros servicios."
            />
            <ValueCard
              icon="♻️"
              title="Sostenibilidad"
              description="Promovemos prácticas sostenibles en todos nuestros desarrollos y operaciones."
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, bio }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-serif font-semibold text-artisan-dark mb-1">{name}</h3>
      <p className="text-artisan-primary font-medium mb-3">{role}</p>
      <p className="text-artisan-secondary">{bio}</p>
    </div>
  );
};

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-artisan-light p-6 rounded-lg hover:shadow-md transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-serif font-semibold text-artisan-dark mb-2">{title}</h3>
      <p className="text-artisan-secondary">{description}</p>
    </div>
  );
};

export default About;
