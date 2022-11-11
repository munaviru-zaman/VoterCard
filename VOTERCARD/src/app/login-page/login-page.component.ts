import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  admsn_no: any;
  pswd: any;
  constructor(private router: Router, private service: DataService) {}

  ngOnInit(): void {}
  login() {
    var admsn_no = this.admsn_no;
    var pswd = this.pswd;
    this.service.login(admsn_no, pswd).subscribe(
      (result: any) => {
        if (result) {
          alert(result.message);
          localStorage.setItem('admsnno', JSON.stringify(result.voter));
          this.router.navigateByUrl('home-page');
        }
      },
      (result) => {
        alert(result.error.message);
      }
    );
  }
  admin() {
    this.router.navigateByUrl('admin-login');
  }
}
