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
  MessageBoxTranslateI,
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

  @Output() onMessage = new EventEmitter<MessageBoxTranslateI>();

  public fb = inject(FormBuilder);

  public frm = this.fb.group({
    prompt: ['', [Validators.required, Validators.minLength(3)]],
    lang: ['', Validators.required],
  });

  onSubmit() {
    if (this.frm.invalid) return;

    const { prompt, lang } = this.frm.value;

    this.onMessage.emit({ lang, prompt } as MessageBoxTranslateI);
    this.frm.reset();
  }
}
