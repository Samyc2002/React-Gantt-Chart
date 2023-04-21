import logo from "./logo.svg";
import "./App.css";
import GanttChart from "./components/GanttChart";

function App() {
  const tasks = [
    {
      id: 1,
      name: "Task 1",
      startDate: "2023-04-21",
      duration: 4,
      color: "#4285F4",
    },
    {
      id: 2,
      name: "Task 2",
      startDate: "2023-04-23",
      duration: 3,
      color: "#DB4437",
    },
    {
      id: 3,
      name: "Task 3",
      startDate: "2023-04-25",
      duration: 5,
      color: "#F4B400",
    },
    {
      id: 4,
      name: "Task 4",
      startDate: "2023-04-28",
      duration: 6,
      color: "#0F9D58",
    },
    {
      id: 5,
      name: "Task 5",
      startDate: "2023-05-01",
      duration: 4,
      color: "#4285F4",
    },
    {
      id: 6,
      name: "Task 6",
      startDate: "2023-05-03",
      duration: 7,
      color: "#DB4437",
    },
    {
      id: 7,
      name: "Task 7",
      startDate: "2023-05-05",
      duration: 3,
      color: "#F4B400",
    },
    {
      id: 8,
      name: "Task 8",
      startDate: "2023-05-08",
      duration: 6,
      color: "#0F9D58",
    },
    {
      id: 9,
      name: "Task 9",
      startDate: "2023-05-10",
      duration: 5,
      color: "#4285F4",
    },
    {
      id: 10,
      name: "Task 10",
      startDate: "2023-05-12",
      duration: 8,
      color: "#DB4437",
    },
    {
      id: 11,
      name: "Task 11",
      startDate: "2023-05-14",
      duration: 4,
      color: "#F4B400",
    },
    {
      id: 12,
      name: "Task 12",
      startDate: "2023-05-16",
      duration: 6,
      color: "#0F9D58",
    },
    {
      id: 13,
      name: "Task 13",
      startDate: "2023-05-18",
      duration: 5,
      color: "#4285F4",
    },
    {
      id: 14,
      name: "Task 14",
      startDate: "2023-05-20",
      duration: 7,
      color: "#DB4437",
    },
    {
      id: 15,
      name: "Task 15",
      startDate: "2023-05-22",
      duration: 3,
      color: "#F4B400",
    },
    // {
    //   id: 16,
    //   name: "Task 16",
    //   startDate: "2023-05-24",
    //   duration: 4,
    //   color: "#0F9D58",
    // },
    // {
    //   id: 17,
    //   name: "Task 17",
    //   startDate: "2023-05-26",
    //   duration: 5,
    //   color: "#4285F4",
    // },
    // {
    //   id: 18,
    //   name: "Task 18",
    //   startDate: "2023-05-28",
    //   duration: 6,
    //   color: "#DB4437",
    // },
    // {
    //   id: 19,
    //   name: "Task 19",
    //   startDate: "2023-05-30",
    //   duration: 7,
    //   color: "#F4B400",
    // },
    // {
    //   id: 20,
    //   name: "Task 20",
    //   startDate: "2023-06-01",
    //   duration: 5,
    //   color: "#0F9D58",
    // },
    // {
    //   id: 21,
    //   name: "Task 21",
    //   startDate: "2023-06-03",
    //   duration: 4,
    //   color: "#4285F4",
    // },
    // {
    //   id: 22,
    //   name: "Task 22",
    //   startDate: "2023-06-05",
    //   duration: 3,
    //   color: "#DB4437",
    // },
    // {
    //   id: 23,
    //   name: "Task 23",
    //   startDate: "2023-06-07",
    //   duration: 5,
    //   color: "#F4B400",
    // },
    // {
    //   id: 24,
    //   name: "Task 24",
    //   startDate: "2023-06-09",
    //   duration: 6,
    //   color: "#0F9D58",
    // },
    // {
    //   id: 25,
    //   name: "Task 25",
    //   startDate: "2023-06-11",
    //   duration: 4,
    //   color: "#4285F4",
    // },
    // {
    //   id: 26,
    //   name: "Task 26",
    //   startDate: "2023-06-13",
    //   duration: 7,
    //   color: "#DB4437",
    // },
    // {
    //   id: 27,
    //   name: "Task 27",
    //   startDate: "2023-06-15",
    //   duration: 3,
    //   color: "#F4B400",
    // },
    // {
    //   id: 28,
    //   name: "Task 28",
    //   startDate: "2023-06-17",
    //   duration: 6,
    //   color: "#0F9D58",
    // },
    // {
    //   id: 29,
    //   name: "Task 29",
    //   startDate: "2023-06-19",
    //   duration: 5,
    //   color: "#4285F4",
    // },
    // {
    //   id: 30,
    //   name: "Task 30",
    //   startDate: "2023-06-21",
    //   duration: 8,
    //   color: "#DB4437",
    // },
  ];

  return (
    <div className="App">
      <h1>Gantt Chart</h1>
      <GanttChart tasks={tasks} />
    </div>
  );
}

export default App;
