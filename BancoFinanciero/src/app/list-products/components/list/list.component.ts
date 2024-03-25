import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  keywordSearch:string="";
  currentPage:number = 1;
  listPerPage:number[] = [2, 3, 5];
  itemsPerPage:number = this.listPerPage[0];
  totalPages:number = 0;
  showingModalDelete:boolean = false;
  deleteProducto:Product | undefined;

  totalProducts:Product[] | undefined;
  listedProducts:Product[] | undefined;

  constructor(private productService: ProductService){

  }
  ngOnInit(){
    this.initListProducts();
  }

  initListProducts()
  {
    this.productService.listProducts().subscribe((res:any)=>{
      this.totalProducts = res;
      //this.listedProducts = res;
      this.initPerPage()
      this.paginationProducts();
    });
  }

  searchProduct()
  {
    this.listedProducts = [];
    let keyword = this.keywordSearch.trim();
    keyword = keyword.toLowerCase();
    if(keyword.length >=2)
    {
      this.totalProducts?.forEach((product:Product) => {
        if(product.name.toLowerCase().includes(keyword) ||
           product.description.toLowerCase().includes(keyword))
        {
          this.listedProducts?.push(product);
        }
      });
      console.log('Search',this.listedProducts);
    }
    else{
      //this.listedProducts = this.totalProducts;
      this.initPerPage();
    }
    console.warn(this.totalProducts);
  }

  paginationProducts()
  {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.listedProducts = this.totalProducts?.slice(startIndex, endIndex);
  }
  // Función para ir a la página anterior
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginationProducts();
    }
  }

  // Función para ir a la página siguiente
  goToNextPage() {
    let totalProd = this.totalProducts?.length ? this.totalProducts.length : 0;
    this.totalPages = Math.ceil(totalProd / this.itemsPerPage);
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginationProducts();
    }
  }

  initPerPage()
  {
    this.currentPage = 1;
    let totalProd = this.totalProducts?.length ? this.totalProducts.length : 0;
    this.totalPages = Math.ceil(totalProd / this.itemsPerPage);
    console.log("cambio",this.itemsPerPage);
    this.paginationProducts();
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

  showModalDeleteProduct(product:Product)
  {
    this.showingModalDelete = true;
    this.deleteProducto = product;
  }

  cancelModalDeleteProduct()
  {
    this.showingModalDelete = false;
    this.deleteProducto = undefined;
  }
  confirmDeleteProduct()
  {
    this.productService.deleteProduct(this.deleteProducto!.id).subscribe((res)=>{
      this.initListProducts();
      this.showingModalDelete = false;
      this.deleteProducto = undefined;
    })
  }

}
