import { query } from '../DB'; 
import { marca } from '@/types/marcas';

// Método para obtener productos
export async function getMarcasAliadas(marca: string): Promise<marca[]> {
    try {
      const result = await query("SELECT * FROM   GetMarcasAliadas($1)", [marca]);
      return result.rows as marca[];
    } catch (error) {
      console.error('Error in marcaService:', error);
      throw new Error('Error calling stored procedure');
    }
  }