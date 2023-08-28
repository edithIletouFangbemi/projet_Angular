import { ContratUnit } from "./ContratUnit";

export interface Contrat {
  institution: string
  produit: string
  typeContrat: string
  nbrAgence: number
  dateDebut: Date
  dateFin: Date
  contratUnits: ContratUnit[]
}
