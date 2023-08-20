import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../services/shared/dynamic-script-loader-service.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit{

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService){

  }

  ngOnInit(): void {
    this.loadScripts()
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load(
    'jquery.min',
    'jquery-ui',
    'popper',
    'bootstrap.min',
    'slimScroll',
    'modernizr',
    'scrollBar',
    'datatablesJquery',
    'datatableButton',
    'jszip',
  'pdfmake',
  'vfs_fonts',
  'print',
  'html5',
  'bootstrap4',
  'dataTables.responsive',
  'responsive.bootstrap4',
  'i18next',
  'i18nextXHRBackend',
  'languagedetector',
  'jquery-i18next',
  'data-table-custom',
  'pcoded',
  'vartical-layout',
  'mCustomScrollbar',
  'script',
  'script.min'
    ).then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

}
