import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ContratInstitution } from 'src/app/model/contratInstitution';
import { ContratInstitutionServiceService } from 'src/app/services/contratInstitution/contrat-institution-service.service';
import { DetailContratInst } from 'src/app/model/DetailContratInst';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-gestion-contrat',
  templateUrl: './gestion-contrat.component.html',
  styleUrls: ['./gestion-contrat.component.scss']
})
export class GestionContratComponent {
  listeContrat!: DetailContratInst[];
  constructor(
    private contratService: ContratInstitutionServiceService,
    private _router : Router,
    ){}

    ngOnInit(): void {
      this.lister()
    }
    details(contrat: DetailContratInst){
      const data : DetailContratInst = contrat;

      this._router.navigate(["base/detail-contrat"], { queryParams: data})
    }

    editer(contrat: ContratInstitution){
      this.contratService.getOne(contrat.codeContrat).pipe(first()).subscribe({

      })
    }

    lister(){
      this.listeContrat = []
      this.contratService.getAll().pipe(first()).subscribe({
        next: data =>{
          this.listeContrat = data;
          /*
          this.listeContrat.forEach(x=>{
            x.dateDebut = new Date(x.dateDebut)
            x.dateFin = new Date(x.dateFin)
            x.dateDebutFormate = format(x.dateDebut,"dd/MM/yyyy")
            x.dateFinFormate = format(x.dateFin,"dd/MM/yyyy")
          })*/

        },
        error: error=> console.log(error)
      })
    }

    generatePDF() {
      const doc = new jsPDF.default();

      // Ajouter le logo de l'école
      const logoUrl = '../../../assets/files/assets/images/cagecfi.jpg';
      const logoWidth = 35;
      const logoHeight = 45;
      doc.addImage(logoUrl, 'JPEG', 15, 15, logoWidth, logoHeight);

      // Utiliser une police personnalisée pour le titre
      doc.setFont('Montserrat', 'bold');
      doc.setFontSize(20);
      doc.setTextColor('#4285F4'); // Couleur du titre
      doc.text('Rapport des Contrats', 70, 30);

      // Utiliser une police personnalisée pour les informations sur l'école
      doc.setFont('Montserrat', 'normal');
      doc.setFontSize(12);
      doc.setTextColor('#000000'); // Couleur du texte
      doc.text('CAGECFI SA', 70, 40);
      doc.text('Adresse : Boulevard Gnassingbé Eyadema', 70, 45);
      doc.text('Téléphone : +228 22 26 84 61', 70, 50);
      doc.text('Email : cagecfi@cagecfi.com', 70, 55);

      // Tableau de colonnes
      const columns = [
        'NOM INSTITUTION',
        'TYPE ARCHITECTURE',
        'NOMBRE PRODUIT'
      ];

      // Tableau de lignes
      const rows = this.listeContrat.map((contrat: any) => [
        contrat.nomInst,
        contrat.typeArchitecture,
        contrat.nbrProduit,
      ]);

      // Générer le PDF avec le tableau en utilisant 'autoTable'
      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: 70,
        theme: 'striped', // Utiliser un thème de tableau prédéfini pour un meilleur rendu
        styles: {
          font: 'Montserrat', // Utiliser la police personnalisée
          fontSize: 10,
          cellPadding: 5,
        },
        headStyles: {
          fillColor: '#4285F4', // Couleur de fond de l'en-tête du tableau
          textColor: '#ffffff', // Couleur du texte de l'en-tête du tableau
          halign: 'center', // Alignement horizontal du texte de l'en-tête du tableau
        },
        bodyStyles: {
          halign: 'center', // Alignement horizontal du texte du corps du tableau
        },
      });

      // Ajouter un pied de page
      doc.setFont('Montserrat', 'italic');
      doc.setFontSize(14);
      doc.setTextColor('#666666'); // Couleur du pied de page
      doc.text(
        '© cagecfi sa de Lomé ' + new Date().getFullYear(),
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 15,
        { align: 'center' }
      );
      const pdfOutput = doc.output('dataurlnewwindow');

      // Sauvegarder le PDF avec le nom de l'école
      //doc.save('Université_de_Lomé_Rapport_Etudiants.pdf');
    }










}


