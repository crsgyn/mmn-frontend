import { Component, Input, OnInit } from '@angular/core';
import { environment as ENV } from 'src/environments/environment';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input() size = "30vh";
  logo = ENV.imageLogoBig;

  constructor() {}

  ngOnInit() {}
}
