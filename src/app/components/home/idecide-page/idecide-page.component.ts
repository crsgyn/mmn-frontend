import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-idecide-page',
  templateUrl: './idecide-page.component.html',
  styleUrls: ['./idecide-page.component.scss']
})
export class IdecidePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  goToIDecide() {
    const URL = 'https://login.idecideinteractive.com/members/';
    window.open(URL, '_blank');
  }
}
