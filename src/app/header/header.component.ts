import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  options = []
  category = ["Cooker", "Mixer", "Blender", "Iron", "Gas Stove", "Mop"]
  constructor(private router :Router) { }

  ngOnInit(): void {
  }

  goTopage(option:any){
   option = option.toLowerCase()

   this.router.navigateByUrl("/"+option)
    console.log()
    this.options = []

  }
  onKeyUp(e) {
    let value = e.target.value
    // console.log(e.target.value)
    // let data  = this.category.filter(x=>x == value)
    // console.log(data)

    var textToSearch = value;
    this.options = this.category.filter((str) => {

      return str.toLowerCase().indexOf(textToSearch.toLowerCase()) >= 0;

    });
    if (value == "" || value == null) {
      this.options = []
    }
    console.log(this.options)
  }
}
