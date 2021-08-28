export class Producto {
    constructor(
        public id: number,
        public estado: number,
        public item: number,
        public subcategoria: number,
        public categoria: number,
        public peso: number,
        public precio: number,
        public descripcion: string,
        public dimensiones: string,
        public material: string,
        public disponible: boolean,
        public titulo: string,
        public thumbnail: string,
        public cantidad: number,
        public bodega: number,
        public is_active:boolean,

        public subcategoria_name: string,
        public categoria_name: string,
        public bodega_name: string,

      ) { }
  }