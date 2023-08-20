import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'jquery.min', src: "../../assets/files/bower_components/jquery/dist/jquery.min.js" },
  { name: 'jquery-ui', src: "../../assets/files/bower_components/jquery-ui/jquery-ui.min.js" },
  { name:'popper', src:"../../assets/files/bower_components/popper.js/dist/umd/popper.min.js"},
  { name:'bootstrap.min', src:"../../assets/files/bower_components/bootstrap/dist/js/bootstrap.min.js"},
  { name:'slimScroll', src:"assets/files/bower_components/jquery-slimscroll/jquery.slimscroll.js"},
  { name:'modernizr', src: "../../assets/files/bower_components/modernizr/modernizr.js"},
  { name:'scrollBar', src:"../../assets/files/bower_components/modernizr/feature-detects/css-scrollbars.js"},
  { name:'datatablesJquery', src:"../../assets/files/bower_components/datatables.net/js/jquery.dataTables.min.js"},
  { name:'datatableButton', src:"../../assets/files/bower_components/datatables.net-buttons/js/dataTables.buttons.min.js"},
  { name:'jszip', src:"../../assets/files/assets/pages/data-table/js/jszip.min.js"},
  { name:'pdfmake', src:"../../assets/files/assets/pages/data-table/js/pdfmake.min.js"},
  { name:'vfs_fonts', src:"../../assets/files/assets/pages/data-table/js/vfs_fonts.js"},
  { name:'print', src:"../../assets/files/bower_components/datatables.net-buttons/js/buttons.print.min.js"},
  { name:'html5', src:"../../assets/files/bower_components/datatables.net-buttons/js/buttons.html5.min.js"},
  { name:'bootstrap4', src:"../../assets/files/assets/pages/data-table/js/dataTables.bootstrap4.min.js"},
  { name:'dataTables.responsive', src:"../../assets/files/bower_components/datatables.net-responsive/js/dataTables.responsive.min.js"},
  { name:'responsive.bootstrap4', src:"../../assets/files/bower_components/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"},
  { name:'i18next', src: "../../assets/files/bower_components/i18next/i18next.min.js"},
  { name:'i18nextXHRBackend', src: "../../assets/files/bower_components/i18next-xhr-backend/i18nextXHRBackend.min.js"},
  { name:'languagedetector', src:"../../assets/files/bower_components/i18next-browser-languagedetector/i18nextBrowserLanguageDetector.min.js"},
  { name:'jquery-i18next', src: "../../assets/files/bower_components/jquery-i18next/jquery-i18next.min.js"},
  { name:'data-table-custom', src: "../../assets/files/assets/pages/data-table/js/data-table-custom.js"},
  { name:'pcoded', src: "../../assets/files/assets/js/pcoded.min.js"},
  { name:'vartical-layout', src: "assets/files/assets/js/vartical-layout.min.js"},
  { name:'mCustomScrollbar', src: "assets/files/assets/js/jquery.mCustomScrollbar.concat.min.js"},
  { name:'script', src: "assets/files/assets/js/script.js"},
  { name:'script.min', src: "assets/files/assets/js/script.min.js"}

];

declare var document: any;

@Injectable()
export class DynamicScriptLoaderService3 {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}
