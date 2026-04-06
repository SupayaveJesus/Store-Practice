import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CategoriesPage implements OnInit {

  ApiService = inject(ApiService);

  categories: string[] = [];
  router = inject(Router);

  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories() {
    this.ApiService.getCategories()
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        }
      });
  }

  goToCategory(category: string) {
    this.router.navigate(['/products', category]);

  }

}
