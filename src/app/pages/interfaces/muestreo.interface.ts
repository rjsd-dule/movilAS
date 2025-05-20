export interface MuestreoResponse {
    dataResult: Muestreo[];
    message: string;
    isError: boolean;
    statusCode: number | null;
  }
  
  export interface Muestreo {
    nombreUbicacion: string;
    nombreCultivo: string;
    nitrogeno: number;
    fosforo: number;
    potasio: number;
    ph: number;
    descripcion: string;
  }
  