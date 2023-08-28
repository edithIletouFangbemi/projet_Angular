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
import { GestionProfilComponent } from './pages/Utilisateur/gestion-profil/gestion-profil.component';
import { NewComponent } from './new/new.component';
import { TestComponent } from './test/test.component';
import { GestionContratComponent } from './pages/gestion-contrat/gestion-contrat.component';
import { ResetComponent } from './login/forgotReset/reset/reset.component';
import { AuthGard } from './services/Utils/authGard/authGard';
import { ForgotComponent } from './login/forgotReset/forgot/forgot.component';
import { ModifierComponent } from './login/forgotReset/modifier/modifier.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DroitComponent } from './pages/Utilisateur/droit/droit.component';
import { DetailContratComponent } from './pages/gestion-contrat/detail/detail-contrat/detail-contrat.component';
import { DetailAgenceComponent } from './pages/Agence/detail-agence/detail-agence.component';
import { ActiverComponent } from './pages/gestion-contrat/activerModule/activer/activer.component';
import { ActiverModuleComponent } from './pages/Agence/activation/activer-module/activer-module.component';
import { DetailLicenceComponent } from './pages/gestion-licence/licence-serveur/detail/detail-licence/detail-licence.component';
import { DureeVieComponent } from './pages/duree_vie/duree-vie/duree-vie.component';
import { TokenExpirationGuardService } from './services/Utils/tokenGard/token-expiration-guard.service';
import { DetailComponent } from './pages/gestion-licence/detail/detail.component';
import { DetailPosteComponent } from './pages/gestion-licence/detail-poste-licence/detail-poste/detail-poste.component';
import { CreerContratComponent } from './pages/gestion-contrat/creer-contrat/creer-contrat.component';
import { BasicInlineEditingComponent } from './pages/basic-inline/basic-inline-editing/basic-inline-editing.component';




const routes: Routes = [
  {
    path:'',
    component: ResetComponent
  }
  ,{
    path:'forgotPassword',
    component: ForgotComponent
  }
  ,{
    path:'resetPassword',
    component: ModifierComponent
  }


  ,{
    path:'base',
    component: BaseComponent,
    canActivate: [AuthGard],
    canActivateChild: [AuthGard],
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
        path:'droit',
        component:DroitComponent
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
      ,{
        path:'gestion-profil',
        component:GestionProfilComponent
      }
      ,{
        path:'detail-agence',
        component: DetailAgenceComponent
      }
      ,{
        path:'gestion-contrat',
        component: GestionContratComponent,

      }
      , {
        path:'detail-contrat',
        component:DetailContratComponent
      }
      , {
        path:'activer',
        component:ActiverComponent
      }
      , {
        path:'activation',
        component:ActiverModuleComponent
      }
      ,{
          path:'detail-licence-serveur',
          component: DetailLicenceComponent
      }
      ,{
        path:'parametre-vie',
        component:DureeVieComponent
    }
    ,{
      path:'detail-licence-cliente',
      component:DetailComponent
  }
    ,{
      path:'detail-poste',
      component:DetailPosteComponent
  }

  ,{
    path:'nouveau-contrat',
    component:CreerContratComponent
}
,{
  path:'basic',
  component:BasicInlineEditingComponent
}



    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
