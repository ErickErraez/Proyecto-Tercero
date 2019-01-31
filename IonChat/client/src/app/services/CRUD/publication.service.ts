import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from './../../../environments/environment';
import { Publication } from './../../models/Publication';

@Injectable({
   providedIn: 'root'
})
export class PublicationService {

   url = environment.api + 'publication/';
   options = new RequestOptions();

   constructor(private http: Http) {
      this.options.headers = new Headers();
      this.options.headers.append('apiToken', sessionStorage.getItem('api-token'));
   }

   get(id?: number): Promise<any> {
      if (typeof id === 'undefined') {
         return this.http.get(this.url, this.options).toPromise()
            .then(r => {
               return r.json();
            }).catch(error => {
               return error.json();
            });
      }
      return this.http.get(this.url + '?id=' + id.toString(), this.options).toPromise()
         .then(r => {
            return r.json();
         }).catch(error => {
            return error.json();
         });
   }

   get_paginate(size: number, page: number): Promise<any> {
      return this.http.get(this.url + 'paginate?size=' + size.toString() + '&page=' + page.toString(), this.options).toPromise()
         .then(r => {
            return r.json();
         }).catch(error => {
            return error.json();
         });
   }

   delete(id: number): Promise<any> {
      return this.http.delete(this.url + '?id=' + id.toString(), this.options).toPromise()
         .then(r => {
            return r.json();
         }).catch(error => {
            return error.json();
         });
   }

   post(publication: Publication): Promise<any> {
      return this.http.post(this.url, JSON.stringify(publication), this.options).toPromise()
         .then(r => {
            return r.json();
         }).catch(error => {
            return error.json();
         });
   }

   put(publication: Publication): Promise<any> {
      return this.http.put(this.url, JSON.stringify(publication), this.options).toPromise()
         .then(r => {
            return r.json();
         }).catch(error => {
            return error.json();
         });
   }

}
