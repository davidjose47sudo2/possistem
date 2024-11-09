import { NextResponse } from 'next/server';
import { GetClientesFidelizados } from './servicess';
import { cliente } from '@/types/clientes'; 



export async function GET() {
  try {
    // Llamar al servicio para obtener los clientes fidelizados
    const result: cliente[] = await GetClientesFidelizados('');

    // Retornar el resultado en formato JSON con código 200
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    
    // Enviar un error con el código 500 si algo falla
    return NextResponse.json({ message: 'Error processing request', error: error }, { status: 500 });
  }
}

export async function POST() {
  // Método no permitido
  return NextResponse.json({ message: 'Invalid Method' }, { status: 403 });
}
