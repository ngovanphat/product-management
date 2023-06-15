import Image from "next/image";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CubeIcon } from "@heroicons/react/24/solid";
import { formatVNDCurrency } from "@/utils";

export class Product {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  unit: string;

  constructor(
    id: string = "",
    productName: string = "",
    price: number = 0,
    quantity: number = 0,
    unit: string = "Kg"
  ) {
    this.id = id;
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
      data.productName,
      data.price,
      data.quantity,
      data.unit
    );
  },
};

export function ProductItem({
  id,
  productName,
  price,
  quantity,
  unit,
}: Product) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center ">
        <div className="bg-blue-300 rounded-full max-w-max max-h-max p-2 flex items-center justify-center">
          <CubeIcon
            style={{
              aspectRatio: 1,
              width: "30px",
              height: "30px",
            }}
          />
        </div>

        <div className="flex flex-col ml-5">
          <p className="text-xl font-semibold text-black">
            {productName} {unit}
          </p>
          <div className="flex text-black justify-between gap-2">
            <p>Giá: {formatVNDCurrency(price)}</p>
            <p>Số lượng: {quantity}</p>
          </div>
        </div>
      </div>

      <ChevronRightIcon width={18} height={18} color="black" />
    </div>
  );
}
