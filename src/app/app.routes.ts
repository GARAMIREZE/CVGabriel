import { Routes } from '@angular/router';
import { About } from './about/about';
import { Experience } from './experience/experience';
import { Education } from './education/education';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: 'about', component: About },
  { path: 'experience', component: Experience },
  { path: 'education', component: Education },
  { path: 'contact', component: Contact },
  { path: '', redirectTo: '/about', pathMatch: 'full' },
];
