'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegistrarVenta() {
  const [idUsuario, setIdUsuario] = useState('')
  const [total, setTotal] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para llamar al SP registrar_venta
    console.log('Registrar venta:', { idUsuario, total })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="idUsuario">Usuario</Label>
        <Select onValueChange={setIdUsuario} required>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un usuario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Usuario 1</SelectItem>
            <SelectItem value="2">Usuario 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="total">Total</Label>
        <Input id="total" type="number" step="0.01" value={total} onChange={(e) => setTotal(e.target.value)} required />
      </div>
      <Button type="submit">Registrar Venta</Button>
    </form>
  )
}