import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from './services';
//import { producto } from '@/types/product';

export const dynamic = 'force-dynamic';



export async function GET(req: NextRequest) {
  try {
    // Obtener parámetros de paginación desde la URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');  // Página actual  
    const idcat = parseInt(searchParams.get('idCat') || '0');  // Id categoria 
    const idsubcat = parseInt(searchParams.get('idSubcat') || '0');  // Id subcategoria 
    const nombre = searchParams.get('nombre') || '';  // Página actual 
    const tipo = searchParams.get('tipo') || '';  // Página actual 

    // Calcular el offset en función de la página y el tamaño
    const offset = (page - 1) * 20;

    // Obtener los productos paginados y el total de productos
    const { products, total } = await getProducts(offset, idcat,idsubcat,nombre,tipo);

    // Calcular el número de páginas totales
    const totalPages = Math.ceil(total / 20);
    //console.log(total.getproductocount);

    // Devolver productos, total de productos y número de páginas
    return NextResponse.json({
      products,
      totalProducts: total,
      totalPages: totalPages,
      currentPage: page,
      pageSize: 20
    }, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'Error processing request', error: error }, { status: 500 });
  }
}


