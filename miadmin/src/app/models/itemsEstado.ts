export class ItemEstado {
    constructor(
        public id: number,
        public titulo: string,
        public descripcion: string,
        public cantidad: number,
        public entrega: string,
        public creditos: number,
        public thumbnail: string,
        
        public estado: number,
        public estado_name: string,

        public propietario: number,


      ) { }
  }