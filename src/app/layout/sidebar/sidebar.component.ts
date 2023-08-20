import { Component } from '@angular/core';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';


pdfMake!.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

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
  }

}


