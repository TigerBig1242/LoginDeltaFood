import { Component } from '@angular/core';
import { ApiServiceService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(public api : ApiServiceService) {
    //this.api.initializeLiff();
  }

  ngOnInit() {
    
  }

}
