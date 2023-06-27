export interface Atividade{
  id: number,
  nome: string,
  horas: number,
  minutos: number,
  segundos: number,
  concluido: boolean,
  dataCriacao: Date,
  dataConclusao: Date
}

export class NovaAtividadeRequest{
  nome: string;
  idUsuario: number;

  constructor(nome: string) {
    this.nome = nome;
    this.idUsuario = 0;
  }
}

export class EditarAtividadeRequest{
  nome: string;
  horas: number;
  minutos: number;
  segundos: number;

  constructor(nome: string, horas: number, minutos: number, segundos: number) {
    this.nome = nome;
    this.horas = horas;
    this.minutos = minutos;
    this.segundos = segundos;
  }
}
