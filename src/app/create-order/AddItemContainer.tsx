import { Product } from "@/components/organism/ProductItem";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

type AddItemContainerProps = {
  index: number;
  productOptions: Array<Product>;
  selectedProduct: Product;

  handleSelectProduct(index: number, value: string): void;
  updateProductField(index: number, value: string, name: string): void;
  onRemove(index: number): void;
};
export function AddItemContainer({
  index,
  productOptions,
  selectedProduct,
  handleSelectProduct,
  updateProductField,
  onRemove,
}: AddItemContainerProps) {
  return (
    <div className="bg-indigo-200 w-full rounded-lg p-3 mt-3 relative">
      <div className="absolute top-3 right-3" onClick={() => onRemove(index)}>
        <XMarkIcon className="w-5 h-5" />
      </div>
      {/* select product field */}
      <label
        htmlFor="product"
        className="block mb-2 text-md font-semibold text-gray-900"
      >
        Tên hàng
      </label>
      <div className="relative">
        <select
          id="product"
          className="bg-white-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  w-full appearance-none"
          onChange={(event) => handleSelectProduct(index, event.target.value)}
        >
          <option value="">Chọn 1 sản phẩm</option>
          {productOptions.map((product) => (
            <option key={product.id} value={product.id}>
              {product.productName} {product.unit}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute bottom-3 right-3 w-5 h-5" />
      </div>
      {/* input quantity field */}
      <label
        htmlFor="quantity"
        className="block mb-2 text-md font-semibold text-gray-900 mt-3"
      >
        Số lượng
      </label>

      <div className="flex gap-2 items-center justify-center w-full flex-1">
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="bg-white-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full  appearance-none"
          required
          max={100}
          value={selectedProduct.quantity}
          onChange={(event) =>
            updateProductField(index, event.target.value, event.target.name)
          }
        />

        <div className="w-28 flex justify-center">
          <p className="text-lg font-medium text-black">
            {selectedProduct.unit}
          </p>
        </div>
      </div>
      {/* input amount of money */}
      <label
        htmlFor="quantity"
        className="block mb-2 text-md font-semibold text-gray-900 mt-3"
      >
        Đơn giá
      </label>

      <div className="flex gap-2 items-center justify-center w-full flex-1">
        <input
          type="number"
          id="price"
          name="price"
          className="bg-white-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full  appearance-none"
          required
          value={selectedProduct.price}
          onChange={(event) =>
            updateProductField(index, event.target.value, event.target.name)
          }
        />

        <div className="w-28 flex justify-center">
          <p className="text-lg font-medium text-black">VNĐ</p>
        </div>
      </div>
    </div>
  );
}
