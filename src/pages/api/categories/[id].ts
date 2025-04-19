
import { Category } from '@/types/models';
import { NextApiRequest, NextApiResponse } from 'next';

// Simulación de base de datos en memoria
const categories: Category[] = [
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query || {};
  const categoryId = parseInt(id as string);

  // Encontrar la categoría
  const categoryIndex = categories.findIndex(c => c.id === categoryId);
  
  if (categoryIndex === -1) {
    return res.status(404).json({ error: 'Categoría no encontrada' });
  }

  switch (method) {
    case 'GET':
      // Obtener una categoría por ID
      res.status(200).json(categories[categoryIndex]);
      break;
    case 'PUT':
      // Actualizar una categoría
      try {
        const updatedCategory = {
          ...categories[categoryIndex],
          ...req.body,
          id: categoryId,
          updatedAt: new Date().toISOString(),
        };
        categories[categoryIndex] = updatedCategory;
        res.status(200).json(updatedCategory);
      } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la categoría' });
      }
      break;
    case 'DELETE':
      // Soft delete (marcar como eliminado)
      try {
        categories[categoryIndex] = {
          ...categories[categoryIndex],
          deletedAt: new Date().toISOString(),
        };
        res.status(200).json({ message: 'Categoría eliminada correctamente' });
      } catch (error) {
        res.status(400).json({ error: 'Error al eliminar la categoría' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
