import { Component, OnInit } from '@angular/core';
import { CsvParserService } from '../../services/csv-parser.service';
import { GetfilterFromCSVService } from '../../services/getfilter-from-csv.service';

@Component({
  selector: 'app-blender',
  templateUrl: './blender.component.html',
  styleUrls: ['./blender.component.css']
})
export class BlenderComponent implements OnInit {
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
    this.csvFilter.getBlenderFilter().subscribe(filter =>{
      if(filter){
        this.convertRawFilters(filter)
      }
      this.isloading= false
    }
    ,e=>{
      this.isloading= false
      this.error = e
      console.log(e)
    })

    this.csv.getBlender().subscribe(res => {
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
    // if(this.isMenuOpen || this.isSortMenuOpen){
    //   this.isFilterMenuOpen=true
      
    // }else{
    //   this.isFilterMenuOpen=false
    // }
    
    console.log("filter is",this.isFilterMenuOpen)
  }
  OpenSortMenu(e,d) {
    e.preventDefault()
    console.log(d)
    this.isMenuOpen = !this.isMenuOpen
    this.isSortMenuOpen=!this.isSortMenuOpen
    this.isFilterMenuOpen=false
    // if(this.isMenuOpen || this.isFilterMenuOpen){
    //   this.isSortMenuOpen=true
    // }else{
    //   this.isSortMenuOpen=false
    // }
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
        return (item.Capacity !== filter_val && item.BrandName !== filter_val && item['Power'] !== filter_val )
      })
    }
    this.filterMixerData(this.filtervalues, this.productData)


  }
  filterMixerData(selecedfilters, product_data) {
    this.productDataFilter = product_data
    let brand = []
    let Capacity = []
    selecedfilters.map(function (s) {
      if (s.BrandName) {
        brand.push(s.BrandName)
      }
      if (s.Power) {
        Capacity.push(s.Power)
      }
    })

    console.log("Power", Capacity)
    if (brand.length == 0 || Capacity.length == 0) {
      this.productDataFilter = product_data
    }
    if (brand.length > 0) {
      this.productDataFilter = this.productDataFilter.filter((person) => brand.includes(person.brand))
    }

    if (Capacity.length > 0) {
      this.productDataFilter = this.productDataFilter.filter((person) => Capacity.includes(person.power))
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
    console.log(this.selectedItem,data)
  }

  onItemChange(value){
    console.log(value)
  }
}


