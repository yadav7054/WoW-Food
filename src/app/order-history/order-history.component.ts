import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})

export class OrderHistoryComponent implements OnInit {

  orderList: any[] = [];
  userId: number | undefined;
 
  constructor(private _http: HttpClient) {}
 
  ngOnInit(): void {
    const user = localStorage.getItem("currentUser");
    if (user) {
      this.userId = JSON.parse(user).id;
      this._http.get<any[]>(`http://localhost:3000/orders?userId=${this.userId}`)
        .subscribe(data => {
          this.orderList = data;
        });
    }
  }
}

 