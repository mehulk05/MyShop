import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { CsvParserService } from '../services/csv-parser.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: string
  category: string
  productDetail
  detailkey=[]
  images:any=[]
  selectedItem=0
  selectedImg:string
  isloading:boolean =false
  constructor(private route: ActivatedRoute,private router: Router, private csv: CsvParserService) { }

  ngOnInit(): void {

    this.productDetail =[]
    
    this.isloading =true
    this.route.params.subscribe(param => {
      console.log(param)
      this.category = param.category
      this.productId = param.id.split("+")[1]
      
      this.getProductFromID(this.category, this.productId)
    })
  }

  getProductFromID(category: string, id: string) {
    let call
    if (category == "iron") {
      call = this.csv.getIron()
    }
    if (category == "cooker") {
      call = this.csv.getCooker()
    }
    if(category=="blender"){
      call = this.csv.getBlender()
    }
    if(category == "mixer"){
      call = this.csv.getMixer()
    }
    if(category == "mop"){
      call =this.csv.getMop()
    }
    if(category == "stove"){
      call = this.csv.getStoves()
    }
    if (call) {
      this.images=[]
        call.subscribe(results =>{
          this.isloading =false
          console.log('Filtered results:', results,this.selectedImg)
          results=results.filter(function (item) {
            return item.idno == id
          })
          
          this.productDetail=results[0]

          console.log( this.productDetail)
          let allkey = Object.keys( this.productDetail);
          this.filterKeys(allkey)
          this.images.push(results[0].img1)
          this.images.push(results[0].img2)
          this.selectedImg = this.images[0]        
        })
      console.log(category, id)
    }
  }

  filterKeys(allkey){
    this.detailkey = []
    for (let i in allkey){
      if(allkey[i] == "srno" ||  allkey[i] =="img1" || allkey[i] =="img2" || allkey[i] =="idno"){
        console.log(allkey[i])
       
      }else{
        this.detailkey.push(allkey[i])
      }
    }
    console.log(this.detailkey)
  }

  selectImage(img,i)
  {
    
    this.selectedItem = i
    this.selectedImg=img
    console.log(img,i)
  }
}
