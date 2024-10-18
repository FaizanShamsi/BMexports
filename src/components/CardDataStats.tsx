import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="mt-6 flex h-33 w-full items-center justify-between rounded-xl border border-[#D7D7D7] bg-white px-12 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-base font-medium text-[#bab5b5]">{title}</span>
          <h4 className="mt-2 text-title-md font-bold text-black dark:text-white ">
            {total}
          </h4>
        </div>
      </div>
      <div className=" flex h-18 w-18 items-center justify-center rounded-full bg-[#FFF3F4] dark:bg-meta-4">
        {children}
      </div>
    </div>
  );
};

export default CardDataStats;
