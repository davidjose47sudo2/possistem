'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RegistrarVenta from './registrar-venta'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VistaCajero() {
  const [idVenta, setIdVenta] = useState('')
  const [idProducto, setIdProducto] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [precioUnitario, setPrecioUnitario] = useState('')
  const [metodoPago, setMetodoPago] = useState('')
  const [monto, setMonto] = useState('')

  const agregarDetalleVenta = () => {
    // Aquí iría la lógica para llamar al SP agregar_detalle_venta
    console.log('Agregar detalle venta:', { idVenta, idProducto, cantidad, precioUnitario })
  }

  const registrarPago = () => {
    // Aquí iría la lógica para llamar al SP registrar_pago
    console.log('Registrar pago:', { idVenta, metodoPago, monto })
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Cajero</h1>
      <Tabs defaultValue="venta">
        <TabsList>
          <TabsTrigger value="venta">Registrar Venta</TabsTrigger>
          <TabsTrigger value="detalle">Agregar Detalle</TabsTrigger>
          <TabsTrigger value="pago">Registrar Pago</TabsTrigger>
        </TabsList>
        <TabsContent value="venta">
          <RegistrarVenta />
        </TabsContent>
        <TabsContent value="detalle">
          <form className="space-y-4">
            <div>
              <Label htmlFor="idVenta">ID Venta</Label>
              <Input id="idVenta" type="number" value={idVenta} onChange={(e) => setIdVenta(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="idProducto">Producto</Label>
              <Select onValueChange={setIdProducto} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un producto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Producto 1</SelectItem>
                  <SelectItem value="2">Producto 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cantidad">Cantidad</Label>
              <Input id="cantidad" type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="precioUnitario">Precio Unitario</Label>
              <Input id="precioUnitario" type="number" step="0.01" value={precioUnitario} onChange={(e) => setPrecioUnitario(e.target.value)} required />
            </div>
            <Button onClick={agregarDetalleVenta}>Agregar Detalle</Button>
          </form>
        </TabsContent>
        <TabsContent value="pago">
          <form className="space-y-4">
            <div>
              <Label htmlFor="idVentaPago">ID Venta</Label>
              <Input id="idVentaPago" type="number" value={idVenta} onChange={(e) => setIdVenta(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="metodoPago">Método de Pago</Label>
              <Select onValueChange={setMetodoPago} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un método de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="monto">Monto</Label>
              <Input id="monto" type="number" step="0.01" value={monto} onChange={(e) => setMonto(e.target.value)} required />
            </div>
            <Button onClick={registrarPago}>Registrar Pago</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}