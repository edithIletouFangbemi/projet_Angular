import { Agence } from "./agence";
import { Institution } from "./institution";

export interface LicenceServeurReturn
{
  code: string;
  agence: Agence;
  institution: Institution;
  statut: any;
  dateCreation: Date;
  nbrLicenceServeur: number;
}
