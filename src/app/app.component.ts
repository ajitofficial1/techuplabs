import { Component, OnInit } from '@angular/core';
import { ICountryData } from './_models/common';
import { ModalService } from './_services';
import { CommonDataService } from './_services/commondata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'techuplabs';
  country: ICountryData | any = [];
  region: any = [];
  customers: any = [];
  pins: any = [];
  constructor(
    protected modalService: ModalService,
    private dataService: CommonDataService) { }

  ngOnInit(): void {
    this.dataService.getCountries().subscribe((data: any) => {
      this.country = JSON.parse(JSON.stringify(data));
      let region: any = [];
      Object.keys(this.country).forEach((val: any) => {
        region.push({ region: val, regionCode: val });
      });
      this.region = JSON.parse(JSON.stringify(region));
    });
    this.addedCallback('PIN_ADD');
  }

  checkCustomers(): number {
    let customers = JSON.parse(JSON.stringify(localStorage.getItem('customers')));
    this.customers = JSON.parse(customers);
    return this.customers?.length;
  }

  checkIsObject(obj: any){
    return (typeof(obj) === 'object')
  }

  addedCallback(event:any= 'PIN_ADD') {
    this.modalService.close();
    if(event ==='PIN_ADD'){
      let pins = JSON.parse(JSON.stringify(localStorage.getItem('pins')));
      this.pins = JSON.parse(pins); 
    }
  }
}
