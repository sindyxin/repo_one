import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newProduct:any={title:"", price:"", img:""};
  errors:string[];
  constructor(
    private _httpService:HttpService,
    private _router:Router,
  ) { }

  ngOnInit() {
  }
  addProduct(){
    this._httpService.postProduct(this.newProduct)
    .subscribe((data:any)=>{
      console.log("create component send new product", this.newProduct);
      console.log("create component get new product data",data);
      this.errors=[];
      if(data.errors){
        for (var key of data.errors){
          this.errors.push(data.errors[key].message);
        }
      }else{
        this._router.navigate(['products']);
      }
    })
  }
}
