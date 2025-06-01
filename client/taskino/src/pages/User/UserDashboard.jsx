import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import { motion } from "framer-motion";

import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import InfoCard from "../../components/Cards/InfoCard";
import TaskListTable from "../../components/TaskLT";
import CustomPieChart from "../../components/Charts/CustomPC";
import CustomBarChart from "../../components/Charts/CustomBC";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandsSeparator } from "../../utils/helper";
import { assets } from "../../assets/assets";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const UserDashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [showSplash, setShowSplash] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [chartsExpanded, setChartsExpanded] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );
      const data = res.data;

      setDashboardData(data);
      prepareChartData(data?.charts || {});
    } catch (error) {
      console.error("Dashboard fetch failed:", error);
    }
  };

  const prepareChartData = (charts) => {
    setPieChartData([
      { status: "Pending", count: charts?.taskDistribution?.Pending || 0 },
      {
        status: "In Progress",
        count: charts?.taskDistribution?.InProgress || 0,
      },
      { status: "Completed", count: charts?.taskDistribution?.Completed || 0 },
    ]);

    setBarChartData([
      { priority: "Low", count: charts?.taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: charts?.taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: charts?.taskPriorityLevels?.High || 0 },
    ]);
  };

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
      fetchDashboardData();
    }, 2000);

    return () => clearTimeout(splashTimeout);
  }, []);

  const handleSeeAll = () => navigate("/user/tasks");

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
    <DashboardLayout className="" activeMenu="Dashboard">
      <img src={assets.logo} alt="Logo" className="mx-auto h-14 my-2" />

      <section
        className="block md:hidden max-w-xl mx-auto px-2 sm:px-6"
        aria-label="Mobile Dashboard"
      >
        <motion.div
          className="mb-6 text-center"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-semibold mb-1 text-green-500">
            Hello staff, <span className="text-black">{user?.name || "Staff"}</span>
          </h2>
          <p className="text-gray-500 text-sm">
            {moment().format("dddd, Do MMM YYYY")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 mb-8"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {[
            "Total Tasks",
            "Pending",
            "In Progress",
            "Completed",
          ].map((label, i) => (
            <InfoCard
              key={label}
              label={label}
              value={addThousandsSeparator(
                [
                  dashboardData?.charts?.taskDistribution?.All,
                  dashboardData?.charts?.taskDistribution?.Pending,
                  dashboardData?.charts?.taskDistribution?.InProgress,
                  dashboardData?.charts?.taskDistribution?.Completed,
                ][i] || 0
              )}
              color={
                [
                  "bg-indigo-600",
                  "bg-yellow-500",
                  "bg-blue-500",
                  "bg-green-500",
                ][i]
              }
            />
          ))}
        </motion.div>

        <motion.div
          className="mb-8 bg-white p-4 rounded-lg shadow"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h3 className="font-semibold mb-4">Task Distribution</h3>
          <CustomPieChart data={pieChartData} colors={COLORS} />
          <h3 className="font-semibold mt-6 mb-4">Priority Levels</h3>
          <CustomBarChart data={barChartData} />
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-2xl font-semibold">Recent Tasks</h3>
            <button
              onClick={handleSeeAll}
              className="text-green-600 hover:underline text-sm flex items-center gap-1"
            >
              See All <LuArrowRight />
            </button>
          </div>
          <TaskListTable tableData={dashboardData?.recentTasks || []} />
        </motion.div>
      </section>

      <motion.section
        className="hidden md:block max-w-6xl mx-auto px-6 py-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div
          className="mb-10 flex items-center justify-between"
          custom={1}
          variants={fadeIn}
        >
          <div>
            <h1 className="text-4xl font-bold text-green-600">
              Hello, <span className="text-black">{user?.name || "Staff"}</span>
            </h1>
            <p className="text-gray-600 mt-1">
              {moment().format("dddd, Do MMM YYYY")}
            </p>
          </div>
          <button
            onClick={handleSeeAll}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            View All Tasks
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-4 gap-6 mb-12"
          custom={2}
          variants={fadeIn}
        >
          {[
            "Total Tasks",
            "Pending",
            "In Progress",
            "Completed",
          ].map((label, i) => (
            <InfoCard
              key={label}
              label={label}
              value={addThousandsSeparator(
                [
                  dashboardData?.charts?.taskDistribution?.All,
                  dashboardData?.charts?.taskDistribution?.Pending,
                  dashboardData?.charts?.taskDistribution?.InProgress,
                  dashboardData?.charts?.taskDistribution?.Completed,
                ][i] || 0
              )}
              color={
                [
                  "bg-indigo-600",
                  "bg-yellow-500",
                  "bg-blue-500",
                  "bg-green-500",
                ][i]
              }
            />
          ))}
        </motion.div>

        <motion.div className="flex gap-8 mb-12" custom={3} variants={fadeIn}>
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Task Distribution</h3>
            <CustomPieChart data={pieChartData} colors={COLORS} />
          </div>
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Priority Levels</h3>
            <CustomBarChart data={barChartData} />
          </div>
        </motion.div>

        <motion.div custom={4} variants={fadeIn}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold">Recent Tasks</h3>
            <button
              onClick={handleSeeAll}
              className="text-green-600 hover:underline text-sm flex items-center gap-1"
            >
              See All <LuArrowRight />
            </button>
          </div>
          <TaskListTable tableData={dashboardData?.recentTasks || []} />
        </motion.div>
      </motion.section>
    </DashboardLayout>
  );
};

export default UserDashboard;
