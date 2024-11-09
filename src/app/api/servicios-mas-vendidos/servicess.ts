import { query } from '../DB';
import { producto } from '../../../types/product';

// Método para obtener productos con paginación
export async function getProducts(limit: number, offset: number): Promise<{ products: producto[], total: number }> {
  try {
    // Llamada al procedimiento almacenado con paginación
    const result = await query("SELECT * FROM   GetProductoMasVist($1, $2, $3, $4, $5, $6, $7)", ['', 'S',null, null, true, limit, offset]);

    // Obtener el número total de productos para calcular las páginas
    const total  = await query("SELECT * FROM GetProductoCount($1, $2, $3, $4, $5, $6)", [null, 'S',null, null, null, true]);

    return {
      products:result.rows as producto[],
      total: total.rows[0],
    };
  } catch (error) {
    console.error('Error in productService:', error);
    throw new Error('Error calling stored procedure');
  }
}