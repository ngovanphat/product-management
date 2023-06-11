import Image from "next/image";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { formatVNDCurrency } from "@/utils";

export class Product {
  id: string;
  imageUrl: string;
  productName: string;
  price: number;
  quantity: number;
  unit: Array<string>;

  constructor(
    id: string = "",
    imageUrl: string = "",
    productName: string = "",
    price: number = 0,
    quantity: number = 0,
    unit: Array<string> = ["kg"]
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.productName = productName;
    this.price = Number(price);
    this.quantity = Number(quantity);
    this.unit = unit;
  }

  toString() {
    return this.productName + ", " + this.price + ", " + this.quantity;
  }
}

export const productConverter = {
  toFirestore: (product: Product) => {
    return product;
  },
  fromFirestore: (snapshot: any) => {
    const data = snapshot.data();
    return new Product(
      data.id,
      data.imageUrl,
      data.productName,
      data.price,
      data.quantity
    );
  },
};

export function ProductItem({
  id,
  imageUrl,
  productName,
  price,
  quantity,
}: Product) {
  return (
    <div className="flex items-center">
      <div className="bg-slate-300 rounded-full max-w-max max-h-max p-2 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={productName}
          className="rounded-full"
          width={40}
          height={40}
          style={{
            aspectRatio: 1,
          }}
        />
      </div>

      <div className="flex flex-col ml-5 w-1/2">
        <p className="text-2xl font-semibold text-black">{productName}</p>
        <div className="flex text-black justify-between gap-2">
          <p>Giá: {formatVNDCurrency(price)}</p>
          <p>Số lượng: {quantity}</p>
        </div>
      </div>
      <div className="flex-grow"></div>
      <ChevronRightIcon width={30} height={30} color="black" />
    </div>
  );
}
