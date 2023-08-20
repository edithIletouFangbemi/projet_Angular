import { Profil } from "./Profil";

export class Utilisateur
{
  codeUser? : any;
  lastname?: string = "";
  firstname?: string = "";
  email: string = "";
  role : string = "";
  profil!: Profil;
  statut?: any;
  token!:any;
}
