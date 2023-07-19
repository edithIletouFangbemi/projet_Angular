import { Component } from '@angular/core';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss']
})
export class ParametrageComponent {

  


}

function checkRelatedCheckboxes(checkbox: HTMLInputElement, relatedCheckboxes: HTMLInputElement[]): void {
  if (checkbox.checked) {
    relatedCheckboxes.forEach((cb) => {
      cb.checked = true;
    });
  }
}
