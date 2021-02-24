import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirm-popup.html',
})
export class ConfirmationDialogComponent implements OnInit {
  [x: string]: any;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
    
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
