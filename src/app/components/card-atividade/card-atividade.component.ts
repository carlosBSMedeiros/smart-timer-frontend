import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { Atividade, EditarAtividadeRequest } from 'src/app/models/atividades/Atividade';
import { AtividadesService } from 'src/app/services/atividades/atividades.service';
import { GerenciadorAtividadesService } from 'src/app/services/atividades/gerenciador-atividades.service';

@Component({
  selector: 'app-card-atividade',
  templateUrl: './card-atividade.component.html',
  styleUrls: ['./card-atividade.component.scss'],
})
export class CardAtividadeComponent implements OnInit {
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

  intervalTemporizador: any;
  intervalAtualizarAtividadeAtiva: any;

  ativo: boolean = false;

  constructor(
    private atividadeService: AtividadesService,
    private gerenciadorAtividadesService : GerenciadorAtividadesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.atualizarTempoTextos();
  }

  ativarExecucaoAtividade(){
    this.ativo = true;
    this.gerenciadorAtividadesService.atualizarAtividadeAtiva(this);
    this.IniciarTemporizador();
  }

  desativarExecucaoAtividade(){
    this.ativo = false;
    this.PararTemporizador();

    if(this.gerenciadorAtividadesService.atividadeAtiva == this){
      this.gerenciadorAtividadesService.limparAtividadeAtiva();
    }
  }

  IniciarTemporizador(): void {
    this.IniciarIntervalTemporizador();
    this.IniciarIntervalAtualizarAtividadeAtiva();
  }

  PararTemporizador(): void{
    clearInterval(this.intervalTemporizador);
    clearInterval(this.intervalAtualizarAtividadeAtiva);
    this.atualizarAtividade();
  }

  IniciarIntervalTemporizador(){
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
    }, 1000);
  }

  IniciarIntervalAtualizarAtividadeAtiva(){
    this.intervalAtualizarAtividadeAtiva = setInterval(()=>{
      this.atualizarAtividade();
    }, 1000 * 60 * 5)
  }

  atualizarTempoTextos(): void {
    this.tempoEmTexto.horas = this.preencherZeros(this.atividade.horas);
    this.tempoEmTexto.minutos = this.preencherZeros(this.atividade.minutos);
    this.tempoEmTexto.segundos = this.preencherZeros(this.atividade.segundos);
  }

  preencherZeros(valor: number): string {
    return valor < 10 ? '0' + valor : valor + '';
  }

  atualizarAtividade(): void {
    if (this.atividade.id == 0) return;
    console.log('Atualizando Atividade');

    this.atividadeService.
      editar(this.atividade.id, new EditarAtividadeRequest(this.atividade.nome, this.atividade.horas, this.atividade.minutos, this.atividade.segundos))
      .pipe(
        catchError((error) => {
          this.toastr.error('Houve um erro ao salvar as alterações sua atividade', 'Ops!');
          return error;
        })
      )
      .subscribe((atividade) => {
        this.toastr.success('Sucesso!', 'Atividade atualizada');
      });
  }
}
