export default function ProductList() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start">
      <div className="flex flex-col bg-indigo-500 w-full">
        <p className="mx-5 py-5"> Danh sách hàng hóa</p>

        <input
          placeholder="Tìm kiếm hàng hóa"
          className="px-2 mx-5 mb-5"
        ></input>
      </div>
    </main>
  );
}
