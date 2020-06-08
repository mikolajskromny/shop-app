import {Component, OnInit} from '@angular/core';
import {ProductListService} from '../../services/product-list.service';
import {DataShareService} from '../../services/data-share.service';
import {ItemsModel} from '../../models/items-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart: Array<ItemsModel> = [];
  public totalAmount = 0;

  constructor(private itemsById: ProductListService,
              private dataId: DataShareService) {
  }

  ngOnInit() {
    this.dataId.currentId.subscribe(id => {
      this.getItemsById(id);
    });
  }

  getItemsById(id) {      // getting product data via service which I added to my cart
    this.itemsById.getItems().subscribe(item => {
      if (!this.cart.some(isItemAlready => isItemAlready.id === id)) {
        this.cart.push(item.find(itemId => itemId.id === id));
        this.cart.find(addQuantity => {
          if (addQuantity.id === id) {
            addQuantity.quantity = 1;
            addQuantity.total = addQuantity.quantity * addQuantity.price;     // adding amount parameter of 1 game
          }
        });
      } else {
        this.cart.find(quantityId => {
          if (quantityId.id === id) {
            quantityId.quantity += 1;
            quantityId.total = 0;
            quantityId.total = quantityId.quantity * quantityId.price;      // increasing amount parameter of 1 game
          }
        });
      }
      this.totalAmount = 0;
      this.cart.forEach(total => {
        this.totalAmount += total.total;                                  // total cost
      });
    });
  }

  removeFromCart(index) {                         // removing items from cart, one *click*, one item dropped
    if (this.cart[index].quantity === 1) {
      this.totalAmount = this.totalAmount - this.cart[index].price;
      this.cart.splice(index, 1);
    } else {
      this.cart[index].quantity -= 1;
      this.totalAmount = this.totalAmount - this.cart[index].price;
    }
  }

}
