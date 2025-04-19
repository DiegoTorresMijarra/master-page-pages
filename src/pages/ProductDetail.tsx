
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Gallery from '@/components/ui/Gallery';
import { Product } from '@/types/models';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch product and related products
    if (id) {
      fetchProduct(parseInt(id));
      fetchRelatedProducts(parseInt(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      // For now, we'll use dummy data
      const categoryId = (productId % 4) + 1;
      const categoryName = ['Cerámica', 'Madera', 'Textil', 'Joyería'][categoryId - 1];

      const dummyProduct: Product = {
        id: productId,
        name: `Producto Artesanal ${productId}`,
        shortDescription: `Breve descripción del producto artesanal ${productId}`,
        description: `<p>Esta es una descripción detallada del producto artesanal ${productId}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
        price: 19.99 + productId * 5,
        imageUrl: `/images/product-${(productId % 4) + 1}.jpg`,
        categoryId: categoryId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        category: {
          id: categoryId,
          name: categoryName,
          description: `Categoría de productos artesanales de ${categoryName}`,
          imageUrl: `/images/category-${categoryId}.jpg`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
      };

      setTimeout(() => {
        setProduct(dummyProduct);
        setIsLoading(false);
      }, 500); // Simulate loading delay
    } catch (error) {
      console.error('Error fetching product:', error);
      setIsLoading(false);
    }
  };

  const fetchRelatedProducts = async (productId: number) => {
    try {
      // In a real app, this would be an API call to get related products
      // For now, we'll generate a few dummy products
      const categoryId = (productId % 4) + 1;
      const dummyRelatedProducts: Product[] = Array.from({ length: 4 }, (_, i) => {
        const relatedId = (productId + i + 1) % 12 || 12; // Avoid 0 and generate different IDs
        return {
          id: relatedId,
          name: `Producto Artesanal ${relatedId}`,
          shortDescription: `Breve descripción del producto artesanal ${relatedId}`,
          description: `Descripción detallada del producto artesanal ${relatedId}`,
          price: 19.99 + relatedId * 2.5,
          imageUrl: `/images/product-${(relatedId % 4) + 1}.jpg`,
          categoryId: categoryId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        };
      });

      setRelatedProducts(dummyRelatedProducts);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  // Multiple images for gallery
  const productImages = product
    ? [
        product.imageUrl,
        `/images/product-detail-${(product.id % 4) + 1}-2.jpg`,
        `/images/product-detail-${(product.id % 4) + 1}-3.jpg`,
      ]
    : [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          // Loading skeleton
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-200 h-96 rounded-md"></div>
                <div>
                  <div className="bg-gray-200 h-8 rounded w-3/4 mb-4"></div>
                  <div className="bg-gray-200 h-6 rounded w-1/4 mb-6"></div>
                  <div className="bg-gray-200 h-4 rounded w-full mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-full mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4 mb-6"></div>
                  <div className="bg-gray-200 h-10 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        ) : product ? (
          <>
            {/* Breadcrumbs */}
            <nav className="mb-6 text-artisan-secondary">
              <ol className="flex flex-wrap items-center">
                <li>
                  <Link to="/" className="hover:text-artisan-primary">
                    Inicio
                  </Link>
                </li>
                <li className="mx-2">/</li>
                <li>
                  <Link to="/products" className="hover:text-artisan-primary">
                    Productos
                  </Link>
                </li>
                <li className="mx-2">/</li>
                <li>
                  <Link
                    to={`/products?category=${product.categoryId}`}
                    className="hover:text-artisan-primary"
                  >
                    {product.category?.name}
                  </Link>
                </li>
                <li className="mx-2">/</li>
                <li className="font-medium text-artisan-dark">{product.name}</li>
              </ol>
            </nav>

            {/* Product Detail */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Gallery */}
                <div>
                  <Gallery images={productImages} className="h-96" />
                </div>

                {/* Product Info */}
                <div>
                  <h1 className="text-3xl font-serif font-bold text-artisan-dark mb-2">
                    {product.name}
                  </h1>
                  {product.category && (
                    <Link
                      to={`/products?category=${product.categoryId}`}
                      className="inline-block bg-artisan-light text-artisan-primary px-3 py-1 rounded-full text-sm font-medium mb-4 hover:bg-artisan-muted transition-colors"
                    >
                      {product.category.name}
                    </Link>
                  )}
                  <p className="text-lg text-artisan-secondary mb-6">
                    {product.shortDescription}
                  </p>
                  <p className="text-2xl font-bold text-artisan-primary mb-6">
                    {product.price.toFixed(2)}€
                  </p>
                  <button className="artisan-button flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                    Solicitar información
                  </button>
                </div>
              </div>

              {/* Product Description */}
              <div className="mt-12">
                <h2 className="text-2xl font-serif font-bold text-artisan-dark mb-4">
                  Descripción
                </h2>
                <div
                  className="prose max-w-none text-artisan-secondary"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-artisan-dark mb-6">
                  Productos relacionados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <div
                      key={relatedProduct.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Link to={`/products/${relatedProduct.id}`}>
                        <img
                          src={relatedProduct.imageUrl}
                          alt={relatedProduct.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-serif text-lg font-semibold text-artisan-dark hover:text-artisan-primary transition-colors">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-artisan-primary font-semibold mt-2">
                            {relatedProduct.price.toFixed(2)}€
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif font-bold text-artisan-dark mb-4">
              Producto no encontrado
            </h2>
            <p className="text-artisan-secondary mb-6">
              Lo sentimos, el producto que estás buscando no existe o ha sido eliminado.
            </p>
            <Link to="/products" className="artisan-button inline-block">
              Ver todos los productos
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
