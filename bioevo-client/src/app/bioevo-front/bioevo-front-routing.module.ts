import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BioevoFrontComponent } from './bioevo-front.component';

const routes: Routes = [
  { path: '', component: BioevoFrontComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BioEvoFrontRoutingModule { }
