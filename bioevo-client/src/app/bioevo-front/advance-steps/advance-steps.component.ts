import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { BioEvoService } from '../../service';

@Component({
  selector: 'app-advance-steps',
  templateUrl: './advance-steps.component.html',
  styleUrls: ['./advance-steps.component.css']
})
export class AdvanceStepsComponent implements OnInit {

  worldId;
  stepsInput = new FormControl('', [Validators.max(500)]);
  message;

  constructor(
    private route: ActivatedRoute,
    private bioEvoService: BioEvoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.worldId = params['world-id'];
      }
    );
  }

  advanceWorld(steps: number) {
    this.bioEvoService.doSteps(this.worldId, steps).subscribe(
      data => this.message = data.message,
      error => this.message = error.message
    );
  }

}
