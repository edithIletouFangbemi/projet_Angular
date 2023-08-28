import { Component, OnInit } from '@angular/core';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { Habilitation } from 'src/app/model/habilitation';


pdfMake!.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
 habilitations! :any[] ;
 visibleUser: boolean = false;
 visibleUtilisateur: boolean = false;
 visibleProfil: boolean = false;
 visibleHabilitation: boolean = false;
 visibleProduit: boolean = false;
 visibleModule: boolean = false;
 visibleParametre:boolean = false;
 visibleAgence: boolean = false;
 visibleInstitution: boolean = false;
 visibleContrat:boolean = false;
 visibleLicenceAgence: boolean = false;
 visibleLicencePoste: boolean = false;

  ngOnInit(): void {
    const storedHabilitations = localStorage.getItem('habilitations')
    this.habilitations = storedHabilitations ? JSON.parse(storedHabilitations) : {};
    console.log(this.habilitations)
    this.checkHabilitation(this.habilitations)
  }

  checkHabilitation(habilitations : Habilitation[]) {
    habilitations.forEach(habilitation=>{
      if(habilitation.codeHabilitation === 'GesJR'){
          this.visibleProduit = true;
      }
      if(habilitation.codeHabilitation === "Ges5r"){
        this.visibleUser = true;
    }
      if(habilitation.codeHabilitation === "GessJ"){
        this.visibleAgence = true;
    }
      if(habilitation.codeHabilitation === "Ges4B"){
        this.visibleParametre = true;
    }
      if(habilitation.codeHabilitation === "GesXE"){
        this.visibleHabilitation= true;
    }
      if(habilitation.codeHabilitation === "GesQX"){
        this.visibleProfil= true;
    }
      if(habilitation.codeHabilitation === "GesrC"){
        this.visibleInstitution= true;
    }
      if(habilitation.codeHabilitation === "GesYh"){
        this.visibleModule= true;
    }
      if(habilitation.codeHabilitation === "Gen3q"){
        this.visibleLicenceAgence= true;
    }
    if(habilitation.codeHabilitation === "GenkA"){
      this.visibleLicencePoste= true;
  }
  if(habilitation.codeHabilitation === "GesHY"){
    this.visibleContrat = true;
}


    })

    if(this.visibleHabilitation || this.visibleProfil || this.visibleUser ){
      this.visibleUtilisateur = true
    }
  }



  /*
  generatePDF() {
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

    pdfMake.createPdf(documentDefinition).download('exemple.pdf');
  }*/

}


