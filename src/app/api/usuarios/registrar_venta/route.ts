import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../DB';

export async function POST(req: NextRequest) {
  try {
    const { id_usuario, total, detalles } = await req.json();

    // Llama al procedimiento para registrar una venta
    const result = await query("SELECT registrar_venta($1, $2)", [id_usuario, total]);
    const id_venta = result.rows[0].registrar_venta;

    // Agregar detalles de venta para cada producto
    for (const detalle of detalles) {
      const { id_producto, cantidad, precio_unitario } = detalle;
      await query("SELECT agregar_detalle_venta($1, $2, $3, $4)", [id_venta, id_producto, cantidad, precio_unitario]);
    }

    return NextResponse.json({ message: 'Venta registrada exitosamente', id_venta }, { status: 201 });
  } catch (error) {
    console.error('Error al registrar venta:', error);
    return NextResponse.json({ message: 'Error al registrar venta', error: error }, { status: 500 });
  }
}
