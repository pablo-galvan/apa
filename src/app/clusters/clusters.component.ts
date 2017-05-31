import { Component, OnInit } from '@angular/core';
import { Hotel } from '../hotel';
import { HotelService } from '../app.service';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  providers: [ HotelService ],
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent implements OnInit {
  hotels: Hotel[];

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.getHotels(); 
  }

  getHotels() {
    this.hotelService.getHotels()
                      .subscribe(hotels => this.hotels = hotels);
  }
}
