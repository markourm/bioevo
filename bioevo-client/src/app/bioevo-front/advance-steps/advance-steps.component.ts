import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { BioEvoService } from '../../service';

@Component({
  selector: 'app-advance-steps',
  templateUrl: './advance-steps.component.html',
  styleUrls: ['./advance-steps.component.css']
})
export class AdvanceStepsComponent implements OnInit {

  worldId;
  stepsForm: FormGroup;
  message = '';
  maxSteps = 500;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bioEvoService: BioEvoService
  ) {
    this.route.params.subscribe(
      (params: Params) => {
        this.worldId = params['world-id'];
      }
    );
  }

  ngOnInit() {
    this.buildAdvanceStepsForm();
    this.stepsForm.setValue({
      steps: 1
    });
  }

  buildAdvanceStepsForm() {
    this.stepsForm = this.formBuilder.group({
      steps: ['', [Validators.required, Validators.min(1), Validators.max(this.maxSteps)]]
    });
  }

  advanceWorld(submittedForm: FormGroup) {
    this.bioEvoService.doSteps(this.worldId, submittedForm.value.steps).subscribe(
      response => this.message = response.message,
      error => this.message = error.message
    );
  }

}
