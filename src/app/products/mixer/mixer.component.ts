import { Component, OnInit } from '@angular/core';
import { CsvParserService } from '../../services/csv-parser.service';
import { GetfilterFromCSVService } from '../../services/getfilter-from-csv.service';

@Component({
  selector: 'app-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.css']
})
export class MixerComponent implements OnInit {
  mixerData: any = []
  mixerDataFilter: any = []
  selectedItem = 1
  isMenuOpen: boolean = false
  isSortMenuOpen:boolean=false
  isFilterMenuOpen:boolean=false
  sortby = ['Sort By', 'Relevance', 'Price -- Low to High', 'Price -- High to Low']
  filtervalues = []
  isloading: boolean;
  selectedFilters = []
  cookerFilter = [
    // { filter_name: 'BrandName', values: ['Prestige', 'Bajaj', 'Pegion', 'Butterfly'] },
    // { filter_name: 'Power', values: ['350','500','750','1000'] },
 
  ]
  error: any;

  constructor(private csv: CsvParserService,private csvFilter:GetfilterFromCSVService) { }

  ngOnInit(): void {
    this.isloading=true
    this.csvFilter.getMixerFilter().subscribe(filter =>{
      if(filter){
        this.convertRawFilters(filter)
      }
      this.isloading= false
    },e=>{
      this.isloading= false
      this.error = e
      console.log(e)
    })

    this.csv.getMixer().subscribe(res => {
      this.mixerData = res
      this.mixerDataFilter = res
      console.log(this.mixerData)
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
    this.filterMixerData(this.filtervalues, this.mixerData)


  }
  filterMixerData(selecedfilters, mixiData) {
    this.mixerDataFilter = mixiData
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
      this.mixerDataFilter = mixiData
    }
    if (brand.length > 0) {
      this.mixerDataFilter = this.mixerDataFilter.filter((person) => brand.includes(person.brand))
    }

    if (Capacity.length > 0) {
      this.mixerDataFilter = this.mixerDataFilter.filter((person) => Capacity.includes(person.power))
    }
    console.log(selecedfilters, this.mixerDataFilter)
  }

  getSortBy(data, i) {
    if (i == 0) {
      this.selectedItem = this.selectedItem
    }
    else {
      this.selectedItem = i
    }
    this.mixerDataFilter = this.csv.sortDataByPrice(this.selectedItem,data,this.mixerDataFilter)
  }

  onItemChange(value){
    console.log(value)
  }
}

