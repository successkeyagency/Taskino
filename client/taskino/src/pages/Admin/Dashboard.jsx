import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";

import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandsSeparator } from "../../utils/helper";

import InfoCard from "../../components/Cards/InfoCard";
import TaskLT from "../../components/TaskLT";
import CustomPC from "../../components/Charts/CustomPC";
import CustomBC from "../../components/Charts/CustomBC";

import { LuArrowRight } from "react-icons/lu";
import { assets } from "../../assets/assets";

const STATUS_COLORS = ["#FB923C", "#FACC15", "#34D399"];

const Dashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
        if (res.data) {
          setDashboardData(res.data);
          prepareChartData(res.data?.charts);
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const prepareChartData = (data) => {
    const dist = data?.taskDistribution || {};
    const priorities = data?.taskPriorityLevels || {};

    setPieChartData([
      { status: "Pending", count: dist?.Pending || 0 },
      { status: "In Progress", count: dist?.InProgress || 0 },
      { status: "Completed", count: dist?.Completed || 0 },
    ]);

    setBarChartData([
      { priority: "Low", count: priorities?.Low || 0 },
      { priority: "Medium", count: priorities?.Medium || 0 },
      { priority: "High", count: priorities?.High || 0 },
    ]);
  };

  const handleSeeMore = () => navigate("/admin/tasks");

  if (showSplash) {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black z-50">
      <img
        src={assets.successkey_logo}
        alt="SuccessKeyAgency Logo"
        className="w-32 h-32 mb-4"
      />
      <p className="text-green-500 text-lg font-semibold">
        Created by SuccessKeyAgency llc
      </p>
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mt-6"></div>
    </div>
  );
}


  return (
    <DashboardLayout activeMenu="Dashboard">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <div className="bg-orange-50 p-6 rounded-xl shadow-sm border border-orange-100">
          <h2 className="text-2xl font-semibold text-orange-600">
            👋 Good Morning Admin, {user?.name || "User"}!
          </h2>
          <p className="text-sm text-orange-400 mt-1">
            {moment().format("dddd, Do MMMM YYYY")}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <InfoCard
          label="🗂️ Total Tasks"
          value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.All || 0)}
          color="bg-orange-500"
        />
        <InfoCard
          label="⏳ Pending"
          value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Pending || 0)}
          color="bg-orange-400"
        />
        <InfoCard
          label="🚧 In Progress"
          value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.InProgress || 0)}
          color="bg-yellow-400"
        />
        <InfoCard
          label="✅ Completed"
          value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Completed || 0)}
          color="bg-green-400"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        <div className="bg-white border border-orange-100 p-5 rounded-lg shadow-sm">
          <h4 className="text-orange-600 font-medium mb-4">📊 Task Distribution</h4>
          <CustomPC data={pieChartData} colors={STATUS_COLORS} />
        </div>

        <div className="bg-white border border-orange-100 p-5 rounded-lg shadow-sm">
          <h4 className="text-orange-600 font-medium mb-4">🔥 Priority Breakdown</h4>
          <CustomBC data={barChartData} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white border border-orange-100 p-6 rounded-lg shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-orange-600 text-lg font-semibold">🕒 Recent Tasks</h4>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSeeMore}
            className="text-sm text-orange-500 hover:underline flex items-center gap-1"
          >
            See All <LuArrowRight className="text-base" />
          </motion.button>
        </div>
        <TaskLT tableData={dashboardData?.recentTasks || []} />
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
