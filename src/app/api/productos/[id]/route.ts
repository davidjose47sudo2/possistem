import { NextResponse } from 'next/server';
import { getProduct } from './servicess';
//import { producto } from '@/types/product';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { id: number } }) {
      // Obtener parámetros de paginación desde la URL
      const { id } = params;
    try {

    // Obtener los productos paginados y el total de productos
    const product = await getProduct(id);

    if (!product) {
        return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 }); // Manejo de error si no se encuentra el producto
      }
  
      return NextResponse.json(product); // Devuelve el producto encontrado
    } catch (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 }); // Manejo de errores internos
    }
  }