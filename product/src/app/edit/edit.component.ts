import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id:any;
  errors:string[];
  product:any={};
  constructor(
    private _httpService:HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params)=>{
      console.log("edit get id", params.get('id'));
      this.id = params.get('id');
    })
    this.getOneProduct();
  }
  getOneProduct(){
    this._httpService.showOneProduct(this.id)
    .subscribe((data)=>{
      console.log("get special product from server", data);
      this.product = data;
      console.log("get one form server", data);
    })

  }
  editProduct(){
    this._httpService.updateProduct(this.product)
    .subscribe((data:any)=>{
      if(data.errors){
        for( let key of data.errors){
          console.log("update component wrong",data.errors[key].message);
          this.errors.push(data.errors[key].message);
        }
      }else{
        this._router.navigate(['/products']);
      }
    })
  }
  onDelete(id){
    this._httpService.deleteProduct(id)
    .subscribe((data)=>{
      console.log(id);
      this._router.navigate(['/products']);
      // this.goList();
    })
  }
  // delete(id){
  //   this._httpService.deleteOneProduct(id)
  //   .subscribe((data)=>{
  //     console.log(data);
  //     // this.getProducts();
  //   })
  // }
  // goList() {
  //   this._router.navigate(['/products']);
  // }
}
