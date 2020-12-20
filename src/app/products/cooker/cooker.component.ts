import { Component, OnInit } from '@angular/core';
import { CsvParserService } from 'src/app/services/csv-parser.service';
import { GetfilterFromCSVService } from '../../services/getfilter-from-csv.service';

@Component({
  selector: 'app-cooker',
  templateUrl: './cooker.component.html',
  styleUrls: ['./cooker.component.css']
})
export class CookerComponent implements OnInit {
  productData: any = []
  productDataFilter: any = []
  selectedItem = 1
  isMenuOpen: boolean = false
  isSortMenuOpen:boolean=false
  isFilterMenuOpen:boolean=false
  sortby = ['Sort By', 'Relevance', 'Price -- Low to High', 'Price -- High to Low']
  filtervalues = []
  selectedFilters = []
  cookerFilter = [
  ]
  isloading: boolean;
  error: any;
  constructor(private csv: CsvParserService,private csvFilter:GetfilterFromCSVService) { }

  ngOnInit(): void {
    this.isloading=true
    this.csvFilter.getCookerFilter().subscribe(filter =>{
      if(filter){
        this.convertRawFilters(filter)
      }
      this.isloading= false
    },e=>{
      this.isloading= false
      this.error = e
      console.log(e)
    })

    this.csv.getCooker().subscribe(res => {
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
        return (item['Capacity'] !== filter_val && item.BrandName !== filter_val && item['Material'] !== filter_val && item["Lid Type"] !== filter_val  )
      })
    }
    this.filterMixerData(this.filtervalues, this.productData)


  }
  filterMixerData(selecedfilters, product_data) {
    this.productDataFilter = product_data
    let brand = []
    let Capacity = []
    let Lid_Type = []
    let Material = []
    selecedfilters.map(function (s) {
      if (s.BrandName) {
        brand.push(s.BrandName)
      }
      if (s.Capacity) {
        Capacity.push(s.Capacity)
      }
      if (s['Lid Type']) {
        Lid_Type.push(s['Lid Type'])
      }
      if (s['Material']) {
        Material.push(s['Material'])
      }
    })

    console.log("Power",Lid_Type)
    if (brand.length == 0 || Capacity.length == 0 || Lid_Type.length == 0 || Material.length == 0) {
      this.productDataFilter = product_data
    }
    if (brand.length > 0) {
      this.productDataFilter = this.productDataFilter.filter((person) => brand.includes(person.brand))
    }

    if (Capacity.length > 0) {
      this.productDataFilter = this.productDataFilter.filter((person) => Capacity.includes(person.capacity))
    }

    if (Material.length > 0) {
      this.productDataFilter = this.productDataFilter.filter((person) => Material.includes(person.material))
    }

    if (Lid_Type.length > 0) {
      this.productDataFilter = this.productDataFilter.filter((person) => Lid_Type.includes(person.lidtype))
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



