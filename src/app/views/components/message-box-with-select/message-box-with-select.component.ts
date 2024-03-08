import {
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MessageBoxWithSelectI,
  SelectListI,
} from '@interfaces/message-box.interface';

@Component({
  selector: 'app-message-box-with-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './message-box-with-select.component.html',
  styles: ``,
})
export class MessageBoxWithSelectComponent {
  @Input() placeholder: string = '';
  @Input({ transform: booleanAttribute }) desableCorrection: boolean = false;

  @Input({ required: true }) selectList: SelectListI[] = [];

  @Output() onMessage = new EventEmitter<MessageBoxWithSelectI>();

  public fb = inject(FormBuilder);

  public frm = this.fb.group({
    prompt: ['', [Validators.required, Validators.minLength(3)]],
    select: ['', Validators.required],
  });

  onSubmit() {
    if (this.frm.invalid) return;

    const { prompt, select } = this.frm.value;

    this.onMessage.emit({ select, prompt } as MessageBoxWithSelectI);
    this.frm.reset();
  }
}
