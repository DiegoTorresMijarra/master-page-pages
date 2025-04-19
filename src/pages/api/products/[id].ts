
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
  const { method } = req;
  const { id } = req.query || {};
  const productId = parseInt(id as string);

  // Encontrar el producto
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  switch (method) {
    case 'GET':
      // Obtener un producto por ID
      res.status(200).json(products[productIndex]);
      break;
    case 'PUT':
      // Actualizar un producto
      try {
        const updatedProduct = {
          ...products[productIndex],
          ...req.body,
          id: productId,
          updatedAt: new Date().toISOString(),
        };
        products[productIndex] = updatedProduct;
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el producto' });
      }
      break;
    case 'DELETE':
      // Soft delete (marcar como eliminado)
      try {
        products[productIndex] = {
          ...products[productIndex],
          deletedAt: new Date().toISOString(),
        };
        res.status(200).json({ message: 'Producto eliminado correctamente' });
      } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el producto' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
