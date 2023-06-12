import { Component, OnInit } from '@angular/core';
import { Atividade } from 'src/app/models/atividades/Atividade';
import { AtividadesService } from 'src/app/services/atividades/atividades.service';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit {

  atividades: Atividade[] = [];

  constructor(private atividadeService: AtividadesService) {

  }
  ngOnInit(): void {
    this.atividadeService.listar()
    .subscribe((atividades) => {
      console.log('Request concluida', atividades)
      this.atividades = atividades
    })
  }

}
