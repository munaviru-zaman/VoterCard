import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  adminid: any;
  adminpswd: any;
  constructor(private router: Router, private service: DataService) {}

  ngOnInit(): void {}
  adminlogin() {
    var adminId = this.adminid;
    var adminPswd = this.adminpswd;
    this.service.adminlogin(adminId, adminPswd).subscribe(
      (result: any) => {
        if (result) {
          alert(result.message);
          localStorage.setItem('adminid', JSON.stringify(result.admin));
          this.router.navigateByUrl('admin-home');
        }
      },
      (result) => {
        alert(result.error.message);
      }
    );
  }
}
