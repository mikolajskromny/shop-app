import {Component, OnInit} from '@angular/core';
import {ProductListService} from '../../services/product-list.service';
import {ItemsModel} from '../../models/items-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public itemList: Array<ItemsModel>;

  constructor(private items: ProductListService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.items.getItems().subscribe(item => {
      this.itemList = item;
    });
  }

}
