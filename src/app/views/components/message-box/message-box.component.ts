import {
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageBoxI } from '@interfaces/message-box.interface';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './message-box.component.html',
  styles: ``,
})
export class MessageBoxComponent {
  @Input() placeholder: string = '';
  @Input({ transform: booleanAttribute }) desableCorrection: boolean = false;

  @Output() onMessage = new EventEmitter<MessageBoxI>();

  public fb = inject(FormBuilder);

  public frm = this.fb.group({
    prompt: ['', [Validators.required, Validators.minLength(3)]],
    file: [''],
  });

  onSubmit() {
    if (this.frm.invalid) return;

    const { prompt, file } = this.frm.value;

    this.onMessage.emit({ file, prompt } as MessageBoxI);
    this.frm.reset();
  }

  handleFile(event: any) {
    const file = event.target.files.item(0);
    this.frm.controls.file.setValue(file);
  }
}
