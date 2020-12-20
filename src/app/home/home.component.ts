import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'ngSlick';

  slides=[
    {img:"https://m.media-amazon.com/images/S/aplus-media/vc/1b3e3488-ce93-4193-91eb-ff4516810564.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
img1:"https://media3.bosch-home.com/Images/600x/MCIM02874659_teaser4_revised1.jpg",
urlto:"",
subtxt:""},
    {img:"https://www.ttkprestige.com/media/images/html/clip-on-banner.jpg",
    img1:"https://storage.sg.content-cdn.io/in-resources/fc93a3a8-f69b-444c-8b76-9848de9338d0/Images/userimages/mob-banner/pc/PC-Banner(main).jpg",
  urlto:"",
subtxt:""},
{img:"https://glenindia.com/blog/wp-content/uploads/2020/02/Ct-banner.jpg",
img1:"https://h4w3c8s4.rocketcdn.me/wp-content/uploads/2020/09/Sunflame-Hob-Glass-Top-4-Burner-Gas-Stove-Manual-Ignition-1024x530.jpg",
urlto:"",
subtxt:""},
{img:"https://www.ttkprestige.com/Media/Images/LandingPage/ClipOn/ClipOn-Banner-00.jpg",
img1:"https://www.zotezo.com/wp-content/uploads/2020/05/pressure-cooker-banner.jpg",
urlto:"",
subtxt:""},

  ]

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": true
  };
  constructor() { }

  ngOnInit(): void {
  }




  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

}
