import { query } from '../DB'; 
import { oferta } from '@/types/ofertas';

// Método para obtener ofertas
export async function getOfertas(fecha:string): Promise<oferta[]> {
    try {
      const result = await query("SELECT * FROM  GetOfertas($1, $2)", [null,fecha]);
      return result.rows as oferta[];
    } catch (error) {
      console.error('Error in ofertaService:', error);
      throw new Error('Error calling stored procedure');
    }
  }