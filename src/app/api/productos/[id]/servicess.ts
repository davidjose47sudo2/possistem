import { query } from '../../DB';
import { Detalleproducto} from '../../../../types/product';

// Método para obtener productos con paginación
export async function getProduct(id: number): Promise<Detalleproducto> {
  try {
    // Llamada al procedimiento almacenado con paginación
    const result = await query("SELECT * FROM GetDetalleProducto($1)", [id]);
            
    return result.rows[0];
  } catch (error) {
    console.error('Error in productService:', error);
    throw new Error('Error calling stored procedure');
  }
}