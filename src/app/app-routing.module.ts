import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BaseComponent } from './base/base.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfilComponent } from './pages/Utilisateur/profil/profil.component';
import { GestionUtilisateurComponent } from './pages/Utilisateur/gestion-utilisateur/gestion-utilisateur.component';
import { GestionInstitutionComponent } from './pages/Institution/gestion-institution/gestion-institution.component';
import { GestionAgenceComponent } from './pages/Agence/gestion-agence/gestion-agence.component';
import { GestionProduitComponent } from './pages/Produit/gestion-produit/gestion-produit.component';
import { DetailProduitComponent } from './pages/Produit/detail-produit/detail-produit.component';
import { GestionModuleComponent } from './pages/Produit/module/gestion-module/gestion-module.component';
import { ParametrageComponent } from './pages/gestion-licence/parametrage/parametrage.component';
import { LicenceServeurComponent } from './pages/gestion-licence/licence-serveur/licence-serveur.component';
import { LicenceClienteComponent } from './pages/gestion-licence/licence-cliente/licence-cliente.component';
import { DetailsComponent } from './pages/Utilisateur/details/details.component';



const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  }
  ,{
    path:'base',
    component: BaseComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
      ,{
        path:'profil',
        component:ProfilComponent
      }
      ,{
        path:'gestion-utilisateur',
        component:GestionUtilisateurComponent
      }
      ,{
        path:'gestion-institution',
        component:GestionInstitutionComponent
      }
      ,{
        path:'gestion-agence',
        component:GestionAgenceComponent
      }
      ,{
        path:'gestion-produit',
        component:GestionProduitComponent
      }
      ,{
        path:'detail-produit',
        component:DetailProduitComponent
      }
      ,{
        path:'gestion-module',
        component:GestionModuleComponent
      }
      ,{
        path:'parametrage',
        component:ParametrageComponent
      }
      ,{
        path:'licence-serveur',
        component:LicenceServeurComponent
      }
      ,{
        path:'licence-cliente',
        component:LicenceClienteComponent
      }
      ,{
        path:'detail',
        component:DetailsComponent
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
