import Image from "next/image";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

type ProductItemProps = {
  id: number;
  imageUrl: string;
  productName: string;
  price: number;
  quantity: number;
};
export function ProductItem({
  id,
  imageUrl,
  productName,
  price,
  quantity,
}: ProductItemProps) {
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
          <p>
            Giá:{" "}
            {price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <p>Số lượng: {quantity}</p>
        </div>
      </div>
      <div className="flex-grow"></div>
      <ChevronRightIcon width={30} height={30} color="black" />
    </div>
  );
}
