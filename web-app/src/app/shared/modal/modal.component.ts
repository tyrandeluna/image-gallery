import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() doExclusion = new EventEmitter<number>(null);
  @Input() idItem: number;

  constructor() { }

  ngOnInit() {
  }

  exclusionConfirmation() {
    this.doExclusion.emit(this.idItem);
  }
}
