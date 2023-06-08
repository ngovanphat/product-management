import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { ChipIncrease } from "./IncreaseChip";
import { ProductItem } from "./ProductItem";

export default function ProductList() {
  const products = [
    {
      id: 1,
      productName: "Thịt heo",
      price: 70000,
      quantity: 20,
      imageUrl:
        "https://icdn.dantri.com.vn/FaA3gEccccccccccccos/Image/2011/06/tht6811_a9082.jpg",
    },
    {
      id: 2,
      productName: "Thịt bò",
      price: 250000,
      quantity: 2,
      imageUrl:
        "https://thitbohuunghi.com/wp-content/uploads/2021/06/6gt5cdi_-_imgur_grande.png",
    },
    {
      id: 3,
      productName: "Thịt gà",
      price: 50000,
      quantity: 10,
      imageUrl:
        "https://vinafood.vn/wp-content/uploads/2022/05/ga-dong-lanh.jpg",
    },
    {
      id: 4,
      productName: "Cải xà lách",
      price: 10000,
      quantity: 50,
      imageUrl:
        "https://vinmec-prod.s3.amazonaws.com/images/20210106_041321_793265_hat-giong-rau-xa-la.max-1800x1800.jpg",
    },
    {
      id: 5,
      productName: "Bắp chuối",
      price: 130000,
      quantity: 40,
      imageUrl: "https://cdn.tgdd.vn/2021/05/CookProduct/2-1200x676-9.jpg",
    },
    {
      id: 6,
      productName: "Cà chua",
      price: 13000,
      quantity: 30,
      imageUrl:
        "https://cdn.tgdd.vn/Files/2017/10/30/1037058/9-cong-dung-va-han-che-cua-ca-chua-doi-voi-cuoc-song-hang-ngay-202103142026330054.jpg",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-start justify-start w-full px-4 py-4 bg-white ">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-2xl text-black font-bold">Danh sách hàng hóa</p>
        <div className="flex">
          <MagnifyingGlassIcon className="w-8 h-8" color="black" />
        </div>
      </div>

      <div className="flex justify-between mt-5 w-full gap-3">
        <div className="w-1/2">
          <p className="text-slate-500 text-lg font-medium">Số sản phẩm</p>
          <p className="text-black text-3xl font-semibold py-3">128</p>
          <ChipIncrease
            color="#458F5A"
            blurColor="#ECF5EE"
            value={8.0}
            isIncrease
          />
        </div>

        <div className="w-1/2">
          <p className="text-slate-500 text-lg font-medium">Hàng trong kho</p>
          <p className="text-black text-3xl font-semibold py-3">2,345</p>
          <ChipIncrease
            color="#70CFF3"
            blurColor="#EBFAFD"
            value={8.0}
            isIncrease
          />
        </div>
      </div>

      <div className="w-full">
        <p className="text-slate-500 font-semibold text-lg mt-5">
          Các sản phẩm
        </p>
        <div className="mt-5">
          {products.map((item, index) => (
            <div className="py-5" key={index}>
              <ProductItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
