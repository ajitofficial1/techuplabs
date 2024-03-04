import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ICountryData } from 'src/app/_models/common';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent {
  @Input() collaboratory: (any) = [];  
  @Output() pinAdded = new EventEmitter<string>();
  pinForm: FormGroup;
  filteredCountry: (ICountryData | any) = [];

  constructor(private formBuilder: FormBuilder) {
    this.pinForm = this.formBuilder.group({
      title: ['', Validators.required],
      file: ['../assets/images/pin-icon-small-flat.png'],
      collaboratory: ['', Validators.required],
      privacy: ['private', Validators.required]
    });
  }

  uploader: FileUploader = new FileUploader({ url: '/api/upload' });

  onFileDrop(event: any): void {
  }

  onFileOver(event: any): void {
  }

  onFileSelect(event: any): void {
  }

  onFileRemove(event: any) {
  }

  onSubmit() {
    if (this.pinForm.valid) {
      const pin = this.pinForm.value;
      let pinObj: any = [];
      if (localStorage.getItem('pins') !== null) {
        var obj: any = JSON.parse(JSON.stringify(localStorage.getItem('pins')));
        pinObj = JSON.parse(obj);
      } else {
        if (pinObj.length) { pinObj.push(pin) };
      }
      pinObj.push(pin)
      localStorage.setItem('pins', JSON.stringify(pinObj));
      this.resetForm();
      alert("Pin added successfully");
      this.pinAdded.emit('PIN_ADD');
    }
  }

  resetForm(){
    this.pinForm.reset();
    this.pinForm.get('file')?.setValue('../assets/images/pin-icon-small-flat.png')
  };
}