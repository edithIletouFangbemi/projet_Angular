import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavComponent } from './layout/nav/nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BaseComponent } from './base/base.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './pages/Utilisateur/profil/profil.component';
import { GestionUtilisateurComponent } from './pages/Utilisateur/gestion-utilisateur/gestion-utilisateur.component';
import { DroitComponent } from './pages/Utilisateur/droit/droit.component';
import { GestionInstitutionComponent } from './pages/Institution/gestion-institution/gestion-institution.component';
import { GestionAgenceComponent } from './pages/Agence/gestion-agence/gestion-agence.component';
import { GestionProduitComponent } from './pages/Produit/gestion-produit/gestion-produit.component';
import { DetailProduitComponent } from './pages/Produit/detail-produit/detail-produit.component';
import { GestionModuleComponent } from './pages/Produit/module/gestion-module/gestion-module.component';
import { ParametrageComponent } from './pages/gestion-licence/parametrage/parametrage.component';
import { LicenceServeurComponent } from './pages/gestion-licence/licence-serveur/licence-serveur.component';
import { LicenceClienteComponent } from './pages/gestion-licence/licence-cliente/licence-cliente.component';
import { DetailsComponent } from './pages/Utilisateur/details/details.component';
import { DetailComponent } from './pages/gestion-licence/detail/detail.component';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionProfilComponent } from './pages/Utilisateur/gestion-profil/gestion-profil.component';
import { NewComponent } from './new/new.component';
import { TestComponent } from './test/test.component';
import { DynamicScriptLoaderService } from './services/shared/dynamic-script-loader-service.service';
import { DynamicScriptLoaderService2 } from './services/shared/dynamic-script-loader-service2.service';
import { DynamicScriptLoaderService3 } from './services/shared/dynamic-script-loader-service3.service';
import { GestionContratComponent } from './pages/gestion-contrat/gestion-contrat.component';
import { AuthInterceptorService } from './services/Utils/auth-interceptor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ResetComponent } from './login/forgotReset/reset/reset.component';
import { AuthGard } from './services/Utils/authGard/authGard';
import { ForgotComponent } from './login/forgotReset/forgot/forgot.component';
import { ModifierComponent } from './login/forgotReset/modifier/modifier.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailContratComponent } from './pages/gestion-contrat/detail/detail-contrat/detail-contrat.component';
import { DetailAgenceComponent } from './pages/Agence/detail-agence/detail-agence.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DataTablesModule } from 'angular-datatables';
import { ActiverComponent } from './pages/gestion-contrat/activerModule/activer/activer.component';
import { ActiverModuleComponent } from './pages/Agence/activation/activer-module/activer-module.component';
import { ChartModule } from 'angular-highcharts';
import { DetailLicenceComponent } from './pages/gestion-licence/licence-serveur/detail/detail-licence/detail-licence.component';
import { DureeVieComponent } from './pages/duree_vie/duree-vie/duree-vie.component';
import { DetailPosteComponent } from './pages/gestion-licence/detail-poste-licence/detail-poste/detail-poste.component';
import { CreerContratComponent } from './pages/gestion-contrat/creer-contrat/creer-contrat.component';
import { BasicInlineEditingComponent } from './pages/basic-inline/basic-inline-editing/basic-inline-editing.component';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavComponent,
    DashboardComponent,
    BaseComponent,
    LoginComponent,
    ProfilComponent,
    GestionUtilisateurComponent,
    DroitComponent,
    GestionInstitutionComponent,
    GestionAgenceComponent,
    GestionProduitComponent,
    DetailProduitComponent,
    GestionModuleComponent,
    ParametrageComponent,
    LicenceServeurComponent,
    LicenceClienteComponent,
    DetailsComponent,
    DetailComponent,
    GestionProfilComponent,
    NewComponent,
    TestComponent,
    GestionContratComponent,
    ResetComponent,
    ForgotComponent,
    ModifierComponent,
    NotFoundComponent,
    DetailContratComponent,
    DetailAgenceComponent,
    ActiverComponent,
    ActiverModuleComponent,
    DetailLicenceComponent,
    DureeVieComponent,
    DetailPosteComponent,
    CreerContratComponent,
    BasicInlineEditingComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DataTablesModule,
    HighchartsChartModule,
    ChartModule,


  ],
  providers: [
    AuthGard,
    DynamicScriptLoaderService,
    DynamicScriptLoaderService2,
    DynamicScriptLoaderService3
    ,
    DatePipe
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
