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
import {HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
