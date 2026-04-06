import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardHeader, IonCard, IonCardTitle, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProductsPage implements OnInit {
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  products: any[] = [];
  category: string = '';

  ngOnInit(): void {
    this.getCategory();
  }



  getCategory() {
    this.category = this.route.snapshot.paramMap.get('category') || '';
    if (this.category) {
      this.loadProductsByCategory();
      return;
    }

    this.loadProducts();
  }

  loadProducts() {
    this.apiService.getProducts()
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  loadProductsByCategory() {
    this.apiService.getProductsByCategory(this.category)
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  goToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }

}
