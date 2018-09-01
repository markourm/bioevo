import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { World } from '../../model/world';
import { ReportService } from '../../service';

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
    private reportService: ReportService
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
