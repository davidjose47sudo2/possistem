import { query } from '../DB';
import { cat, categorias, Subcategoria } from '../../../types/Categorias';

// Método para obtener categorías
export async function getCategorias(): Promise<categorias[]> {
  try {
    // Llamada al procedimiento almacenado
    const result = await query("SELECT * FROM GetCategoria($1, $2, $3)", [null, null, true]);
    const rows = result.rows;

    //console.log('Resultados de la consulta:', rows); // Ver los resultados

    // Usar un mapa para almacenar las categorías
    const categoriasMap = new Map<number, categorias>();

    // Procesar las filas
    rows.forEach((row: cat) => {
      //console.log('Fila procesada:', row); // Ver cada fila procesada

      const categoriaId = row.categoriaid; // Asegúrate de que se accede correctamente

      // Validar que categoriaId no sea undefined o null
      if (categoriaId !== undefined && categoriaId !== null) {
        // Verificar si la categoría ya está en el mapa
        if (!categoriasMap.has(categoriaId)) {
          // Crear nueva categoría y agregarla al mapa
          const nuevaCategoria: categorias = {
            id: categoriaId,
            nombre: row.categorianombre, // Asegúrate de acceder correctamente
            descripcion: row.categoriadescripcion, // Asegúrate de acceder correctamente
            estado: row.categoriaestado, // Convertir a boolean
            fecha_log: row.categoriafechalog,
            Subcategorias: [] // Iniciar lista vacía de subcategorías
          };
          categoriasMap.set(categoriaId, nuevaCategoria);
        }

        // Si hay una subcategoría, la agregamos a la categoría correspondiente
        if (row.subcategoriaid) {
          const subcategoria: Subcategoria = {
            id: row.subcategoriaid,
            nombre: row.subcategorianombre!,
            descripcion: '', // Puedes modificar esto si tienes un campo correspondiente
            estado: row.subcategoriaestado!, // Convertir a boolean
            fecha_log: row.subcategoriafechalog!
          };

          // Agregar la subcategoría a la categoría
          categoriasMap.get(categoriaId)!.Subcategorias.push(subcategoria);
        }
      } else {
        console.warn(`Categoría con ID ${categoriaId} es inválido.`, row);
      }
    });

    // Devolver el array de las categorías con subcategorías
    return Array.from(categoriasMap.values());
  } catch (error) {
    console.error('Error in productService:', error);
    throw new Error('Error calling stored procedure');
  }
}
