import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  formSearchBar: FormGroup;
  searhBarControl: FormControl;
  searchQuery=output<string>();

  constructor() {
    this.searhBarControl = new FormControl('');
    this.formSearchBar = new FormGroup({
      searhBarControl: this.searhBarControl,
    });
  }

  onSubmit() {
  const searchValue = this.searhBarControl.value || '';
  const contentSearchBar = searchValue.trim().toLowerCase();
  this.searchQuery.emit(contentSearchBar);
}

}
