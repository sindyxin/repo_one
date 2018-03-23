import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products:any=[];
  constructor(
    private _httpService: HttpService,

  ) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts(){
    this._httpService.getAllProduct()
    .subscribe((data)=>{
      console.log(data);
      this.products = data;
    })
  }
  delete(id){
    this._httpService.deleteProduct(id)
    .subscribe((data)=>{
      console.log(data);
      this.getProducts();
    })
  }
}
