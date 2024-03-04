import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxSelectOption } from 'ngx-select-ex';
import { ICountryData } from 'src/app/_models/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
[x: string]: any;
  @Input() country: (ICountryData | any) = [];
  @Input() region: (any) = [];
  @Output() customerAdded = new EventEmitter<string>();
  customerForm: FormGroup;
  filteredCountry: (ICountryData | any) = [];

  constructor(private formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const customer = this.customerForm.value;
      let customerObj: any = [];
      if (localStorage.getItem('customers') !== null) {
        var obj: any = JSON.parse(JSON.stringify(localStorage.getItem('customers')));
        customerObj = JSON.parse(obj);
      } else {
        if (customerObj.length) { customerObj.push(customer) };
      }
      customerObj.push(customer)
      localStorage.setItem('customers', JSON.stringify(customerObj));
      this.resetForm();
      alert("Customer added successfully");
      this.customerAdded.emit("CUSTOMER_ADDED");
    }
  }  

  resetForm(){
    this.customerForm.reset();
  };

  regionSelectionChanges(options: INgxSelectOption[]) {
    this.filteredCountry = this.country[options[0].value];
  }
}
