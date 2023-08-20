import { Institution } from "./institution";
import { Produit } from "./produit";

export class DetailContratInstitution
{
  codeContrat!: string;
  libelleContrat!: string;
  dateDebut!: Date;
  dateDebutFormate!: string;
  dateFin!: Date;
  dateFinFormate!: string;
  nbrPosteTotal!: any;
  nbrAgence!: any;
  statut: any;
  typeContrat!: string;
  produits!: Produit[];
  institution!: Institution;

}
