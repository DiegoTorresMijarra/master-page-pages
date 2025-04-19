
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-8xl font-serif font-bold text-artisan-primary mb-6">404</h1>
          <h2 className="text-3xl font-serif font-bold text-artisan-dark mb-4">Página no encontrada</h2>
          <p className="text-lg text-artisan-secondary mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Link
            to="/"
            className="artisan-button inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
