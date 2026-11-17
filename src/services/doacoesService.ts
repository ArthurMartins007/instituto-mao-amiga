import { apiDel, apiGet, apiPost, apiPut } from './api';
import { Doacao, DoacaoRequest } from '../types/Doacao';
import { Pagina } from '../types/ponto';

const TAMANHO_PAGINA = 10;

// Consulta o histórico paginado e aplica o filtro de tipo no servidor.
export function buscarPaginaDoacoes(pagina: number, filtro: string): Promise<Pagina<Doacao>> {
  const parametros = new URLSearchParams({
    page: String(pagina),
    size: String(TAMANHO_PAGINA),
  });

  if (filtro.trim()) parametros.set('filtro', filtro.trim());

  return apiGet<Pagina<Doacao>>(`/doacoes/filtro?${parametros.toString()}`);
}

// Carrega uma doação pelo identificador.
export function buscarDoacaoPorId(id: string): Promise<Doacao> {
  return apiGet<Doacao>(`/doacoes/${id}`);
}

// Registra a doação. A data é criada pelo service da API.
export function cadastrarDoacao(dados: DoacaoRequest): Promise<Doacao> {
  return apiPost<Doacao>('/doacoes', dados);
}

// Atualiza só os campos editáveis, mantendo id e data no servidor.
export function editarDoacao(id: string, dados: DoacaoRequest): Promise<Doacao> {
  return apiPut<Doacao>(`/doacoes/${id}`, dados);
}

// Exclui a doação.
export function excluirDoacao(id: string): Promise<void> {
  return apiDel(`/doacoes/${id}`);
}
