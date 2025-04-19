
import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/models';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="artisan-card overflow-hidden h-full flex flex-col">
        <div className="relative overflow-hidden h-52">
          <img
            src={product.imageUrl || '/images/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.category && (
            <span className="absolute top-2 right-2 bg-artisan-primary text-white text-xs px-2 py-1 rounded-full">
              {product.category.name}
            </span>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-serif text-lg font-semibold text-artisan-dark group-hover:text-artisan-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-artisan-secondary text-sm line-clamp-2 mt-1 flex-grow">
            {product.shortDescription}
          </p>
          <div className="mt-3 flex justify-between items-center">
            <span className="font-semibold text-artisan-primary">
              {product.price?.toFixed(2)}€
            </span>
            <span className="text-xs text-artisan-secondary">
              Ver detalles →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
