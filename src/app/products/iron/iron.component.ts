import { Component, OnInit } from '@angular/core';
import { CsvParserService } from '../../services/csv-parser.service';
import { GetfilterFromCSVService } from '../../services/getfilter-from-csv.service';

@Component({
  selector: 'app-iron',
  templateUrl: './iron.component.html',
  styleUrls: ['./iron.component.css']
})
export class IronComponent implements OnInit {
  productData: any = []
  productDataFilter: any = []
  selectedItem = 1
  isMenuOpen: boolean = false
  isSortMenuOpen:boolean=false
  isFilterMenuOpen:boolean=false
  sortby = ['Sort By', 'Relevance', 'Price -- Low to High', 'Price -- High to Low']
  filtervalues = []
  selectedFilters = []
  isloading: boolean;
  cookerFilter = [
    // { filter_name: 'BrandName', values: ['Philips', 'Bajaj', 'Pegion', 'Butterfly'] },
    // { filter_name: 'Power', values: ['350','500','750','1000','1440'] },
    // { filter_name: 'Spray', values: ['yes','no'] },
    // { filter_name: 'Steam Brust', values:['yes','no'] },
 
  ]
  error: any;

  constructor(private csv: CsvParserService,private csvFilter:GetfilterFromCSVService) { }

  ngOnInit(): void {
    this.isloading=true
    this.csvFilter.getIronFilter().subscribe(filter =>{
      if(filter){
        this.convertRawFilters(filter)
      }
      this.isloading= false
    },e=>{
      this.isloading= false
      this.error = e
      console.log(e)
    })


    this.csv.getIron().subscribe(res => {
      this.productData = res
      this.productDataFilter = res
      console.log(this.productData)
    })
  }

  
 convertRawFilters(filter){
  for(let i in filter){
  let splittedData=filter[i].values.split(",")
  filter[i].values=splittedData
}
const resultArray = filter.map(elm => ({ filter_name: elm.filtername, values: elm.values}));
this.cookerFilter=resultArray
}

  OpenFilterMenu(e,d) {
    e.preventDefault()
    console.log(d)
    this.isMenuOpen = !this.isMenuOpen
    this.isFilterMenuOpen=!this.isFilterMenuOpen
    this.isSortMenuOpen=false
    
    console.log("filter is",this.isFilterMenuOpen)
  }
  OpenSortMenu(e,d) {
    e.preventDefault()
    console.log(d)
    this.isMenuOpen = !this.isMenuOpen
    this.isSortMenuOpen=!this.isSortMenuOpen
    this.isFilterMenuOpen=false
    console.log("ort is",this.isSortMenuOpen)
  }

  filterChange(filter_name, filter_val, e) {

    let filters = {}
    filters[filter_name] = filter_val
    let check = e.target.checked
    if (check) {
      this.filtervalues.push(filters)

    } else {

      this.filtervalues = this.filtervalues.filter(function (item) {
        return (item['Spray'] !== filter_val && item.BrandName !== filter_val && item['Power'] !== filter_val && item["Steam Brust"] !== filter_val  )
      })
    }
    this.filterMixerData(this.filtervalues, this.productData)


  }
  filterMixerData(selecedfilters, product_data) {
    this.productDataFilter = product_data
    let brand = []
    let Power = []
    let Spray = []
    let Steam_Brust = []
    selecedfilters.map(function (s) {
      if (s.BrandName) {
        brand.push(s.BrandName)
      }
      if (s.Power) {
        Power.push(s.Power)
      }
      if (s.Spray) {
        Spray.push(s.Spray)
      }
      if (s['Steam Brust']) {
        Steam_Brust.push(s['Steam Brust'])
      }
    })

    console.log("Power",Steam_Brust)
    if (brand.length == 0 || Power.length == 0 || Spray.length == 0 || Steam_Brust.length == 0) {
      this.productDataFilter = product_data
    }
    if (brand.length > 0) {
      this.productDataFilter = this.productDataFilter.filter((person) => brand.includes(person.brand))
    }

    if (Power.length > 0) {
      this.productDataFilter = this.productDataFilter.filter((person) => Power.includes(person.power))
    }

    if (Spray.length > 0) {
      this.productDataFilter = this.productDataFilter.filter((person) => Spray.includes(person.spray))
    }

    if (Steam_Brust.length > 0) {
      this.productDataFilter = this.productDataFilter.filter((person) => Steam_Brust.includes(person.steambrust))
    }
    console.log(selecedfilters, this.productDataFilter)
  }

  getSortBy(data, i) {
    if (i == 0) {
      this.selectedItem = this.selectedItem
    }
    else {
      this.selectedItem = i
    }
    this.productDataFilter = this.csv.sortDataByPrice(this.selectedItem,data,this.productDataFilter)
  }

  onItemChange(value){
    console.log(value)
  }
}



