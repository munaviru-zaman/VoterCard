import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  showbox: boolean | undefined;
  post: any;
  admsn_no: any;
  candidatesArray: any = [];
  vote_value: any = {};
  chairmanVoted: boolean | undefined;
  vcVoted: boolean | undefined;
  seVoted: boolean | undefined;
  asVoted: boolean | undefined;
  profile_box: boolean | undefined;
  result_button: boolean | undefined;
  show_result: boolean | undefined;
  resultArray: any;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('admsnno')) {
      alert('Please login again');
      this.router.navigateByUrl('login-page');
    }

    if (localStorage.getItem('result')) {
      this.result_button = true;
    }
    this.admsn_no = JSON.parse(localStorage.getItem('admsnno') || '');
    console.log(this.admsn_no);
  }

  profile_box_show() {
    this.profile_box = true;
  }

  logout() {
    localStorage.removeItem('admsnno');
    localStorage.removeItem('');
    this.resultArray = '';
    this.router.navigateByUrl('');
  }

  profile_box_close() {
    this.profile_box = false;
  }

  voteChairman() {
    if (this.chairmanVoted == true) {
      alert('you have already voted');
    } else {
      this.showbox = true;
      this.post = 'Chairman';
      var post = this.post;
      this.http
        .get('http://localhost:3000/candidates/' + post)
        .subscribe((result: any) => {
          if (result) {
            this.candidatesArray = result.candidates;
          }
        });
    }
  }
  voteVC() {
    if (this.vcVoted == true) {
      alert('you have already voted');
    } else {
      this.showbox = true;
      this.post = 'Vice Chairman';
      var post = this.post;
      this.http
        .get('http://localhost:3000/candidates/' + post)
        .subscribe((result: any) => {
          if (result) {
            this.candidatesArray = result.candidates;
          }
        });
    }
  }
  voteSE() {
    if (this.seVoted == true) {
      alert('you have already voted');
    } else {
      this.showbox = true;
      this.post = 'Student Editor';
      var post = this.post;
      this.http
        .get('http://localhost:3000/candidates/' + post)
        .subscribe((result: any) => {
          if (result) {
            this.candidatesArray = result.candidates;
          }
        });
    }
  }
  voteAC() {
    if (this.asVoted == true) {
      alert('you have already voted');
    } else {
      this.showbox = true;
      this.post = 'Association Secretary';
      var post = this.post;
      this.http
        .get('http://localhost:3000/candidates/' + post)
        .subscribe((result: any) => {
          if (result) {
            this.candidatesArray = result.candidates;
          }
        });
    }
  }

  cancel() {
    this.showbox = false;
  }

  vote() {
    var admsn_no = this.vote_value;
    var post = this.post;
    var vote_count = 1;
    const body = {
      admsn_no,
      post,
      vote_count,
    };
    console.log(body);

    return this.http.post('http://localhost:3000/vote', body).subscribe(
      (result: any) => {
        if (result) {
          alert(result.message);

          this.showbox = false;

          if (this.post == 'Chairman') {
            this.chairmanVoted = true;
          } else if (this.post == 'Vice Chairman') {
            this.vcVoted = true;
          } else if (this.post == 'Student Editor') {
            this.seVoted = true;
          } else if (this.post == 'Association Secretary') {
            this.asVoted = true;
          }
        }
      },
      (result) => {
        alert(result.error.message);
      }
    );
  }

  showresult() {
    this.resultArray = JSON.parse(localStorage.getItem('result') || '');

    this.show_result = true;
  }

  closeResultBox() {
    this.show_result = false;
  }
}
