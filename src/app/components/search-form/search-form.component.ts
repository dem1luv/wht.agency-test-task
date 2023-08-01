import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBreed } from '../../types';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  @Input() form!: FormGroup;
  @Input() breedList!: IBreed[] | null;
  @Input() breedListLoaded!: boolean | null;
  @Output() selectChange: EventEmitter<void> = new EventEmitter<void>();

  limitValues: number[] = [10, 20, 50, 100];
  trackById = (index: number, item: any) => item.id;

  onSelectChange() {
    this.selectChange.emit();
  }
}
