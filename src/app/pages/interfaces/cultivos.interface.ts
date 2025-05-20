export interface CultivosResponse {
  dataResult: Cultivos[];
  message: string;
  isError: boolean;
  statusCode: number | null;
}

export interface Cultivos {
  tipoCultipoId?: number | null; 
  nombreCultivo?: string;
  descripcion?: string;
  cicloDeCultivo?: number;
  temporada?: string;
  requerimientosClimaticos?: string;
  fechaSiembra?: string;
  fechaCosecha?: string;
  tipoDeSuelo?: string;
  phRecomendado?: string;
  creadoPor?: string;
  modificadoPor?: string;
}
