import { Component } from '@angular/core';
import { CarsProvider } from 'src/data/CarsProvider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jak-daleko-vozilla-webapp';

  private carsProvider: CarsProvider = new CarsProvider();
  private home: Home

  ngOnInit() {

  }
}
