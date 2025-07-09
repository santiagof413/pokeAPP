import { Component, input, output } from '@angular/core';
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
  searchQueryInput = output<string>();
  searchQueryButton = output<string>();
  placeholder = input<string>('Search');

  constructor() {
    this.searhBarControl = new FormControl('');
    this.formSearchBar = new FormGroup({
      searhBarControl: this.searhBarControl,
    });
  }

  submitInput() {
    const searchValue = this.searhBarControl.value || '';
    const contentSearchBar = searchValue.trim().toLowerCase();
    this.searchQueryInput.emit(contentSearchBar);
  }

  submitButton() {
    const searchValue = this.searhBarControl.value || '';
    const contentSearchBar = searchValue.trim().toLowerCase();
    this.searchQueryButton.emit(contentSearchBar);
  }
}
