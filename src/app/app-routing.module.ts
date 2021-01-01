import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './extra/about-us/about-us.component';
import { BuinessComponent } from './extra/buiness/buiness.component';
import { ContactUsComponent } from './extra/contact-us/contact-us.component';
import { DonateNowComponent } from './extra/donate-now/donate-now.component';
import { Notfound404Component } from './extra/notfound404/notfound404.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BlenderComponent } from './products/blender/blender.component';
import { CookerComponent } from './products/cooker/cooker.component';
import { IronComponent } from './products/iron/iron.component';
import { MixerComponent } from './products/mixer/mixer.component';
import { MopComponent } from './products/mop/mop.component';
import { StoveComponent } from './products/stove/stove.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'buisness',component:BuinessComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'donate-now', component:DonateNowComponent},
   {path:'cooker', component:CookerComponent},
   {path:'mixer', component:MixerComponent},
   {path:'stove', component:StoveComponent},
   {path:'gas stove', component:StoveComponent},
   {path:'blender', component:BlenderComponent},
   {path:'mop', component:MopComponent},
   {path:'iron', component:IronComponent},
   {path:':category/:id', component:ProductDetailComponent},
   {path: '**', component:Notfound404Component}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top',
    useHash: true 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
