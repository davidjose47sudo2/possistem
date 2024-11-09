import { query } from '../DB'; 
import { cliente } from '@/types/clientes';

// Método para obtener productos
export async function GetClientesFidelizados(cliente: string): Promise<cliente[]> {
    try {
      const result = await query("SELECT * FROM   GetClientesFidelizados($1)", [cliente]);
      return result.rows as cliente[];
    } catch (error) {
      console.error('Error in marcaService:', error);
      throw new Error('Error calling stored procedure');
    }
  }