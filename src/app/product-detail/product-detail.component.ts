import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private csv: CsvParserService) { }

  ngOnInit(): void {
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
      call = this.csv.getIron().pipe(
        map((reports : any) => reports.filter(p => p.idno == id))
      );
    }
    console.log(call)
    if (call) {
        call.subscribe(results => console.log('Filtered results:', results))
      console.log(category, id)
    }
  }
}
