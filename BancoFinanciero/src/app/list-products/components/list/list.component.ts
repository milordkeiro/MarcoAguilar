import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  totalProducts:Product[] | undefined;
  listedProducts:Product[] | undefined;

  constructor(private productService: ProductService){

  }
  ngOnInit(){
    this.productService.listProducts().subscribe((res:any)=>{
      this.totalProducts = res;
    });
  }

  /*+++++
  Solo por esta Practica tecnica,  el producto seleccionado lo guardo en el
  localStore, ya que no tenemos una API para obtener un producto con respecto
  a su ID
  -----*/
  editProduct(product:Product)
  {
    localStorage.setItem('productSelected', JSON.stringify(product));
  }

}
