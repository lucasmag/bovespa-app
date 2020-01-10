import {Component, ViewEncapsulation} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngbd-modal-options',
    templateUrl: 'modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})

export class Modal {
    company: any;
    openCompanyModal: any;
    stockDataLoaded: boolean;
    dataSource: any;


    constructor(private modalService: NgbModal) {
    }

    openWindow(modal) {
        this.modalService.open(modal, {windowClass: 'dark-modal', size: 'lg', centered: true});
    }
}
