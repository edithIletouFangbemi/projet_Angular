import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { first } from 'rxjs';
import { Agence } from 'src/app/model/agence';
import { Institution } from 'src/app/model/institution';
import { LicenceClienteReturn } from 'src/app/model/licenceClienteReturn';
import { Module } from 'src/app/model/module';
import { Produit } from 'src/app/model/produit';
import { LicenceClienteServiceService } from 'src/app/services/licenceService/licenceCliente/licence-cliente-service.service';
import Swal from 'sweetalert2';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { LicenceRecapRequest } from 'src/app/model/licenceRecapRequest';
import { Router } from '@angular/router';


pdfMake!.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-licence-cliente',
  templateUrl: './licence-cliente.component.html',
  styleUrls: ['./licence-cliente.component.scss']
})
export class LicenceClienteComponent implements OnInit{
  constructor(private _formBuilder: FormBuilder,
    private licenceService: LicenceClienteServiceService,
    private _router: Router
    ){}

  formLicence!:FormGroup;
  institutions: Institution[] = [];
  agences: Agence[] = [];
  modules: Module[] = [];
  produits: Produit[] = [];
  listeLicence: LicenceClienteReturn[] = [];
  backendData!: any
  listeRecap!: LicenceRecapRequest[];
  produitCode!: string;
  institutionCode!: string;


  allowedFormats: string[] = ['xml', 'json'];
  selectedFormat!: string;
  selectedFile: any;

  ngOnInit(){
    this.initForm()
    this.listerInstitution()
    this.getByProduit()


    this.formLicence.get('institution')?.valueChanges.subscribe((value) => {
        this.institutionCode = value;
        console.log("code institution "+this.produitCode)
    });
      this.formLicence.get('produit')?.valueChanges.subscribe((value)=>{
        this.produitCode = value;
        console.log("code produit "+this.produitCode)

        this.licenceService.agences(this.institutionCode,this.produitCode).pipe(first()).subscribe({
          next: data=>{
              this.agences = data;
              console.log(data)
              console.log(this.agences)
          },
          error: error=>{
            console.log(error)
          }
         })
      })

      this.formLicence.get('agence')?.valueChanges.subscribe((value) => {
        this.licenceService.modules(value,this.produitCode).pipe(first()).subscribe({
          next: data=>{
            this.modules = data;
          },
          error: error=> console.log(error)
        })
      });






    this.module()
    this.lister()
  }

  initForm(){
    this.formLicence = this._formBuilder.group({
      fichier: ["",[Validators.required]],
      institution: [""],
      produit: ["",[Validators.required]],
      modules: ["",[Validators.required]],
      agence: ["", [Validators.required]]
    })
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    const file = event.target.files[0];
    const format = file.name.split('.').pop()?.toLowerCase();

    if (!this.allowedFormats.includes(format)) {
      alert('Format de fichier non autorisé. Veuillez choisir un fichier avec les formats suivants : ' + this.allowedFormats.join(', '));
      this.formLicence.reset();
    }
  }

save() {
    let fileReader = new FileReader();
    let fileData: any;

    // Charger le contenu du fichier en tant que texte
    fileReader.onload = (e) => {
      if (fileReader.result instanceof ArrayBuffer) {
        const uint8Array = new Uint8Array(fileReader.result);
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            fileData = JSON.parse(reader.result);

            // Récupérer les données du formulaire
            const formData = this.formLicence.value;

            // Fusionner les données du formulaire avec les données du fichier
            const data = {
              agence: formData.agence,
              institution: formData.institution,
              produit: formData.produit,
              modules: formData.modules,
              ...fileData, // Fusionnez les données avec fileData
            };

            // Appelez la méthode pour générer la licence en utilisant les données fusionnées
            this.licenceService.generateLicence(data).pipe(first()).subscribe(
              (response) => {
                console.log(response)

                this.lister()
                Swal.fire({
                  title: 'Reussite',
                  text:'génération de licence effectuée avec succès!',
                  icon: "success",
                  confirmButtonText: "Télécharger le fichier",
                  cancelButtonText:"Annuler"

                } ).then((result)=>{
                  if(result.isConfirmed){
                    this.download(response)
                  }
                });
                this.formLicence.reset()

              },
              (error) => {
                console.log('Erreur:', error);
                this.formLicence.reset()
                Swal.fire('Echec', error.error, 'error');
              }
            );
          }
        };
        reader.readAsText(new Blob([uint8Array]));
      }
    };

    // Lire le fichier en tant qu'ArrayBuffer
    fileReader.readAsArrayBuffer(this.selectedFile);
  }


  lister(){
    this.licenceService.recap().pipe(first()).subscribe({
      next: data =>{
          this.listeRecap = data;
      },
      error: error=> console.log(error)
    })
  }

  getLicence(codeLicence: string){
    this.licenceService.getLicence(codeLicence).pipe(first()).subscribe({
      next: data =>{
        
      }
    })
  }

  download(licence: LicenceClienteReturn){

    if(licence !== null){
      try{

        const data : any = licence
        let fileContent = "";
        for (const [key, value] of Object.entries(data)) {
          fileContent += `${key}: ${value}\n`;
        }

        let filename = licence.agence.nom +"."+licence.dateCreation.getDate();
        const blob = new Blob([fileContent],{type:'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

       // const url = window.URL.createObjectURL(blob);
        window.open(url);
      }
      catch(error){
        Swal.fire('Echec', "Une erreur s'est produite", 'error');
      }
    }
  }

  detail(recap : LicenceRecapRequest){
    const data : LicenceRecapRequest = Object.assign({}, recap)
    this._router.navigate(["base/detail-licence-cliente"], {queryParams: data})
  }

/*
  generatePDF(){

    const documentDefinition = {
      content: [
        'Exemple de génération de PDF avec pdfmake',
        '===========================================',
        'Voici du texte dans le PDF.',
        {
          text: 'Ceci est un paragraphe avec style',
          style: 'header',
        },
        {
          ul: [
            'Liste à puces 1',
            'Liste à puces 2',
            'Liste à puces 3',
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

    pdfMake!.createPdf(documentDefinition).open();
  }
*/




  listerInstitution(){
    this.licenceService.institutions().pipe(first()).subscribe({
      next: data =>{
        this.institutions = data
        console.log("institutions data")
        console.log(this.institutions)
      },
      error: error=>console.log(error)
    })
  }



  getByProduit(){

    this.formLicence.get('institution')?.valueChanges.subscribe((value) => {
      this.licenceService.produits(value).pipe(first()).subscribe({
        next: data=>{
          this.produits = data;
        },
        error: error=> console.log(error)
      })
    });

  }

  module(){
    this.modules = [];

  }
  reset(){
    this.formLicence.reset()
  }

}
