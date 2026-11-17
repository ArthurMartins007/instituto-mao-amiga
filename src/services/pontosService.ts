import { apiDel, apiGet, apiPost, apiPut } from './api';
import { Pagina, Ponto, PontoRequest } from '../types/ponto';

const TAMANHO_PAGINA = 10;

// Busca uma página de pontos. O filtro fica no servidor, não na tela.
export function buscarPaginaPontos(pagina: number, filtro: string): Promise<Pagina<Ponto>> {
  const parametros = new URLSearchParams({
    page: String(pagina),
    size: String(TAMANHO_PAGINA),
    sort: 'nome,asc',
  });

  if (filtro.trim()) parametros.set('filtro', filtro.trim());

  return apiGet<Pagina<Ponto>>(`/pontos/filtro?${parametros.toString()}`);
}

// Busca um ponto específico para abrir o detalhe ou editar.
export function buscarPontoPorId(id: string): Promise<Ponto> {
  return apiGet<Ponto>(`/pontos/${id}`);
}

// Cria um ponto novo.
export function cadastrarPonto(dados: PontoRequest): Promise<Ponto> {
  return apiPost<Ponto>('/pontos', dados);
}

// Atualiza os dados de um ponto.
export function editarPonto(id: string, dados: PontoRequest): Promise<Ponto> {
  return apiPut<Ponto>(`/pontos/${id}`, dados);
}

// Remove um ponto da API.
export function excluirPonto(id: string): Promise<void> {
  return apiDel(`/pontos/${id}`);
}
