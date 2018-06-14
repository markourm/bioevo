import { Component, OnInit } from '@angular/core';
import { ReportService, BioEvoService } from '../shared';

@Component({
  selector: 'app-bioevo-front',
  templateUrl: './bioevo-front.component.html',
  styleUrls: ['./bioevo-front.component.css'],
  providers: [ReportService, BioEvoService]
})
export class BioevoFrontComponent implements OnInit {

  worlds: Array<any>;

  constructor(private reportService: ReportService, private bioEvoService: BioEvoService) { }

  ngOnInit() {
    this.reportService.getWorlds().subscribe(
      data => {
        this.worlds = data;
      },
      error => console.log(error)
    )
  }

}
