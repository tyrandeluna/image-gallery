import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  goToHome() {
    this.route.navigate(['home/homecarousel']);
  }

  goToCadastro() {
    this.route.navigate(['galeria/manter-galeria']);
  }
}
