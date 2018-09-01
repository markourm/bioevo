import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { BioEvoFrontRoutingModule } from './bioevo-front-routing.module';
import { BioevoFrontComponent } from './bioevo-front.component';
import { WorldComponent } from './world/world.component';
import { AdvanceStepsComponent } from './advance-steps/advance-steps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BioEvoFrontRoutingModule
  ],
  declarations: [BioevoFrontComponent, WorldComponent, AdvanceStepsComponent]
})
export class BioEvoFrontModule { }
