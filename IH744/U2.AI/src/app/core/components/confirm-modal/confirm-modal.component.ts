import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {

  @Input() isOpen: boolean = false;
  @Input() title: string = '¿Estás seguro?';
  @Input() message: string = '¿Quieres proceder con esta acción?';
  @Input() context: string | number | object | null = null;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<string | number | object | null>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit(this.context);
  }
}
