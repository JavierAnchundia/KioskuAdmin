export class Anuncio {
  constructor(
      public id: number,
      public dateCreated: Date,
      public banner: File,
      public titulo: string,
      public descripcion: string,
    ) { }
}
