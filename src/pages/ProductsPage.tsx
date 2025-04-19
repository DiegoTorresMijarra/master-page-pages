
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import { Product, Category } from '@/types/models';
import { cn } from '@/lib/utils';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch products and categories
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      // For now, we'll use dummy data
      const dummyProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Producto Artesanal ${i + 1}`,
        shortDescription: `Breve descripción del producto artesanal ${i + 1}. Este es un ejemplo de texto para mostrar.`,
        description: `Esta es una descripción detallada del producto artesanal ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        price: 19.99 + i * 5,
        imageUrl: `/images/product-${(i % 4) + 1}.jpg`,
        categoryId: (i % 4) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        category: {
          id: (i % 4) + 1,
          name: ['Cerámica', 'Madera', 'Textil', 'Joyería'][(i % 4)],
          description: `Categoría de productos artesanales de ${['Cerámica', 'Madera', 'Textil', 'Joyería'][(i % 4)]}`,
          imageUrl: `/images/category-${(i % 4) + 1}.jpg`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
      }));

      setTimeout(() => {
        setProducts(dummyProducts);
        setIsLoading(false);
      }, 500); // Simulate loading delay
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // In a real app, this would be an API call
      // For now, we'll use dummy data
      const dummyCategories: Category[] = [
        {
          id: 1,
          name: 'Cerámica',
          description: 'Productos artesanales de cerámica',
          imageUrl: '/images/category-1.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
        {
          id: 2,
          name: 'Madera',
          description: 'Productos artesanales de madera',
          imageUrl: '/images/category-2.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
        {
          id: 3,
          name: 'Textil',
          description: 'Productos artesanales textiles',
          imageUrl: '/images/category-3.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
        {
          id: 4,
          name: 'Joyería',
          description: 'Productos artesanales de joyería',
          imageUrl: '/images/category-4.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
      ];

      setCategories(dummyCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === null || product.categoryId === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="relative bg-artisan-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-artisan-dark mb-6 text-center">
            Nuestros Productos
          </h1>
          <p className="text-artisan-secondary text-lg max-w-3xl mx-auto text-center mb-8">
            Descubre nuestra selección de productos artesanales creados con pasión y dedicación.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-artisan-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedCategory === null
                    ? "bg-artisan-primary text-white"
                    : "bg-artisan-light text-artisan-dark hover:bg-artisan-muted"
                )}
                onClick={() => setSelectedCategory(null)}
              >
                Todos
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === category.id
                      ? "bg-artisan-primary text-white"
                      : "bg-artisan-light text-artisan-dark hover:bg-artisan-muted"
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                className="w-full artisan-input pl-10"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-artisan-secondary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-artisan-light">
        <div className="container mx-auto px-4">
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 h-80 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-serif font-semibold text-artisan-dark mb-2">
                No se encontraron productos
              </h3>
              <p className="text-artisan-secondary mb-6">
                No hay productos que coincidan con tu búsqueda. Intenta con otros criterios.
              </p>
              <button
                className="artisan-button"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm('');
                }}
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
