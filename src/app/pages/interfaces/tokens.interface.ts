export interface TokensResponse {
  dataResult: Tokens[];
  message: string;
  isError: boolean;
  statusCode: number | null;
}

export interface Tokens {
  tokenId?: number | null; 
  nombreCultivo?: string;
  tokenValue?: string;
  expira?: string;
  isEditing?: boolean;
}
