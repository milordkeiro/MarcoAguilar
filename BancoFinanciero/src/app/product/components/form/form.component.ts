import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  product!:Product;
  isNewProduct:boolean = true;

  dataProduct: FormGroup = new FormGroup({
    idProduct: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.required,
      this.verifyId
    ]),
    name: new FormControl<string>('', [
      Validators.minLength(5),
      Validators.maxLength(100),
      Validators.required,
    ]),
    description: new FormControl<string>('', [
      Validators.minLength(5),
      Validators.maxLength(100),
      Validators.required,
    ]),
    logo: new FormControl<string>('', [
      Validators.required
    ]),
    date_release: new FormControl<string>('', [
      Validators.required,
      this.validateDateRelease
    ]),
    date_revision: new FormControl<string>('', [
      Validators.required
    ]),

  });

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute)
  {

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['id']!='new')
      {
        /*+++++++++++++++++++
        No tenemos un API para obtener un producto por su ID, entonces
        lo estoy guardando temporalmente en el localstore
        Si tuvieramos, haria una consulta con params['id']
        -----*/
        const prodTemp = JSON.parse(localStorage.getItem('productSelected')!);
        this.product = {
          id:prodTemp.id,
          name: prodTemp.name,
          description: prodTemp.description,
          logo: prodTemp.logo,
          date_release: prodTemp.date_release,
          date_revision: prodTemp.date_revision
        }
        //------------------------
        this.dataProduct.controls['idProduct'].setValue(this.product.id);
        this.dataProduct.controls['name'].setValue(this.product.name);
        this.dataProduct.controls['description'].setValue(this.product.description);
        this.dataProduct.controls['logo'].setValue(this.product.logo);
        this.dataProduct.controls['date_release'].setValue(new Date(this.product.date_release).toISOString().split('T')[0]);
        this.dataProduct.controls['date_revision'].setValue(new Date(this.product.date_revision).toISOString().split('T')[0]);
        this.isNewProduct = false;
      }
    });
  }

  saveProduct()
  {
    this.product = {
      id:this.dataProduct.controls['idProduct'].value,
      name:this.dataProduct.controls['name'].value,
      description: this.dataProduct.controls['description'].value,
      logo: this.dataProduct.controls['logo'].value,
      date_release: this.dataProduct.controls['date_release'].value,
      date_revision: this.dataProduct.controls['date_revision'].value,
    }
    console.log("Enviando", this.product);
    if(this.isNewProduct)
    {
      this.productService.addProduct(this.product).subscribe((res)=>{
        console.log("New product", res);
      }, err =>{
        console.warn("Error to request");
      }
      );
    }
    else
    {
      this.productService.updateProduct(this.product).subscribe((res)=>{
        console.log("New product", res);
      }, err =>{
        console.warn("Error to request");
      }
      );
    }

  }

  validateDateRelease(control:AbstractControl)
  {
    const value = control.value;
    //min Today
    if (value == null || value == '' || value <= (new Date().toISOString().split('T')[0])) {
      return { required: true };
    } else {
      return null;
    }
  }

  verifyId(control:AbstractControl)
  {
    const value = control.value;
    this.productService.verifyId(value).subscribe(res => {
      return { required: true };

    })
    return null;
  }

  setDateRevision()
  {
    let dateRelease = new Date(this.dataProduct.controls['date_release'].value);
    let dateRevision = new Date(dateRelease);
    dateRevision.setDate(dateRelease.getDate() + 365);
    this.dataProduct.controls['date_revision'].setValue(dateRevision);
  }


}
