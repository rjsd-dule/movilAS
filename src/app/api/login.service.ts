import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MuestreoResponse } from '../pages/interfaces/muestreo.interface';
import { Ubicaciones, UbicacionesResponse } from '../pages/interfaces/ubicaciones.interface';
import { TokensResponse } from '../pages/interfaces/tokens.interface';
import { Cultivos, CultivosResponse } from '../pages/interfaces/cultivos.interface';
// import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // async loginCap(email: string, password: string){
  //   const response = await Http.request({
  //     method: 'POST',
  //     url: 'http://159.223.114.107:8080/api/users/login',
  //     headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  //     data: {
  //       email: email,
  //       password: password
  //     }    
  //   });

  //   return response;
  // }

  login(email: string, password: string): Observable<any> {
    const url = "http://159.223.114.107:8080/api/users/login";
    const data = {
      email: email,
      password: password
    };

    console.log(data);
    return this.http.post(url, data, { headers: LoginService.createRequestHeaderPost() });
  }

  // TOKENS
  getTokens(id:number) {
    const url = `http://159.223.114.107:5000/api/v1/MuestraToken/GetToken?UbicacionId=${id}`;
    return this.http.get<TokensResponse>(url);
  }

  updateToken(payload: any){
    const url = "http://159.223.114.107:5000/api/v1/MuestraToken/UpdateToken";
    return this.http.put(url, payload);
  }

  //MUESTREO
  addMuestreo() {
    const url = "http://159.223.114.107:5002/api/v1/ServicioMuestreo/AddMuestreo";
    const data = {
      tokenValue: "string",
      nitrogeno: 0,
      fosforo: 0,
      potasio: 0,
      ph: 0,
      descripcion: "string"
    }

    return this.http.post(url, data, { headers: LoginService.createRequestHeaderPost() });
  }

  getMuestreo(filtros: any[], id: number) {
    const url = "http://159.223.114.107:5002/api/v1/ServicioMuestreo/GetMuestreo";
    const data = {
      id: id,
      startDate: "2025-02-13T14:08:15.302Z",
      endDate: "2025-02-13T14:08:15.302Z",
      filtros: filtros
    }
    return this.http.post<MuestreoResponse>(url, data, { headers: LoginService.createRequestHeaderPost() });
  }

  //UBICACIONES
  getUbicaciones(id:number) {
    const url = `http://159.223.114.107:5000/api/v1/Ubicacion/GetUbicacion?Id=${id}`;
    return this.http.get<UbicacionesResponse>(url);
  }

  addUbicacion(data: Ubicaciones) {  
    const url = "http://159.223.114.107:5000/api/v1/Ubicacion/AddUbicacion";
    return this.http.post(url, data ,{ headers: LoginService.createRequestHeaderPost() });

  }

  updateUbicaciones(payload: any){
    const url = "http://159.223.114.107:5000/api/v1/Ubicacion/UpdateUbicacion";
    return this.http.put(url, payload);
  }

  deleleUbicaciones(ubicacionId: number){
    const url = "http://159.223.114.107:5000/api/v1/Ubicacion/DeleteUbicacion";
    const data = {
      ubicacionId: ubicacionId 
    }

    return this.http.request('DELETE', url, {
      body: { ubicacionId },
    });
  }

  //CULTIPO
  addTipoCultivo(cultivo: Cultivos) {
    const url = "http://159.223.114.107:5000/api/v1/TipoCultivo/AddTipoCultivo";
    return this.http.post(url, cultivo, { headers: LoginService.createRequestHeaderPost() });
  }

  getCultivo(id: number){
    const url = `http://159.223.114.107:5000/api/v1/TipoCultivo/GetTipoCultivo?Id=${id}`
    return this.http.get<CultivosResponse>(url);
  }

  updateCultivo(payload: any){
    const url = "http://159.223.114.107:5000/api/v1/TipoCultivo/UpdateTipoCultivo";
    return this.http.put(url, payload);
  }

  deleleCultivo(tipoCultivoId: number){
    const url = "http://159.223.114.107:5000/api/v1/TipoCultivo/DeleteTipoCultivo";
    const data = {
      tipoCultivoId: tipoCultivoId 
    }

    return this.http.request('DELETE', url, {
      body: { tipoCultivoId },
    });
  }


  public static createRequestHeaderPost(): HttpHeaders {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    return headers;
  }


}
