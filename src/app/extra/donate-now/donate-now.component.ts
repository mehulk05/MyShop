import { Component, OnInit } from '@angular/core';
declare var paypal: any;
@Component({
  selector: 'app-donate-now',
  templateUrl: './donate-now.component.html',
  styleUrls: ['./donate-now.component.css']
})

export class DonateNowComponent implements OnInit {




  constructor() { }

  ngOnInit(): void {
    
  }

  

  payUsingRazorPay(){

    window.location.href='https://rzp.io/l/LZKN8q8S';
  }

}
