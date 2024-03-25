import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
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

  deleteProduct(id:string)
  {
    return this.http.delete('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products?id='+id)
          .pipe(
           catchError(this.handleError)
          );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
      alert('Verifique el estado de conexion a internet');
    } else {
      if(error.status == 400)
      {alert('Solicitud erronea: '+error.error)}
      if(error.status == 206)
      {alert('Información no valida: '+error.error)}
      if(error.status == 401)
      {alert('No autorizado: '+error.error)}
      if(error.status == 404)
      {alert('No encontrado: '+error.error)}
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);

    }
    return throwError(
      'Error en la conexion. Intente nuevamente');
  }
}
