'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CrearUsuario from './crear-usuario'
import CrearProducto from './crear-producto'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function VistaAdmin() {
  const [fechaReporte, setFechaReporte] = useState('')
  const [stockMinimo, setStockMinimo] = useState('')

  const generarReporteVentas = () => {
    // Aquí iría la lógica para llamar al SP generar_reporte_ventas
    console.log('Generar reporte de ventas:', fechaReporte)
  }

  const consultarProductosBajoStock = () => {
    // Aquí iría la lógica para llamar al SP productos_bajo_stock
    console.log('Consultar productos bajo stock:', stockMinimo)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administrador</h1>
      <Tabs defaultValue="usuarios">
        <TabsList>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="reportes">Reportes</TabsTrigger>
        </TabsList>
        <TabsContent value="usuarios">
          <CrearUsuario />
        </TabsContent>
        <TabsContent value="productos">
          <CrearProducto />
        </TabsContent>
        <TabsContent value="reportes">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fechaReporte">Fecha para reporte de ventas</Label>
              <Input
                id="fechaReporte"
                type="date"
                value={fechaReporte}
                onChange={(e) => setFechaReporte(e.target.value)}
              />
              <Button onClick={generarReporteVentas} className="mt-2">Generar Reporte</Button>
            </div>
            <div>
              <Label htmlFor="stockMinimo">Stock mínimo</Label>
              <Input
                id="stockMinimo"
                type="number"
                value={stockMinimo}
                onChange={(e) => setStockMinimo(e.target.value)}
              />
              <Button onClick={consultarProductosBajoStock} className="mt-2">Consultar Productos Bajo Stock</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}