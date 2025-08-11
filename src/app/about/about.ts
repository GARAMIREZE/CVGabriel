import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, AfterViewInit {
  @ViewChild('highlightSection') highlightSection!: ElementRef;

  yearsCount = 0;
  techsCount = 0;
  hasAnimated = false;

  languages = [
    {
      name: 'Spanish',
      certification: 'Native',
      icon: 'spain.svg',
    },
    {
      name: 'English',
      certification: 'B2 (IELTS)',
      icon: 'uk.svg',
    },
  ];

  skillCategories = [
    {
      name: 'Frontend',
      skills: [
        {
          name: 'Angular',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
        },
        {
          name: 'JavaScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        },
        {
          name: 'AngularJS',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
        },
        {
          name: 'HTML5',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        },
        {
          name: 'CSS3',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
        },
        {
          name: 'Bootstrap',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
        },
      ],
    },
    {
      name: 'Backend',
      skills: [
        {
          name: 'Java',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
        },
        {
          name: 'Spring',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
        },
        {
          name: 'PHP',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
        },
        {
          name: 'Node.js',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
        },
        {
          name: 'Maven',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg',
        },
      ],
    },
    {
      name: 'Database',
      skills: [
        {
          name: 'MySQL',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
        },
        {
          name: 'Oracle',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg',
        },
        {
          name: 'SQLDeveloper',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqldeveloper/sqldeveloper-original.svg',
        },
      ],
    },
  ];

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateCount('yearsCount', 5, 1000);
          this.animateCount('techsCount', 10, 1000);
          this.hasAnimated = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (this.highlightSection) {
      observer.observe(this.highlightSection.nativeElement);
    }
  }

  animateCount(field: 'yearsCount' | 'techsCount', target: number, duration: number) {
    const stepTime = 50;
    const steps = Math.ceil(duration / stepTime);
    const increment = target / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        this[field] = target;
        clearInterval(interval);
      } else {
        this[field] = Math.floor(current);
      }
    }, stepTime);
  }
}
