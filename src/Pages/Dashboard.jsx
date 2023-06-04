import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Stats from "../Components/Cards/Stats";
import DataPie from "../Components/Cards/DataPie";

const Dashboard = () => {
  const fetchData = async () => {
    try {
      const [
        studentsResponce,
        teachersResponce,
        classesResponce,
        guardiansResponce,
      ] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BASE_URL}/students/count`),
        axios.get(`${process.env.REACT_APP_BASE_URL}/teachers/count`),
        axios.get(`${process.env.REACT_APP_BASE_URL}/classes/count`),
        axios.get(`${process.env.REACT_APP_BASE_URL}/guardians/count`),
      ]);

      return {
        students: studentsResponce.data.totalStudents,
        teachers: teachersResponce.data.totalTeachers,
        classes: classesResponce.data.totalClasses,
        guardians: guardiansResponce.data.totalGuardians,
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

  return (
    <section className="p-3 ">
      <Stats
        studentsCount={studentsCount}
        teachersCount={teachersCount}
        classesCount={classesCount}
        guardiansCount={guardiansCount}
        isLoading={isLoading}
      />

      <DataPie />
    </section>
  );
};

export default Dashboard;
