import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  adminlogin(adminId: any, adminPswd: any) {
    const body = {
      adminId,
      adminPswd,
    };
    return this.http.post('http://localhost:3000/adminlogin', body);
  }

  addingVoter(
    name: any,
    admsn_no: any,
    dept: any,
    batch: any,
    pswd: any,
    vote_status: any
  ) {
    const body = {
      name,
      admsn_no,
      dept,
      batch,
      pswd,
      vote_status,
    };
    return this.http.post('http://localhost:3000/addvoter', body);
  }

  login(admsn_no: any, pswd: any) {
    const body = {
      admsn_no,
      pswd,
    };

    return this.http.post('http://localhost:3000/login', body);
  }

  addingCandidate(
    admsn_no: any,
    name: any,
    post: any,
    party: any,
    vote_count: any
  ) {
    const body = {
      admsn_no,
      name,
      post,
      party,
      vote_count,
    };

    return this.http.post('http://localhost:3000/addcandidate', body);
  }

  // searchCandidate(post: any) {
  //   return this.http.get('http://localhost:3000/candidates/' + post);
  // }
}
