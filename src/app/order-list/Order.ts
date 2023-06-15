import { Product } from "@/components/organism/ProductItem";

export class Order {
  createdAt: string;
  itemList: Array<Product>;
  totalAmount: number;

  constructor(createdAt = "", itemList = [], totalAmount = 0) {
    this.createdAt = createdAt;
    this.itemList = itemList;
    this.totalAmount = totalAmount;
  }
}
