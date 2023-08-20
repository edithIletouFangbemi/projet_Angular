import { Agence } from "./agence";
import { Institution } from "./institution";

export class LicenceServeurReturn
{
  code!: string;
  agence!: Agence;
  institution!: Institution;
  statut!: any;
  dateCreation!: Date;
  typeContrat!: string;
}
