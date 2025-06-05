import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementDataService {
  private data: any = {};

  setData(stepData: any) {
    this.data = { ...this.data, ...stepData };
  }

  getData() {
    return this.data;
  }

  clearData() {
    this.data = {};
  }
}
