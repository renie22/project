import React from "react";
import Sidebar from "../../components/admincomponents/Sidebar";
import UsersInfo from "../../components/admincomponents/UserInfo";
import ChartBox from "../../components/admincomponents/ChartBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
import PieChartBox from "../../components/admincomponents/PieChartBox";
import BigChartBox from "../../components/admincomponents/BigChartBox";
import BarChartBox from "../../components/admincomponents/BarChartBox";

const Admin = () => {
  return (
    <div className="flex dark:bg-black/90 dark:text-white py-5">
      <Sidebar />
      <div className="px-5 flex w-full">
        <div className="w-full h-max grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
          <div className="p-5 border rounded-lg border-gray-200 dark:border-gray-800 row-span-3 min-h-[180px]">
            <UsersInfo />
          </div>
          <div className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]">
            <ChartBox {...chartBoxUser} />
          </div>
          <div className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]">
            <ChartBox {...chartBoxProduct} />
          </div>
          <div className="p-5 border rounded-lg border-gray-200 dark:border-gray-800 row-span-3  min-h-[180px]">
            <PieChartBox />
          </div>
          <div className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]">
            <ChartBox {...chartBoxConversion} />
          </div>
          <div className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]">
            <ChartBox {...chartBoxRevenue} />
          </div>
          <div className="p-5 border rounded-lg border-gray-200 dark:border-gray-800 row-span-2 col-span-2  min-h-[360px] hidden md:block">
            <BigChartBox />
          </div>
          <div className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]">
            <BarChartBox {...barChartBoxVisit} />
          </div>
          <div className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]">
            <BarChartBox {...barChartBoxRevenue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
