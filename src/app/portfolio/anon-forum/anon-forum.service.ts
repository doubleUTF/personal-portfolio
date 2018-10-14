import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnonForumService {

  appState=new Subject();
  constructor(private http:HttpClient) {
    environment.production ? this.rootPath = 'https://www.davidlau.xyz/api' : this.rootPath= 'http://localhost:3000/api'
  }

  rootPath;
  getBoards(){
    return this.http.get(`${this.rootPath}/threads`)
  }

  getThread(threadId){
    let params= new HttpParams().set('thread_id',threadId);
    return this.http.get(`${this.rootPath}/replies`,{params});
  }
}
