import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ResponseApi} from '@approot/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private readonly httpHeaders = new HttpHeaders();
  private readonly httpOptions = {};

  constructor(
    private httpClient: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      })
    };
    this.httpHeaders = new HttpHeaders(this.httpOptions);
  }

  private static extractData(response: HttpResponse<ResponseApi<any>>): object {
    const responseData: any = response;
    console.log(responseData)
    if (!responseData) {
      return {};
    }
    if (!responseData.success) {
      throw new Error(responseData.message);
    }
    return responseData.data;
  }

  get(uri: string, params?: any): Observable<any> {
    return this.httpClient
      .get(uri, {headers: this.httpHeaders, params })
      .pipe(
        map(BaseService.extractData),
      );
  }

  // api post method
  post(uri: string, data?: any, params?: HttpParams): Observable<any> {
    return this.httpClient
      .post(uri, data, {
        headers: this.httpHeaders,
        params
      })
      .pipe(
        map(BaseService.extractData),
      );
  }


  // api put method
  put(uri: string, data?: any, params?: any): Observable<any> {
    return this.httpClient
      .put(uri, data, {
        headers: this.httpHeaders,
        params
      })
      .pipe(
        map(BaseService.extractData),
      );
  }

  // api delete method
  delete(uri: string, params?: HttpParams): Observable<any> {
    return this.httpClient
      .delete(`${uri}`, {
        headers: this.httpHeaders,
        params
      })
      .pipe(
        map(BaseService.extractData),
      );
  }


}
