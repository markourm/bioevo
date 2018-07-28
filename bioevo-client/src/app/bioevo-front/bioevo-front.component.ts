import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { World } from '../model/world';
import { ReportService, BioEvoService } from '../shared';

@Component({
  selector: 'app-bioevo-front',
  templateUrl: './bioevo-front.component.html',
  styleUrls: ['./bioevo-front.component.css']
})
export class BioevoFrontComponent implements OnInit {

  public worlds: World[];
  public selectedWorld: World;
  public errorMessage: string;

  constructor(
    private reportService: ReportService,
    private bioEvoService: BioEvoService) { }

  ngOnInit() {
    this.worlds = [];
    this.errorMessage = '';
    this.loadWorlds();
  }

  loadWorlds() {
    this.reportService.getWorlds().subscribe(
      data => this.worlds = data,
      error => this.errorMessage = error.message
    );
  }

  onSelect(world: World) {
    this.selectedWorld = world;
  }

}
