import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import {
  Atividade,
  NovaAtividadeRequest,
} from 'src/app/models/atividades/Atividade';
import { AtividadesService } from 'src/app/services/atividades/atividades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss'],
})
export class AtividadesComponent implements OnInit {
  atividades: Atividade[] = [];
  atividadeSelecionada: Atividade = {
    id: 0,
    nome: '',
    horas: 0,
    minutos: 0,
    segundos: 0,
    concluido: false,
    dataCriacao: new Date(),
    dataConclusao: new Date()
  };

  constructor(
    private atividadeService: AtividadesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarAtividades();
  }

  carregarAtividades(): void {
    this.atividadeService.listar().subscribe((atividades) => {
      console.log('Atividades recuperadas', atividades);
      this.atividades = atividades;
    });
  }

  async abrirModalCriarAtividade() {
    const { value: nomeAtividade } = await Swal.fire({
      title: 'Criar Atividade',
      input: 'text',
      inputPlaceholder: 'Nome da atividade...',
      inputAutoFocus: true,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Criar Atividade',
      confirmButtonColor: '0074D9',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '95A5A6',
      preConfirm: (nome: string) => {
        return new Promise((resolve, reject) => {
          if (nome) {
            resolve(nome);
          } else {
            reject('Você precisa digitar algo!');
          }
        })
          .then((nome) => {
            this.criarNovaAtividade(nome);
          })
          .catch((error) => {
            Swal.showValidationMessage('Nome inválido!');
          });
      },
    });
  }

  criarNovaAtividade(nome: any) {
    this.atividadeService
      .inserir(new NovaAtividadeRequest(nome))
      .pipe(
        catchError((error) => {
          this.toastr.error('Houve um erro ao cadastrar sua atividade', 'Ops!');
          return error;
        })
      )
      .subscribe((atividade) => {
        this.toastr.success('Sucesso!', 'Atividade cadastrada');
        this.carregarAtividades();
      });
  }
}
