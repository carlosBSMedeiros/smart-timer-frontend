import { Injectable } from '@angular/core';
import { CardAtividadeComponent } from '../../components/card-atividade/card-atividade.component'

@Injectable({
  providedIn: 'root'
})
export class GerenciadorAtividadesService {
  atividadeAtiva: CardAtividadeComponent | null = null;

  constructor() { }

  atualizarAtividadeAtiva(novaAtividadeAtiva: CardAtividadeComponent) {
    console.log('Gerenciador de atividades ativado')
    if (this.atividadeAtiva) {
      this.atividadeAtiva.desativarExecucaoAtividade();
    }
    this.atividadeAtiva = novaAtividadeAtiva;
  }

  limparAtividadeAtiva(){
    this.atividadeAtiva = null;
  }
}
