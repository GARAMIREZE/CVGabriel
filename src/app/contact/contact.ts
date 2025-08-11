import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
  countryCode: string;
  customCode: string;
  phone: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  formData: ContactForm = {
    name: '',
    email: '',
    company: '',
    message: '',
    countryCode: '',
    customCode: '',
    phone: ''
  };

  showCustomCode = false;

  constructor(private http: HttpClient) { }

  onCountryCodeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.showCustomCode = value === 'other';
    if (!this.showCustomCode) {
      this.formData.customCode = '';
    }
  }

  submitForm() {
    const endpoint = 'https://tudominio.com/email.php'; // Cambia esto a tu endpoint real

    this.http.post(endpoint, this.formData).subscribe({
      next: (response: any) => {
        if (response.success) {
          alert(response.message);
          this.formData = {
            name: '',
            email: '',
            company: '',
            message: '',
            countryCode: '',
            customCode: '',
            phone: ''
          };
          this.showCustomCode = false;
        } else {
          alert(response.message || 'There was an error. Please check the form.');
        }
      },
      error: (error) => {
        console.error(error);
        alert('Server error. Please try again later.');
      }
    });
  }
}
