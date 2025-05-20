import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import { LoginService } from 'src/app/api/login.service';
import { Muestreo, MuestreoResponse } from '../interfaces/muestreo.interface';
import { Ubicaciones, UbicacionesResponse } from '../interfaces/ubicaciones.interface';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.page.html',
  styleUrls: ['./grafica.page.scss'],
  standalone: false,
})
export class GraficaPage implements OnInit {
  @ViewChild('myChart') myChart: any;

  public selectedChartType = 'line';
  public selectedMinerals: string[] = [];
  public chart: Chart | null = null;
  public labels: string[] = [];
  public datasets: any[] = [];
  ubicaciones: Ubicaciones[] = [];
  ubicacionId: number = 0;
  auxUbicacionId: number = 0;
  selectedNpkPh: string = '';
  auxSelectNpkPh: string = '';

  constructor(private apiService: LoginService) { }

  ngOnInit() {
    console.log
   // this.fetchData([0]);
    this.fetchUbicaciones();
  }

  fetchData(ids: number[], id: number){
    const filtros = ids.map(id => ({ indicadorId: id }));

    this.apiService.getMuestreo(filtros, id).subscribe(
      {
        next: (data: MuestreoResponse) => {
          this.processData(data.dataResult);
          console.log("muestreo", data);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  processData(dataResult: Muestreo[]) {

    console.log("selectedMinerals", this.selectedMinerals, dataResult);
    this.labels = dataResult.map((_, index) => `${index + 1}`);
    if (this.selectedNpkPh == 'ph') {
      this.datasets.push(
        // {
        //   label: 'Nitrogeno',
        //   data: dataResult.map((muestreo) => muestreo.nitrogeno),
        //   borderColor: 'rgb(255, 99, 132)',
        //   backgroundColor: 'rgb(255, 99, 132)',
        //   fill: false
        // },
        // {
        //   label: 'Fósforo',
        //   data: dataResult.map((item) => item.fosforo),
        //   borderColor: 'rgba(153, 102, 255, 1)',
        //   backgroundColor: 'rgba(153, 102, 255, 1)',
        //   fill: false,
        // },
        // {
        //   label: 'Potasio',
        //   data: dataResult.map((muestreo) => muestreo.potasio),
        //   borderColor: 'rgba(255, 159, 64, 1)',
        //   backgroundColor: 'rgba(255, 159, 64, 1)',
        //   fill: false
        // },
        {
          label: 'PH',
          data: dataResult.map((item) => item.ph),
          borderColor: 'rgb(38, 141, 55)',
          backgroundColor: 'rgb(38, 141, 55)',
          fill: false,
          grado: dataResult[0] ? dataResult[0].descripcion : ''
        }
      );
    } 
    else {
      this.selectedMinerals.forEach((mineral) => {
        this.datasets.push({
          label: this.getLabel(mineral),
          data: dataResult.map((item) =>   item[this.getLabelService(mineral) as keyof Muestreo]),
          borderColor: this.getColor(mineral),
          backgroundColor: this.getColor(mineral),
          fill: false,
        });



        // const key = mineral as keyof Muestreo;
        // this.datasets.push({
        //   label: mineral.charAt(0).toUpperCase() + mineral.slice(1),
        //   data: dataResult.map((item) => item[key]),
        //   borderColor: this.getRandomColor(),
        //   fill: false,
        // });
      });
    }

    console.log("");
    this.updateChart(this.labels, this.datasets);
  }

  getLabelService(id: string){
    switch (id) {
      case '1':
        return 'fosforo';
      case '2':
        return 'nitrogeno';
      case '3':
        return 'potasio';
      case '4':
        return 'ph';
      default:
        return '';
    }
  }

  getLabel(id: string){
    switch (id) {
      case '1':
        return 'Fósforo';
      case '2':
        return 'Nitrogeno';
      case '3':
        return 'Potasio';
      case '4':
        return 'PH';
      default:
        return '';
    }
  }

  updateChart(labels?: string[], datasets?: any[]) {
    console.log("labels", labels);
    console.log("datasets", datasets);
    if (this.chart) {
      this.chart.destroy();
    }

    const config = {
      type: this.selectedChartType,
      data: {
        labels: labels || [],
        datasets: datasets || [],
      },
      ... (this.selectedNpkPh === 'ph' && {
        options: {
          responsive: true,
          scales : {
            y: {
              min: 0,
              max: 14, 
              suggestedMax: 14,
              ticks: {
                stepSize: 5,
              },
              title: {
                display: true,
                text: 'pH (0-14)'
              }
            }
          }
        } 
      })
    };
    this.chart = new Chart("chart", config);
  }

  onChartTypeChange() {
    //TODO: 
    console.log("selectedChartType", this.selectedChartType);
    this.updateChart(this.labels, this.datasets);
  }

  onNpkPhChange(){
    if (this.auxSelectNpkPh === this.selectedNpkPh) return;
    this.chart?.destroy();
    this.datasets = [];
    console.log(" this.chart.destroy();", this.ubicacionId);
    
    if (this.selectedNpkPh == 'ph') {
      const id = Number(this.ubicacionId);
      this.fetchData([4], id);
    }
    this.auxSelectNpkPh = this.selectedNpkPh;
  }

  onUbicacionChange(){
    console.log("entro a ubicaciones....", this.ubicacionId);
    if(this.auxUbicacionId === this.ubicacionId) return ;
    this.chart?.destroy();
    this.datasets = [];
    this.selectedNpkPh = '';
    this.auxSelectNpkPh = '';
    this.selectedMinerals = [];
    this.auxUbicacionId = this.ubicacionId;
    //this.fetchUbicaciones();
  }

  onMineralsChange() {
    this.datasets = [];
    const id = Number(this.ubicacionId);
    console.log("selectedMinerals", this.selectedMinerals);

    const numberIds = this.selectedMinerals.length > 0 ? this.selectedMinerals.map(mineral => Number(mineral)) : [0];
    this.fetchData(numberIds, id);
  }

  getColor(color: string) {
    switch (color) {
      case '1':
        return 'rgba(153, 102, 255, 1)';
      case '2':
        return 'rgb(255, 99, 132)';
      case '3':
        return 'rgba(255, 159, 64, 1)';
      case '4':
        return 'rgb(38, 141, 55)';
      default:
        return '';
    }
  }


  //Ubicaciones
  fetchUbicaciones(){
      this.apiService.getUbicaciones(0).subscribe(
            {
              next: (data: UbicacionesResponse) => {
                this.ubicaciones = data.dataResult;
                console.log("ubicaciones", this.ubicaciones);
              },
              error: (error) => {
                console.error(error);
              }
            });
    }

}
