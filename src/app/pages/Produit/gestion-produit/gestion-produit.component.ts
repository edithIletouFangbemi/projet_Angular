import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-produit',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.scss']
})
export class GestionProduitComponent {
  desactiver(){
    Swal.fire({
      title: 'Confirmation de desactivation',
      text: 'Êtes-vous sûr de vouloir desactiver ce produit cet?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Desactiver'
  })
  }

}
