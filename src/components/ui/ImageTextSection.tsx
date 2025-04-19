
import React from 'react';
import { cn } from '@/lib/utils';

interface ImageTextSectionProps {
  image: string;
  title: string;
  text: string | React.ReactNode;
  imageLeft?: boolean;
  className?: string;
}

const ImageTextSection: React.FC<ImageTextSectionProps> = ({
  image,
  title,
  text,
  imageLeft = true,
  className,
}) => {
  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image Container */}
          <div className={cn("order-2", imageLeft ? "md:order-1" : "md:order-2")}>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
              />
            </div>
          </div>
          
          {/* Text Container */}
          <div className={cn("order-1", imageLeft ? "md:order-2" : "md:order-1")}>
            <h2 className="text-3xl font-serif font-bold text-artisan-dark mb-4">
              {title}
            </h2>
            {typeof text === 'string' ? (
              <p className="text-artisan-secondary leading-relaxed">
                {text}
              </p>
            ) : (
              text
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageTextSection;
