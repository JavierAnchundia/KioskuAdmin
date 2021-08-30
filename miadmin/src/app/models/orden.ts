export class Orden {
  id!: number;
  dateCreated!: Date;
  ciudad!: string;
  total!: number;
  costoEntrega!: number;
  carro?: string;
  totalCompra?: number;
  estadoCompra!: string;
  pago?: string;
  detalle?: string;
  direccion?: string;
  comprador?: string;
  updated?: Date;
}
