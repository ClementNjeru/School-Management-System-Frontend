import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Stats from "../Components/Cards/Stats";
import PaymentModesPie from "../Components/Cards/DataPie";
import FeeData from "../Components/Cards/FeeData";

const Dashboard = () => {
  const fetchData = async () => {
    try {
      const [
        studentsResponce,
        teachersResponce,
        classesResponce,
        guardiansResponce,
        paymentModeResponce,
      ] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BASE_URL}/students/count`),
        axios.get(`${process.env.REACT_APP_BASE_URL}/teachers/count`),
        axios.get(`${process.env.REACT_APP_BASE_URL}/classes/count`),
        axios.get(`${process.env.REACT_APP_BASE_URL}/guardians/count`),
        axios.get(
          `${process.env.REACT_APP_BASE_URL}/payments/get/paymentmodes`
        ),
      ]);

      return {
        students: studentsResponce.data.totalStudents,
        teachers: teachersResponce.data.totalTeachers,
        classes: classesResponce.data.totalClasses,
        guardians: guardiansResponce.data.totalGuardians,
        paymentModes: paymentModeResponce.data.todayRevenueByPaymentMode,
      };
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const { data, isLoading } = useQuery(["dashboard-data"], fetchData);

  const studentsCount = data?.students;
  const teachersCount = data?.teachers;
  const classesCount = data?.classes;
  const guardiansCount = data?.guardians;
  const paymentModes = data?.paymentModes;

  return (
    <section className="p-3 ">
      <Stats
        studentsCount={studentsCount}
        teachersCount={teachersCount}
        classesCount={classesCount}
        guardiansCount={guardiansCount}
        isLoading={isLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <PaymentModesPie paymentModes={paymentModes} isLoading={isLoading} />
        
        <div className=""> 
          <FeeData />
        </div>
       
      </div>
{/* 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
       
      </div> */}

    </section>
  );
};

export default Dashboard;
