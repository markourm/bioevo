import { Component, OnInit } from '@angular/core';

import { World } from '../model/world';
import { WorldResponse } from '../model/world.response';
import { ReportService, BioEvoService } from '../service';

@Component({
  selector: 'app-bioevo-front',
  templateUrl: './bioevo-front.component.html',
  styleUrls: ['./bioevo-front.component.css']
})
export class BioevoFrontComponent implements OnInit {

  public worlds: World[];
  public displayedColumns: string[] = ['id', 'currentStepId'];

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

  createWorld() {
    this.bioEvoService.createWorld().subscribe(
      data => this.addWorld(data),
      error => this.errorMessage = error.message
    );
  }

  addWorld(response: WorldResponse) {
    const world = {
      id: response.worldId,
      currentStepId: 1,
    };
    this.worlds.push(world);
  }

}
