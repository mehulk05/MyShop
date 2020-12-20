import { Component, OnInit } from '@angular/core';
import { CsvParserService } from '../../services/csv-parser.service';
import { GetfilterFromCSVService } from '../../services/getfilter-from-csv.service';

@Component({
  selector: 'app-stove',
  templateUrl: './stove.component.html',
  styleUrls: ['./stove.component.css']
})
export class StoveComponent implements OnInit {
  stoveData: any = []
  stoveDataFilter: any = []
  selectedItem = 1
  isMenuOpen: boolean = false
  isSortMenuOpen:boolean=false
  isFilterMenuOpen:boolean=false
  sortby = ['Sort By', 'Relevance', 'Price -- Low to High', 'Price -- High to Low']
  filtervalues = []
  isloading: boolean;
  selectedFilters = []
  cookerFilter = [
    // { filter_name: 'BrandName', values: ['Prestige', 'Bajaj', 'Sunflame', 'Butterfly'] },
    // { filter_name: 'No of Burners', values: ['1','2','3','4'] },
    // { filter_name: 'Body Material', values: ['Glass','Steel','Iron'] },
    // { filter_name: 'Ignition Type', values: ['Automatic','Manual'] }
 
  ]
  error: any;

  constructor(private csv: CsvParserService,private csvFilter:GetfilterFromCSVService) { }


  ngOnInit(): void {
    this.isloading=true
    this.csvFilter.getStoveFilter().subscribe(filter =>{
      if(filter){
        this.convertRawFilters(filter)
      }
      this.isloading= false
    })

    this.csv.getStoves().subscribe(res => {
      this.stoveData = res
      this.stoveDataFilter = res
      console.log(this.stoveData)
    },e=>{
      this.isloading= false
      this.error = e
      console.log(e)
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
        return (item['No of Burners'] !== filter_val && item.BrandName !== filter_val && 
        item['Body Material'] !== filter_val && item['Ignition Type'] !== filter_val
         )
      })
    }
    this.filterMixerData(this.filtervalues, this.stoveData)


  }
  filterMixerData(selecedfilters, mixiData) {
    this.stoveDataFilter = mixiData
    let brand = []
    let bodyMaterial = [];
    let noOfBurner=[];
    let ignitionType=[]
    selecedfilters.map(function (s) {
      if (s.BrandName) {
        brand.push(s.BrandName)
      }
      if (s['No of Burners']) {
        noOfBurner.push(s['No of Burners'])
      }
      if(s['Body Material']) {
        bodyMaterial.push(s['Body Material'])
      }
      if(s['Ignition Type']) {
        ignitionType.push(s['Ignition Type'])
      }
      
    })

    console.log("Power", noOfBurner)
    if (brand.length == 0 || noOfBurner.length == 0 || bodyMaterial.length == 0 || ignitionType.length == 0 ) {
      this.stoveDataFilter = mixiData
    }
    if (brand.length > 0) {
      this.stoveDataFilter = this.stoveDataFilter.filter((person) => brand.includes(person.brand))
    }

    if (noOfBurner.length > 0) {
      this.stoveDataFilter = this.stoveDataFilter.filter((person) => noOfBurner.includes(person.noofburner))
    }
    if (bodyMaterial.length > 0) {
      this.stoveDataFilter = this.stoveDataFilter.filter((person) => bodyMaterial.includes(person.bodymaterial))
    }
    if (ignitionType.length > 0) {
      this.stoveDataFilter = this.stoveDataFilter.filter((person) => ignitionType.includes(person.ignitiontype))
    }
    console.log(selecedfilters, this.stoveDataFilter)
  }

  getSortBy(data, i) {
    if (i == 0) {
      this.selectedItem = this.selectedItem
    }
    else {
      this.selectedItem = i
    }
    this.stoveDataFilter = this.csv.sortDataByPrice(this.selectedItem,data,this.stoveDataFilter)
  }

  onItemChange(value){
    console.log(value)
  }

}
