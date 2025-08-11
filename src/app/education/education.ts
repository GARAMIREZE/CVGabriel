import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export interface Academic {
  school: string;
  degree: string;
  date: string;
  icon?: string;
}

@Component({
  standalone: true,
  selector: 'app-education',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './education.html',
  styleUrl: './education.css'
})

export class Education {
  education: Academic[] = [];

  constructor(private http: HttpClient) {
    this.http.get<Academic[]>('education.json').subscribe(data => {
      this.education = data;
    });
  }
}
