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
