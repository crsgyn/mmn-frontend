import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('content') modalContent: ElementRef;
  @ViewChild('externalContent') externalContent: HTMLElement;
  @Input('title') modalTitle: string;

  closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  open() {
    this.modalService
      .open(this.modalContent, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  close() {
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
