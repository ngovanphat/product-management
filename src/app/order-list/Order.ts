import { Product } from "@/components/organism/ProductItem";

export class Order {
  id: string;
  createdAt: number;
  itemList: Array<Product>;
  totalAmount: number;

  constructor(id = "", createdAt = 0, itemList = [], totalAmount = 0) {
    this.id = id;
    this.createdAt = createdAt;
    this.itemList = itemList;
    this.totalAmount = totalAmount;
  }
}
