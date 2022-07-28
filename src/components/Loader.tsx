import { FC } from "react";

type Props = {
  noText?: boolean;
  text?: string;
};
export const Loader: FC<Props> = ({ text = "Loading...", noText = false }) => {
  return (
    <div className="flex flex-col justify-center items-center text-xl font-light">
    </div>
  );
};