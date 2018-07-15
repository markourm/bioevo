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

  worlds: Observable<World[]>;
  selectedWorld: World;
  errorMessage: string;

  constructor(
    private reportService: ReportService,
    private bioEvoService: BioEvoService) { }

  ngOnInit() {
    this.errorMessage = '';
    this.worlds = this.reportService.getWorlds();
  }

  onSelect(world: World) {
    this.selectedWorld = world;
  }

}
