export const API_BASE_URL = 'http://192.168.0.1:8080/api/v1';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type MetodoHttp = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Centraliza o fetch e transforma qualquer erro HTTP em uma exceção tratável nas telas.
async function requisitar<T>(caminho: string, metodo: MetodoHttp, dados?: unknown): Promise<T> {
  let resposta: Response;

  try {
    resposta = await fetch(`${API_BASE_URL}${caminho}`, {
      method: metodo,
      headers: dados ? { 'Content-Type': 'application/json' } : undefined,
      body: dados ? JSON.stringify(dados) : undefined,
    });
  } catch {
    throw new ApiError(0, 'Não foi possível conectar à API. Confira se ela está ligada e se o IP está correto.');
  }

  if (!resposta.ok) {
    let mensagem = `A API respondeu com o status ${resposta.status}.`;

    try {
      const erro = await resposta.json() as { mensagens?: string[]; erro?: string };
      mensagem = erro.mensagens?.join(' ') || erro.erro || mensagem;
    } catch {
      // Se a resposta não vier em JSON, mantém a mensagem padrão.
    }

    throw new ApiError(resposta.status, mensagem);
  }

  if (resposta.status === 204) {
    return undefined as T;
  }

  return resposta.json() as Promise<T>;
}

// Lê dados da API.
export function apiGet<T>(caminho: string): Promise<T> {
  return requisitar<T>(caminho, 'GET');
}

// Envia um novo registro.
export function apiPost<T>(caminho: string, dados: unknown): Promise<T> {
  return requisitar<T>(caminho, 'POST', dados);
}

// Atualiza um registro existente.
export function apiPut<T>(caminho: string, dados: unknown): Promise<T> {
  return requisitar<T>(caminho, 'PUT', dados);
}

// Exclui um registro.
export function apiDel(caminho: string): Promise<void> {
  return requisitar<void>(caminho, 'DELETE');
}
