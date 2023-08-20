import { Institution } from "./institution";
import { Produit } from "./produit";

export class ContratInstitution
{
  codeContrat!:string;
  libelleContrat!: string;
  dateDebut!: Date;
  dateFin!: Date;
  nbrPosteTotal!: any;
  nbrAgence!: any;
  institution!: any;
  produit!: Produit;
  typeContrat!: string;
  dateDebutFormate!: any;
  dateFinFormate!: any;
}
