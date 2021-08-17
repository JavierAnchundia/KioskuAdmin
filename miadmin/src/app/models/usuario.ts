export class Usuario {
    constructor(
        public id: number,
        public name: string,
        public email: string,
       // public password: string,
        public is_active: boolean,
       // public staff: boolean,
        //public rol: string,
        public address: string,
        public saldo: number,

        public provincia: number,
        public ciudad: number,
        public membresia: number,

      ) { }
  }