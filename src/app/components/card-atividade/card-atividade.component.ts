import { Component, Input, OnInit } from '@angular/core';
import { Atividade } from 'src/app/models/atividades/Atividade';

@Component({
  selector: 'app-card-atividade',
  templateUrl: './card-atividade.component.html',
  styleUrls: ['./card-atividade.component.scss'],
})
export class CardAtividadeComponent implements OnInit{

  @Input() atividade: Atividade = {
    id: 0,
    nome: '',
    horas: 0,
    minutos: 0,
    segundos: 0,
    concluido: false,
    dataCriacao: new Date(),
    dataConclusao: new Date(),
  };

  tempoEmTexto: any = {
    horas: '00',
    minutos: '00',
    segundos: '00',
  };

  ngOnInit() {
    console.log('OnInit')
    this.atualizarTempoTextos();
  }

  intervalTemporizador: any;

  ativo: boolean = false;

  ativarDesativar(): void {
    console.log(`Mudando status para ${this.ativo ? 'Inativo' : 'Ativo'}`);
    this.ativo = !this.ativo;

    if(this.ativo){
      this.IniciarTemporizador();
    } else{
      clearInterval(this.intervalTemporizador);
    }
  }

  IniciarTemporizador(): void {
    this.intervalTemporizador = setInterval(() => {
      this.atividade.segundos++;

      if (this.atividade.segundos >= 60) {
        this.atividade.segundos = 0;
        this.atividade.minutos++;
      }

      if (this.atividade.minutos >= 60) {
        this.atividade.minutos = 0;
        this.atividade.horas++;
      }

      this.atualizarTempoTextos();
      console.log(this.atividade);
    }, 1000);
  }

  atualizarTempoTextos(): void{
    this.tempoEmTexto.horas = this.preencherZeros(this.atividade.horas);
    this.tempoEmTexto.minutos = this.preencherZeros(this.atividade.minutos);
    this.tempoEmTexto.segundos = this.preencherZeros(this.atividade.segundos);
  }

  preencherZeros(valor: number): string {
    return valor < 10 ? '0' + valor : valor + '';
  }
}
