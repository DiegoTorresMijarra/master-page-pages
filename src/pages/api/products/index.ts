
import { Product } from '@/types/models';
import { NextApiRequest, NextApiResponse } from 'next';

// Simulación de base de datos en memoria
const products: Product[] = Array.from({ length: 12 }, (_, i) => {
  const categoryId = (i % 4) + 1;
  const categoryName = ['Cerámica', 'Madera', 'Textil', 'Joyería'][categoryId - 1];
  
  return {
    id: i + 1,
    name: `Producto Artesanal ${i + 1}`,
    shortDescription: `Breve descripción del producto artesanal ${i + 1}`,
    description: `Esta es una descripción detallada del producto artesanal ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    price: 19.99 + i * 5,
    imageUrl: `/images/product-${(i % 4) + 1}.jpg`,
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
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  
  // Procesamiento de consultas para filtrar productos
  let filteredProducts = [...products];
  
  // Filtrar por categoría
  if (query.categoryId) {
    const categoryId = parseInt(query.categoryId as string);
    filteredProducts = filteredProducts.filter(p => p.categoryId === categoryId);
  }
  
  // Filtrar por término de búsqueda
  if (query.search) {
    const searchTerm = (query.search as string).toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.shortDescription.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filtrar eliminados
  if (query.includeDeleted !== 'true') {
    filteredProducts = filteredProducts.filter(p => p.deletedAt === null);
  }

  switch (method) {
    case 'GET':
      // Obtener todos los productos (con posibles filtros)
      res.status(200).json(filteredProducts);
      break;
    case 'POST':
      // Crear un nuevo producto
      try {
        const newProduct: Product = {
          ...req.body,
          id: products.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        };
        products.push(newProduct);
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(400).json({ error: 'Error al crear el producto' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
