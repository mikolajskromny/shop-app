import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductListService} from '../../services/product-list.service';
import {ItemsModel} from '../../models/items-model';
import {DataShareService} from '../../services/data-share.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public itemList: Array<ItemsModel>;

  constructor(private items: ProductListService,
              private idData: DataShareService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {     // get products from JSON through service
    this.items.getItems().subscribe(item => {
      this.itemList = item;
    });
  }

  addToCart(itemId: number) {     // sendig item ID to other component via service
    this.idData.sendId(itemId);
  }

}
