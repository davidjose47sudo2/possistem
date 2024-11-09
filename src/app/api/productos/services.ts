import { query } from '../DB';
import { producto } from '../../../types/product';

// Método para obtener productos con paginación
export async function getProducts( offset: number, idcat: number, idsubcat: number, nombre: string, tipo: string): Promise<{ products: producto[], total: number }> {
  try {
    // Llamada al procedimiento almacenado con paginación
    const result = await query("SELECT * FROM GetProducto($1, $2, $3, $4, $5, $6, $7, $8)", [nombre, tipo, null, idsubcat, idcat, true, 20, offset]);

    // Obtener el número total de productos para calcular las páginas
    const total  = await query("SELECT * FROM GetProductoCount($1, $2, $3, $4, $5, $6)", [nombre, tipo, null, idsubcat, idcat, true]);

    //console.log(total.rows[0])
    return {
      products: result.rows as producto[],
      total: total.rows[0].getproductocount,
    };
  } catch (error) {
    console.error('Error in productService:', error);
    throw new Error('Error calling stored procedure');
  }
}

 


