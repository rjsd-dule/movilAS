export interface UbicacionesResponse {
  dataResult: Ubicaciones[];
  message: string;
  isError: boolean;
  statusCode: number | null;
}

export interface Ubicaciones {
  ubicacionId?: number | null; 
  nombreUbicacion?: string;
  direccion?: string;
  estadoProvincia?: string;
  descripcion?: string;
  comentarios?: string;
  latitud?: number | null;
  longitud?: number | null;
  creadoPor?: string;
  fechaCreacion?: string;
}
