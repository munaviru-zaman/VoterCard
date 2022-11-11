import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  show_candidates: boolean | undefined;
  add_candidates: boolean | undefined;
  show_voters: boolean | undefined;
  add_voters: boolean | undefined;
  show_result: boolean | undefined;
  edit_candidate_box: boolean | undefined;
  delete_candidate_box: boolean | undefined;
  edit_voter_box: boolean | undefined;
  delete_voter_box: boolean | undefined;
  box: boolean | undefined;
  profile_box: boolean | undefined;

  winner: any;
  resultArray: any = [];
  result_obj: any;
  admin_id: any;
  editname: any;
  editadmsn_no: any;
  editdept: any;
  editbatch: any;
  newname: any;
  newadmsn_no: any;
  newdeot: any;
  newbatch: any;
  single_obj: any;
  newpost: any;
  newparty: any;
  editpost: any;
  editparty: any;
  voterArray: any;
  candidateArray: any;
  searchpost: any = 'Select post';
  post: any = 'Select post';
  party: any = 'Select party';
  admsn_no: any;
  name: any;
  batch: any;
  dept: any = 'Select Department';
  constructor(
    private service: DataService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('adminid')) {
      alert('Please Login again');
      this.router.navigateByUrl('');
    }
    this.add_candidates = true;
    this.admin_id = JSON.parse(localStorage.getItem('adminid') || '');
  }
  //-------------------------------------------------------------------------------------------
  // -----------box show-------------------

  profile_box_show() {
    this.profile_box = true;
  }
  adminlogout() {
    localStorage.removeItem('adminid');
    this.router.navigateByUrl('');
  }

  profile_box_close() {
    this.profile_box = false;
  }

  showCandidates() {
    this.show_candidates = true;
    this.add_candidates = false;
    this.show_voters = false;
    this.add_voters = false;
    this.show_result = false;
  }
  showAddCandidates() {
    this.add_candidates = true;
    this.show_candidates = false;
    this.show_voters = false;
    this.add_voters = false;
    this.show_result = false;
  }
  showVoters() {
    this.show_voters = true;
    this.add_candidates = false;
    this.show_candidates = false;
    this.add_voters = false;
    this.show_result = false;
    return this.http
      .get('http://localhost:3000/voterlist')
      .subscribe((result: any) => {
        if (result) {
          this.voterArray = result.result;
        }
      });
  }
  showAddVoters() {
    this.add_voters = true;
    this.show_voters = false;
    this.add_candidates = false;
    this.show_candidates = false;
    this.show_result = false;
  }
  showResult() {
    this.show_result = true;
    this.show_voters = false;
    this.add_candidates = false;
    this.show_candidates = false;
    this.add_voters = false;
  }

  // -----------xxxx-------------------
  //---------------------------------------------------------------------------------------------------
  // ------------adding-----------------------

  adding_voter() {
    var name = this.name;
    var admsn_no = this.admsn_no;
    var batch = this.batch;
    var dept = this.dept;
    var pswd = this.admsn_no;
    var vote_status = false;
    this.service
      .addingVoter(name, admsn_no, dept, batch, pswd, vote_status)
      .subscribe(
        (result: any) => {
          if (result) {
            alert(result.message);
            this.name = '';
            this.admsn_no = '';
            this.dept = '';
            this.batch = '';
          }
        },
        (result) => {
          alert(result.error.message);
        }
      );
  }

  //-------------------------------------------------------------------------------------------------------------------
  //-----------------------xxx-------------------------------------------------
  //------------------------------------------------------------------------------------------------------

  adding_candidate() {
    var name = this.name;
    var admsn_no = this.admsn_no;
    var post = this.post;
    var party = this.party;
    this.service.addingCandidate(admsn_no, name, post, party, 0).subscribe(
      (result: any) => {
        if (result) {
          alert(result.message);
          this.name = '';
          this.admsn_no = '';
          this.post = 'Select post';
          this.party = 'Select party';
        }
      },
      (result) => {
        alert(result.error.message);
      }
    );
  }

  // ------------xxxx-----------------------
  //------------------------------------------------------------------------------------------------------------------
  //-------------searching-----------------------

  searchCandidate() {
    var post = this.searchpost;
    this.http
      .get('http://localhost:3000/candidatelist/' + post)
      .subscribe((result: any) => {
        if (result) {
          this.candidateArray = result.result;
        }
      });
  }

  //---------------------xxxxxxx--------------------------
  //------------------------------------------------------------------------------------------------------------------------
  //--------------------editcandidate----------------------

  showCandidateEditBox(admsn_no: any) {
    return this.http
      .get('http://localhost:3000/showcandidate/' + admsn_no)
      .subscribe((result: any) => {
        if (result) {
          this.box = true;
          this.edit_candidate_box = true;
          this.single_obj = result.result;
          this.name = this.single_obj.name;
          this.admsn_no = this.single_obj.admsn_no;
          this.editpost = this.single_obj.post;
          this.editparty = this.single_obj.party;
        }
      });
  }

  editCandidate() {
    var admsn_no = this.admsn_no;
    var newpost = this.editpost;
    var newparty = this.editparty;
    const body = {
      newpost,
      newparty,
    };
    return this.http
      .patch('http://localhost:3000/updatecandidate/' + admsn_no, body)
      .subscribe(
        (result: any) => {
          if (result) {
            alert(result.message);
            this.box = false;

            this.searchCandidate();
            this.edit_candidate_box = false;
          }
        },
        (result) => {
          alert(result.error.message);
        }
      );
  }

  cancelcandidateedit() {
    this.edit_candidate_box = false;
    this.box = false;
  }

  //-------------------------xxxx--------------------------------------
  //--------------------------------------------------------------------------------------------------------------
  //-------------------------editvoter---------------------------------------

  showVoterEditBox(admsn_no: any) {
    this.admsn_no = admsn_no;
    return this.http
      .get('http://localhost:3000/showvoter/' + admsn_no)
      .subscribe((result: any) => {
        if (result) {
          this.box = true;
          this.edit_voter_box = true;
          this.single_obj = result.result;
          this.editname = this.single_obj.name;
          this.editadmsn_no = this.single_obj.admsn_no;
          this.editdept = this.single_obj.dept;
          this.editbatch = this.single_obj.batch;
        }
      });
  }
  editVoter() {
    var admsn_no = this.admsn_no;
    var newname = this.editname;
    var newadmsn_no = this.editadmsn_no;
    var newdept = this.editdept;
    var newbatch = this.editbatch;
    const body = {
      newname,
      newadmsn_no,
      newdept,
      newbatch,
    };

    return this.http
      .patch('http://localhost:3000/updatevoter/' + admsn_no, body)
      .subscribe(
        (result: any) => {
          if (result) {
            alert(result.message);
            this.showVoters();
            this.box = false;

            this.edit_voter_box = false;
          }
        },
        (result) => {
          alert(result.error.message);
        }
      );
  }
  cancelvoteredit() {
    this.edit_voter_box = false;
    this.box = false;
  }

  //-----------------------------------xxxxx-----------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------deletecandidate------------------------------------

  showCandidateDeleteBox(admsn_no: any) {
    return this.http
      .get('http://localhost:3000/showcandidate/' + admsn_no)
      .subscribe((result: any) => {
        if (result) {
          this.box = true;
          this.delete_candidate_box = true;
          this.single_obj = result.result;
          this.name = this.single_obj.name;
          this.admsn_no = this.single_obj.admsn_no;
          this.post = this.single_obj.post;
          this.party = this.single_obj.party;
        }
      });
  }

  deleteCandidate() {
    var admsn_no = this.admsn_no;
    return this.http
      .delete('http://localhost:3000/deletecandidate/' + admsn_no)
      .subscribe(
        (result: any) => {
          if (result) {
            alert(result.message);
            this.searchCandidate();
            this.box = false;

            this.delete_candidate_box = false;
          }
        },
        (result) => {
          alert(result.error.message);
        }
      );
  }

  cancelcandidatedelete() {
    this.delete_candidate_box = false;
    this.box = false;
  }

  //---------------------xxxx--------------------------------------------
  //------------------------------------------------------------------------------------------------------------------------------------
  //-------------------deletevoter------------------------------------------------

  showVoterDeleteBox(admsn_no: any) {
    return this.http
      .get('http://localhost:3000/showvoter/' + admsn_no)
      .subscribe((result: any) => {
        if (result) {
          this.box = true;
          this.delete_voter_box = true;
          this.single_obj = result.result;
          this.name = this.single_obj.name;
          this.admsn_no = this.single_obj.admsn_no;
          this.dept = this.single_obj.dept;
          this.batch = this.single_obj.batch;
        }
      });
  }

  deleteVoter() {
    var admsn_no = this.admsn_no;
    return this.http
      .delete('http://localhost:3000/deletevoter/' + admsn_no)
      .subscribe(
        (result: any) => {
          if (result) {
            this.http
              .delete('http://localhost:3000/deletecandidate/' + admsn_no)
              .subscribe((result: any) => {
                if (result) {
                  this.searchCandidate();
                }
              });
            alert(result.message);

            this.showVoters();
            this.box = false;

            this.delete_voter_box = false;
          }
        },
        (result) => {
          alert(result.error.message);
        }
      );
  }

  cancelvoterdelete() {
    this.delete_voter_box = false;
    this.box = false;
  }

  //----------------------xxxxxx---------------------------------
  //------------------------------------------------------------------------------------------------------------------
  //--------------------result------------------------------------------
  searchWinner() {
    var post = this.searchpost;
    return this.http
      .get('http://localhost:3000/winner/' + post)
      .subscribe((result: any) => {
        if (result) {
          this.winner = result;
        }
      });
  }
  sendResult() {
    
    this.resultArray.push(this.winner[0]);
    console.log(this.resultArray);
  
    localStorage.setItem('result', JSON.stringify(this.resultArray));
  }
}
