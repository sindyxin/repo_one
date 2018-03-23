import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(
    private _httpClient: HttpClient,
  ) { }
  postProduct(newProduct){
    console.log("service send newproduct to server", newProduct);
    return this._httpClient.post('/api/product/new', newProduct);
  }
  getAllProduct(){
    return this._httpClient.get('/api/product')
  }
  showOneProduct(id){
    return this._httpClient.get('/api/product/'+id, id);
  }
  updateProduct(product){
    return this._httpClient.put('/api/product/edit/'+product._id, product);
  }
  deleteProduct(id){
    return this._httpClient.delete('/api/product/'+id);
  }
  // deleteOneProduct(id){
  //   return this._httpClient.delete('/product/delete/'+id, id);
  // }
}
