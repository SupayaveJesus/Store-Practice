import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailPage implements OnInit {

  apiService = inject(ApiService);
  route = inject(ActivatedRoute);

  product: any;

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.apiService.getProduct(id)
      .subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
