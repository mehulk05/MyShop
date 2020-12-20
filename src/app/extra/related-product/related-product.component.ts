import { Component, Input, OnInit } from '@angular/core';
import { CsvParserService } from '../../services/csv-parser.service';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit {
  @Input() category: string;
  relatedProducts
  constructor(private csv: CsvParserService) { }

  ngOnInit(): void {
    
    this.getProductFromCategory(this.category)
  }

  getProductFromCategory(category){
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
        call.subscribe(results =>{
          this.relatedProducts=results
        })

  }
}
reload(){
  setTimeout(()=>{
    window.location.reload()
  },2) 

}
}
