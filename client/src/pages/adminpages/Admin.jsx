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
import { motion } from "framer-motion";

const Admin = () => {
  const textVariants = {
    initial: {
      y: -500,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="flex dark:bg-black/90 dark:text-white py-5">
      <Sidebar />
      <div className="px-5 flex w-full">
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="w-full h-max grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5"
        >
          <motion.div
            variants={textVariants}
            className="p-5 border rounded-lg border-gray-200 dark:border-gray-800 row-span-3 min-h-[180px]"
          >
            <UsersInfo />
          </motion.div>
          <motion.div
            variants={textVariants}
            className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]"
          >
            <ChartBox {...chartBoxUser} />
          </motion.div>
          <motion.div
            variants={textVariants}
            className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]"
          >
            <ChartBox {...chartBoxProduct} />
          </motion.div>
          <motion.div
            variants={textVariants}
            className="p-5 border rounded-lg border-gray-200 dark:border-gray-800 row-span-3  min-h-[180px]"
          >
            <PieChartBox />
          </motion.div>
          <motion.div
            variants={textVariants}
            className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]"
          >
            <ChartBox {...chartBoxConversion} />
          </motion.div>
          <motion.div
            variants={textVariants}
            className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]"
          >
            <ChartBox {...chartBoxRevenue} />
          </motion.div>
          <motion.div
            variants={textVariants}
            className="p-5 border rounded-lg border-gray-200 dark:border-gray-800 row-span-2 col-span-2  min-h-[360px] hidden md:block"
          >
            <BigChartBox />
          </motion.div>
          <motion.div
            variants={textVariants}
            className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]"
          >
            <BarChartBox {...barChartBoxVisit} />
          </motion.div>
          <motion.div
            variants={textVariants}
            className="p-5 border rounded-lg border-gray-200 dark:border-gray-800  min-h-[180px]"
          >
            <BarChartBox {...barChartBoxRevenue} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
