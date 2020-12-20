import { Component, OnInit } from '@angular/core';
import { GetfilterFromCSVService } from '../services/getfilter-from-csv.service';

@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.css']
})
export class LatestProductsComponent implements OnInit {
  latestProducts: any;
  isloading: boolean;
  error: any;

  constructor(private csvFilter:GetfilterFromCSVService) { }

  ngOnInit(): void {
    this.isloading=true
    this.csvFilter.getLatestProducts().subscribe(data=>{
     this.latestProducts =data
     this.isloading= false
    },e=>{
      this.isloading= false
      this.error = e
      console.log(e)
    })
  }


}
