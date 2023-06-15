import { Loading } from "@/components/organism/Loading";

export default function LoadingScreen() {
  return (
    <div
      className="bg-white items-center justify-center w-full"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Loading size={50} />
    </div>
  );
}
