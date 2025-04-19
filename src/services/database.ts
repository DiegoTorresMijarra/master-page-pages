
import mariadb from 'mariadb';

// Creamos un pool de conexiones para MariaDB
let pool: mariadb.Pool | null = null;

const initPool = () => {
  if (!pool) {
    pool = mariadb.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'artisan_web_corner',
      connectionLimit: 5,
    });
  }
  return pool;
};

export const executeQuery = async <T>(query: string, params?: any[]): Promise<T> => {
  const pool = initPool();
  let conn;
  
  try {
    conn = await pool.getConnection();
    const result = await conn.query(query, params);
    return result as T;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

// Esquema SQL para la creación de tablas
export const dbSchema = `
-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  imageUrl VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  shortDescription VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  imageUrl VARCHAR(255),
  categoryId INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL,
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);

-- Tabla de contactos
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// Inicializar la base de datos
export const initDatabase = async () => {
  try {
    await executeQuery(dbSchema);
    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
};
