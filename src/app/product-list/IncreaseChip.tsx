import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

type ChipIncreaseProps = {
  color: string;
  blurColor: string;
  value: number;
  isIncrease: boolean;
};
export function ChipIncrease({
  color,
  blurColor,
  value,
  isIncrease,
}: ChipIncreaseProps) {
  return (
    <div
      className="rounded flex p-2 max-w-max"
      style={{
        color: color,
        backgroundColor: blurColor,
      }}
    >
      <div
        className="max-h-max max-w-max flex items-center rounded-lg"
        style={{
          backgroundColor: color,
        }}
      >
        {isIncrease ? (
          <ArrowUpIcon color="white" className="w-6 h-4" />
        ) : (
          <ArrowDownIcon color="white" className="w-5 h-5" />
        )}
      </div>

      <p className="ml-2 font-semibold">
        {isIncrease ? "+" : "-"}
        {value.toFixed(2)}%
      </p>
    </div>
  );
}
