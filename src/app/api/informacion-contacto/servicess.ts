import { query } from '../DB'; 
import { contacto } from '@/types/infoContac';

// Método para obtener productos
export async function gets(): Promise<contacto> {
    try {
      const result = await query("SELECT * FROM   GetInformacionEmpresa()", []);
      return result.rows[0] as contacto;
    } catch (error) {
      console.error('Error in marcaService:', error);
      throw new Error('Error calling stored procedure');
    }
  }