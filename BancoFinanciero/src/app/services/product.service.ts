import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Product } from '../core/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient,private  router:Router) { }

  listProducts()
  {
    return this.http.get('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products')
          .pipe(
              catchError(this.handleError)
          );
  }

  addProduct(product:Product)
  {
    return this.http.post('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products',product)
          .pipe(
              catchError(this.handleError)
          );
  }

  updateProduct(product:Product)
  {
    return this.http.put('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products',product)
          .pipe(
              catchError(this.handleError)
          );
  }

  verifyId(id:string)
  {
    return this.http.get('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification?id='+id)
          .pipe(
              catchError(this.handleError)
          );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        // toast.warning(error.error,'Sucedio algo...',
        //                     {closeButton: true, positionClass: 'toast-bottom-center'});
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Error en la conexion. Intente nuevamente');
  }
}
