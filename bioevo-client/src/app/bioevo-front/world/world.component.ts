import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { World } from '../../model/world';
import { ReportService, BioEvoService } from '../../service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  public world: World;
  public errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private bioEvoService: BioEvoService
  ) { }

  ngOnInit() {
    this.errorMessage = '';
    this.loadWorld();
  }

  loadWorld() {
    this.route.params.subscribe(
      (params: Params) => {
        this.reportService.getWorld(params['world-id']).subscribe(
          data => this.world = data,
          error => this.errorMessage = error.message
        );
      }
    );
  }

}
