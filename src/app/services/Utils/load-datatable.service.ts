import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadDatatableService {

  constructor() { }

  loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = url;

      scriptElement.onload = () => {
        resolve();
      };

      scriptElement.onerror = () => {
        reject();
      };

      document.body.appendChild(scriptElement);
    });
  }
}
