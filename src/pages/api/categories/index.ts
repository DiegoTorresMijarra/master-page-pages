
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

  switch (method) {
    case 'GET':
      // Obtener todas las categorías
      res.status(200).json(categories);
      break;
    case 'POST':
      // Crear una nueva categoría
      try {
        const newCategory: Category = {
          ...req.body,
          id: categories.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        };
        categories.push(newCategory);
        res.status(201).json(newCategory);
      } catch (error) {
        res.status(400).json({ error: 'Error al crear la categoría' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
