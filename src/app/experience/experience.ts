import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface Experiences {
  company: string;
  date: string;
  role: string;
  client?: string;
  icon?: string;
  description?: string;
  tech: string[];
  clients?: Client[];
}

export interface Client {
  name: string;
  description?: string;
  icon?: string;
}

@Component({
  standalone: true,
  selector: 'app-experience',
  imports: [MatTooltipModule, CommonModule, HttpClientModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  experiences: Experiences[] = [];

  constructor(private http: HttpClient) {
    this.http.get<Experiences[]>('experiences.json').subscribe(data => {
      this.experiences = data;
    });
  }
}
