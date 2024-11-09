import {NextResponse } from 'next/server';
import { getOfertas } from './servicess';
import { oferta } from '@/types/ofertas'; 


export async function GET() {
  try {
    const fechaActual = new Date().toISOString().split('T')[0];
    // Obtener ofertas
    const result: oferta[] = await getOfertas(fechaActual);

    // Retornar la respuesta como JSON
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'Error processing request', error: error }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ message: 'Invalid Method' }, { status: 403 });
}