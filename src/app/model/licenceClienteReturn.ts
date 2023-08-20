import { Agence } from "./agence";
import { Institution } from "./institution";

export class LicenceClienteReturn{
  institution!:Institution;
  agence!: Agence;
  dateCreation!: Date;
  dateCreationFormate!: string;
  typeContrat!: string;
  codeLicence!: string;
  key!: string;
  statut!: any;
}
