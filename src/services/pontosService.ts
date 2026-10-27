import { apiGet } from './api';
import { PaginaPontos, Ponto } from '../types/ponto';

const TAMANHO_PAGINA = 50;

export async function listarPontos(): Promise<Ponto[]> {
  const pontos: Ponto[] = [];
  let pagina = 0;
  let totalPaginas = 1;

  while (pagina < totalPaginas) {
    const resposta = await apiGet<PaginaPontos>(
      `/pontos?page=${pagina}&size=${TAMANHO_PAGINA}&sort=nome,asc`,
    );
    pontos.push(...resposta.content);
    totalPaginas = resposta.page.totalPages;
    pagina += 1;
  }

  return pontos;
}

export function buscarPontoPorId(id: number): Promise<Ponto> {
  return apiGet<Ponto>(`/pontos/${id}`);
}
