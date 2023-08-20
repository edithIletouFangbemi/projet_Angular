import { ProduitDetail } from "./produitDetail";

export class AgenceDetail{
    codecontrat!: string;
    typeContrat!: string;
    nbrAgence!: number;
    nbrPosteTotal!: number;
    nbrPosteActif!: number;
    produits!: ProduitDetail[];
}
