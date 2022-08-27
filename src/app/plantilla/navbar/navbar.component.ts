import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = null;
  // @Output() emitToggle = new EventEmitter();

  constructor(private auth_s:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  logout() {
    this.auth_s.logout();
    this.router.navigate(['login']);
  }
}
