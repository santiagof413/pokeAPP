import { Component, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {

  action = output<string>();

  emit(action: string) {
    this.action.emit(action);
  }
}
