import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormControl, FormGroup } from '@angular/forms';
import { IBreed } from '../../types/common/breed.interface';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  @Input() form!: FormGroup;
  @Input() breedList!: IBreed[] | null;
  @Output() selectChange: EventEmitter<void> = new EventEmitter<void>();

  limitValues: number[] = [10, 20, 50, 100];

  onSelectChange() {
    this.selectChange.emit();
  }
}
