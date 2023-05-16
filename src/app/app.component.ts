import { Component } from '@angular/core';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-calendar';
  public month = new Date().getMonth() + 1;
  public year = new Date().getFullYear();
  public calendar: Array<Array<number>> = [];
  public months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  constructor() {
    this.generateCalendar();
  }

  public generateCalendar() {
    // 0 = Sunday, 1 = Monday, etc so we convert 0 to 6 for the array index

    //check how many days in this month
    const daysInMonth = new Date(this.year, this.month, 0).getDate();
    //check what day is the first day of this month
    const firstDay = new Date(this.year, this.month - 1, 1).getDay();

    // generate 2d array with weeks and days
    const calendar = new Array(5);

    let week = [];
    let daysInWeek = 7;
    let day = 1;

    for (let i = 0; i < calendar.length; i++) {
      // reset week
      week = [];
      // check if week is last week
      for (let j = 0; j < daysInWeek; j++) {
        if (firstDay === 0 && i === 0 && j !== 6) {
          // if first day is sunday and first week and not last day of week
          week.push('');
        } else if (day > daysInMonth) {
          // reached end of month
          week.push('');
        } else if (j + 1 < firstDay && i === 0) {
          // add empty days before first day of month
          week.push('');
        } else {
          week.push(day);
          day++;
        }
      }
      calendar[i] = week;
    }
    this.calendar = calendar;
  }

  changeMonth(direction: string) {
    if (direction === 'next') {
      if (this.month === 12) {
        this.month = 1;
        this.year++;
      } else {
        this.month++;
      }
    } else {
      if (this.month === 1) {
        this.month = 12;
        this.year--;
      } else {
        this.month--;
      }
    }
    this.generateCalendar();
  }
}
