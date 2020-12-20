import { Component, OnInit } from '@angular/core';
import { CsvParserService } from '../../services/csv-parser.service';
import { GetfilterFromCSVService } from '../../services/getfilter-from-csv.service';

@Component({
  selector: 'app-mop',
  templateUrl: './mop.component.html',
  styleUrls: ['./mop.component.css']
})
export class MopComponent implements OnInit {
  mopData: any = []
  mopDataFilter: any = []
  selectedItem = 1
  isMenuOpen: boolean = false
  isSortMenuOpen:boolean=false
  isFilterMenuOpen:boolean=false
  sortby = ['Sort By', 'Relevance', 'Price -- Low to High', 'Price -- High to Low']
  filtervalues = []
  isloading: boolean;
  selectedFilters = []
  cookerFilter = [
    // { filter_name: '  ', values: ['Cello', 'Boss', 'Pegion', 'Butterfly'] },
    // { filter_name: 'Type', values: ['Mop,Bucket','Wiper'] },
 
  ]
  error: any;

  constructor(private csv: CsvParserService,private csvFilter:GetfilterFromCSVService) { }

  ngOnInit(): void {
    this.isloading=true
    this.csvFilter.getMopFilter().subscribe(filter =>{
      if(filter){
        this.convertRawFilters(filter)
      }
      this.isloading= false
    },e=>{
      this.isloading= false
      this.error = e
      console.log(e)
    })


    this.csv.getMop().subscribe(res => {
      this.mopData = res
      this.mopDataFilter = res
      console.log(this.mopData)
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
        return (item.Type !== filter_val && item.BrandName !== filter_val )
      })
    }
    this.filterMixerData(this.filtervalues, this.mopData)


  }
  filterMixerData(selecedfilters, mopData) {
    this.mopDataFilter = mopData
    let brand = []
    let type = []
    selecedfilters.map(function (s) {
      if (s.BrandName) {
        brand.push(s.BrandName)
      }
      if (s.Type) {
        type.push(s.Type)
      }
    })

    console.log("Power", type)
    if (brand.length == 0 || type.length == 0) {
      this.mopDataFilter = mopData
    }
    if (brand.length > 0) {
      this.mopDataFilter = this.mopDataFilter.filter((person) => brand.includes(person.brand))
    }

    if (type.length > 0) {
      this.mopDataFilter = this.mopDataFilter.filter((person) => type.includes(person.type))
    }
    console.log(selecedfilters, this.mopDataFilter)
  }

  getSortBy(data, i) {
    if (i == 0) {
      this.selectedItem = this.selectedItem
    }
    else {
      this.selectedItem = i
    }
    this.mopDataFilter = this.csv.sortDataByPrice(this.selectedItem,data,this.mopDataFilter)
  }

  onItemChange(value){
    console.log(value)
  }
}