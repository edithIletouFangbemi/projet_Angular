import { AfterViewInit, Component, OnInit } from '@angular/core';
import { registerables, ChartDataset } from 'chart.js';
import { first } from 'rxjs';
import { Chart } from 'angular-highcharts';



import { ContratInstitutionServiceService } from 'src/app/services/contratInstitution/contrat-institution-service.service';
import { InstitutionServiceService } from 'src/app/services/institution/institution-service.service';
import { LicenceClienteServiceService } from 'src/app/services/licenceService/licenceCliente/licence-cliente-service.service';
import { ProduitServiceService } from 'src/app/services/produitService/produit-service.service';
import { DynamicScriptLoaderService2 } from 'src/app/services/shared/dynamic-script-loader-service2.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(private dynamicScriptLoader:DynamicScriptLoaderService2,
    private produitService: ProduitServiceService,
    private institutionService: InstitutionServiceService,
    private contratService: ContratInstitutionServiceService,
    private licenceService: LicenceClienteServiceService
    ){}

  chart!: Chart;
  chart2!: Chart;

  currentUser: any;

  listeProduit!: any;
  listeInstitution!: any;
  listeContrat!: any;
  nbrLicence!: number;

  ngOnInit(){
    this.loadScripts()
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : {};
    this.countProduit()
    this.countInst()
    this.countContrat()
    this.countLicence();

    // Créez un nouveau graphique Angular Highcharts
    this.chart = new Chart({
      chart: {
        type: 'bar', // Type de graphique (barres)
      },
      title: {
        text: 'Exemple de graphique Angular Highcharts',
      },
      xAxis: {
        categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'], // Catégories de l'axe X
      },
      yAxis: {
        title: {
          text: 'Valeurs',
        },
      },
      series: [
        {
          type: 'bar',
          name: 'Série 1', // Nom de la série de données
          data: [10, 25, 15, 30, 20], // Données de la série
        },
      ],
    });

    this.chart2 = new Chart({
      chart: {
        type: 'column', // Type de graphique (barres)
      },
      title: {
        text: 'Exemple de graphique Angular Highcharts',
      },
      xAxis: {
        categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'], // Catégories de l'axe X
      },
      yAxis: {
        title: {
          text: 'Valeurs',
        },
      },
      series: [
        {
          type: 'line',
          name: 'Série 1', // Nom de la série de données
          data: [10, 25, 15, 30, 20], // Données de la série
          
        },
      ],
    });








  }

  countProduit(): void{
    this.produitService.getAll().pipe(first()).subscribe({
      next: data=>{
        this.listeProduit = data.length
      },
      error: error=>console.log(error.error)
    })
  }

  countLicence(){
    this.licenceService.getAll().pipe(first()).subscribe({
      next: data =>{
        this.nbrLicence = data
      },
      error: error=> console.log(error)
    })
  }

  countContrat(): void{
    this.contratService.getAll().pipe(first()).subscribe({
      next: data=>{
        this.listeContrat = data.length
      },
      error: error=>console.log(error)
    })
  }

  countInst(): void{
    this.institutionService.getAllInstitution().pipe(first()).subscribe({
      next: data=>{
        this.listeInstitution = data.length
      },
      error: error=>console.log(error)
    })
  }


/*
  chart = new Chart({
    chart: {
      type: "line",
      height: 300
    },
    title:{
      text: "Nombre de licence Générée par mois!"
    },
    xAxis:{
      categories:[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
    },
    yAxis:{
      title: {
        text: "Nombre"
      }

    },
    series: [

     {
      name: "Arizona",
      color: '#044342',
      type: 'line',
      data: [70, 69, 80,34,102, 90, 76, 54,67,98,99,28]
     },
     {
      name: "Purchases",
      type: 'line',
      color: '#7e0505',
      data: [90, 99, 60,54,62, 70, 86, 64,57,48,79,48]
     },
     {
      name: "Sales",
      type: 'line',
      color: '#ed9e20',
      data: [72, 60, 70,94,52, 40, 96, 84,77,58,89,33]
     }
    ],
    credits:{
      enabled: false
    }
 });*/

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load(
    'jquery.min',
    'jquery-ui',
    'popper',
    'bootstrap.min',
    'slimScroll',
    'modernizr',
    'scrollBar',
    'datatablesJquery',
    'datatableButton',
    'jszip',
    'pdfmake',
    'vfs_fonts',
    'print',
    'html5',
    'bootstrap4',
    'dataTables.responsive',
    'responsive.bootstrap4',
    'i18next',
    'i18nextXHRBackend',
    'languagedetector',
    'jquery-i18next',
    'data-table-custom',
    'pcoded',
    'vartical-layout',
    'mCustomScrollbar',
    'script'
    ).then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }


}










