import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from './servicess';
//import { producto } from '@/types/product';

export const dynamic = 'force-dynamic';


export async function GET(req: NextRequest) {
  try {
    // Obtener parámetros de paginación desde la URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');  // Página actual
    const pageSize = parseInt(searchParams.get('pageSize') || '8');  // Tamaño por página

    // Calcular el offset en función de la página y el tamaño
    const offset = (page - 1) * pageSize;

    // Obtener los productos paginados y el total de productos
    const { products, total } = await getProducts(pageSize, offset);

    // Calcular el número de páginas totales
    const totalPages = Math.ceil(total / pageSize);

    // Devolver productos, total de productos y número de páginas
    return NextResponse.json({
      products,
      totalProducts: total,
      totalPages: totalPages,
      currentPage: page,
      pageSize: pageSize
    }, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'Error processing request', error: error }, { status: 500 });
  }
}