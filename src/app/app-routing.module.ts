import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
   {path:'cooker', component:CookerComponent},
   {path:'mixer', component:MixerComponent},
   {path:'stove', component:StoveComponent},
   {path:'blender', component:BlenderComponent},
   {path:'mop', component:MopComponent},
   {path:'iron', component:IronComponent},
   {path:':category/:id', component:ProductDetailComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
