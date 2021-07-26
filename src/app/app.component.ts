import { Component, OnInit } from '@angular/core';
import { WindowService } from 'projects/window-service/src/lib/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hasWindow: boolean | undefined = undefined;

  constructor(private window: WindowService) {}

  ngOnInit(): void {
    this.hasWindow = !!this.window.window
  }
}
