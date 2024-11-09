import { NextResponse } from 'next/server';
import { sendNotifications } from './services';
//import { clienteData } from '@/types/clientes';  

export async function POST(request: Request) {
  try {
    // Obtener el cuerpo de la solicitud
    const body = await request.json();

    // Asegúrate de que el clienteData y idProducto estén presentes en el cuerpo
    const { clienteData, idProducto } = body;

    // Llamar al servicio para enviar notificaciones
    const result = await sendNotifications(clienteData, idProducto);

    // Retornar el resultado en formato JSON con código 200
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    
    // Enviar un error con el código 500 si algo falla
    return NextResponse.json({ message: 'Error processing request', error: error }, { status: 500 });
  }
}


