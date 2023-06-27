import { TestBed } from '@angular/core/testing';

import { GerenciadorAtividadesService } from './gerenciador-atividades.service';

describe('GerenciadorAtividadesService', () => {
  let service: GerenciadorAtividadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciadorAtividadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
