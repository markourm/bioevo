import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BioevoFrontComponent } from './bioevo-front.component';
import { WorldComponent } from './world/world.component';

const routes: Routes = [
  { path: '', component: BioevoFrontComponent },
  { path: ':world-id', component: WorldComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BioEvoFrontRoutingModule { }
