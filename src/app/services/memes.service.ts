import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMeme } from '../Meme';

@Injectable({
  providedIn: 'root'
})
export class MemesService {

  private url                 = "https://samemes.conveyor.cloud/api/";
  private remoteUrl           = "https://192.168.0.112:45455/api/";    
  private _memesUrl           = this.url + "Memes";
  private _randMemesUrl       = this.url + "RandMemes";
  private _addCommentUrl      = this.url + "AddComment";
  private _addLikeUrl         = this.url + "AddLike";
  private _removeLikeUrl      = this.url + "RemoveLike";
  private _getMostLiked       = this.url + "GetMostLiked";
  constructor(private http: HttpClient) { }

  getMemes(): Observable<IMeme[]> { 
    console.log('getting memes .....');
    return this.http.get<IMeme[]>(this._memesUrl);
}
getRandMems(): Observable<IMeme[]>{
    console.log('getting memes .....');
    return this.http.get<IMeme[]>(this._randMemesUrl);
}
getMostLikedMemes(): Observable<IMeme[]> {
    console.log('getting memes .....');
    return this.http.get<IMeme[]>(this._getMostLiked);
}
addComment(id, comment, email){
    console.log('adding comment .....');
    return this.http.get(this._addCommentUrl + '?memeId=' + id + '&comment=' + comment + '&email=' + email);
}
addLike(id, email) {
    console.log('adding like .....');
    return this.http.get<any>(this._addLikeUrl + '?memeId=' + id + '&email=' + email);
}

}
