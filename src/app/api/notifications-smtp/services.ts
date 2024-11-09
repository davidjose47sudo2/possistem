import { query } from '../DB';
import { clienteData } from '@/types/clientes';
import { producto } from '@/types/product';

// Método para envio de correo 
export async function sendNotifications(clienteData: clienteData, idProducto: number): Promise<{ message: string }> {

  const url = process.env.URL_SMTP_NOTIFICATIONS;
  const mail = process.env.MAIL_VENTAS;

  // Validar variables de entorno necesarias
  if (!url || !mail) {
    console.error("URL_SMTP_NOTIFICATIONS o MAIL_VENTAS no están definidos en las variables de entorno.");
    throw new Error("Variables de entorno faltantes para la notificación por correo.");
  }

  try {
    // Información del producto
    const result = await query("SELECT * FROM GetDetalleProducto($1)", [idProducto]);
    const producto: producto = result.rows[0];

    // Validar que el producto tenga la información necesaria
    if (!producto || !producto.id || !producto.nombre) {
      throw new Error("El producto no se encontró en la base de datos o tiene datos incompletos.");
    }

    // Enviar mensaje para el área de ventas
    const responseVentas = await fetch(`${url}/users/smtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: mail,
        subject: 'Nueva Solicitud de Cliente',
        message: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud de Cliente</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #d9534f;
            font-size: 24px;
        }
        p {
            line-height: 1.6;
            margin: 10px 0;
        }
        .highlight {
            font-weight: bold;
        }
        .client-info, .product-info {
            margin: 15px 0;
            padding: 10px;
            background-color: #f5f5f5;
            border-left: 4px solid #d9534f;
        }
        .product-info {
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Estimado equipo de ventas,</h1>
        <p>Han recibido una nueva solicitud de cliente. A continuación, los detalles de la misma:</p>

        <div class="client-info">
            <p><span class="highlight">Nombre del Cliente:</span> ${clienteData.nombre} ${clienteData.apellido}</p>
            <p><span class="highlight">Correo Electrónico:</span> ${clienteData.correo}</p>
            <p><span class="highlight">Teléfono de Contacto:</span> ${clienteData.telefono}</p>
            <p><span class="highlight">Mensaje del Cliente:</span> ${clienteData.message}</p>
        </div>

        <div class="product-info">
            <p><span class="highlight">Producto de Interés:</span></p>
            <p><span class="highlight">ID:</span> ${producto.id}</p>
            <p><span class="highlight">Nombre:</span> ${producto.nombre}</p>
            <p><span class="highlight">Precio:</span> ${producto.precio}</p>
            <p><span class="highlight">Marca:</span> ${producto.marca}</p>
        </div>

        <p>Por favor, procedan a contactarse con el cliente lo antes posible para continuar con el proceso de compra.</p>
        <p>Saludos cordiales,</p>
        <p><strong>Solfic.sas</strong></p>

        <div class="footer">
            <p>Este mensaje es generado automáticamente. No responda a este correo.</p>
        </div>
    </div>
</body>
</html>`
      }),
    });

    if (!responseVentas.ok) {
      console.error("Error al enviar el correo a ventas:", await responseVentas.text());
      throw new Error("Error al enviar el correo a ventas.");
    }

    // Enviar mensaje para el cliente
    const responseCliente = await fetch(`${url}/users/smtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: clienteData.correo,
        subject: 'Confirmación de Solicitud de Producto',
        message: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mensaje al Cliente</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #4CAF50;
            font-size: 24px;
        }
        p {
            line-height: 1.6;
            margin: 10px 0;
        }
        .highlight {
            font-weight: bold;
        }
        .product-info {
            margin: 15px 0;
            padding: 10px;
            background-color: #e9f5e9;
            border-left: 4px solid #4CAF50;
        }
        .footer {
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Estimado cliente,</h1>
        <p>Nos complace informarle que su solicitud ha sido recibida con éxito.</p>
        <p>En los próximos minutos, un asesor se pondrá en contacto con usted para atender sus necesidades.</p>

        <div class="product-info">
            <p><span class="highlight">Producto de interés:</span></p>
            <p><span class="highlight">Nombre:</span> ${producto.nombre}</p>
            <p><span class="highlight">Precio:</span> ${producto.precio}</p>
            <p><span class="highlight">Marca:</span> ${producto.marca}</p>
        </div>

        <p>Agradecemos su preferencia y quedamos a su disposición para cualquier consulta adicional.</p>
        <p>Saludos cordiales,</p>
        <p><strong>Solfic.sas</strong></p>
        <p>${mail}</p>

        <div class="footer">
            <p>Este es un mensaje generado automáticamente. No responda a este correo.</p>
        </div>
    </div>
</body>
</html>
`
      }),
    });

    if (!responseCliente.ok) {
      console.error("Error al enviar el correo al cliente:", await responseCliente.text());
      throw new Error("Error al enviar el correo al cliente.");
    }

    // Llamada al procedimiento almacenado para gestionar la información del cliente
    try {
      await query("SELECT sp_gestionar_clientes($1, $2, $3, $4, $5, $6, $7)", ['I', null, clienteData.nombre, clienteData.apellido, clienteData.correo, clienteData.telefono, true]);
    } catch (dbError) {
      console.error("Error al ejecutar el procedimiento almacenado:", dbError);
      throw new Error("Error al gestionar información del cliente en la base de datos.");
    }

    return { message: 'mensaje enviado' };
  } catch (error) {
    console.error('Error en sendNotifications:', error);
    throw new Error('Error al procesar la solicitud de notificación.');
  }
}
