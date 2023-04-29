import "./App.css";
import GanttChart from "./components/GanttChart";

function App() {
  const tasks = [
    {
      id: 1,
      name: "Task 1",
      startDate: "2023-04-25",
      duration: 4,
      color: "#4285F4"
    },
    {
      id: 2,
      name: "Task 2",
      startDate: "2023-04-25",
      duration: 3,
      color: "#DB4437"
    },
    {
      id: 3,
      name: "Task 3",
      startDate: "2023-04-26",
      duration: 5,
      color: "#F4B400"
    },
    {
      id: 4,
      name: "Task 4",
      startDate: "2023-04-28",
      duration: 6,
      color: "#0F9D58"
    },
    {
      id: 5,
      name: "Task 5",
      startDate: "2023-05-01",
      duration: 4,
      color: "#4285F4"
    },
    {
      id: 6,
      name: "Task 6",
      startDate: "2023-05-03",
      duration: 7,
      color: "#DB4437"
    },
    {
      id: 7,
      name: "Task 7",
      startDate: "2023-05-05",
      duration: 3,
      color: "#F4B400"
    },
    {
      id: 8,
      name: "Task 8",
      startDate: "2023-05-08",
      duration: 6,
      color: "#0F9D58"
    },
    {
      id: 9,
      name: "Task 9",
      startDate: "2023-05-10",
      duration: 5,
      color: "#4285F4"
    },
    {
      id: 10,
      name: "Task 10",
      startDate: "2023-05-12",
      duration: 8,
      color: "#DB4437"
    },
    {
      id: 11,
      name: "Task 11",
      startDate: "2023-05-14",
      duration: 4,
      color: "#F4B400"
    },
    {
      id: 12,
      name: "Task 12",
      startDate: "2023-05-16",
      duration: 6,
      color: "#0F9D58"
    },
    {
      id: 13,
      name: "Task 13",
      startDate: "2023-05-18",
      duration: 5,
      color: "#4285F4"
    },
    {
      id: 14,
      name: "Task 14",
      startDate: "2023-05-20",
      duration: 7,
      color: "#DB4437"
    },
    {
      id: 15,
      name: "Task 15",
      startDate: "2023-05-22",
      duration: 3,
      color: "#F4B400"
    },
    {
      id: 16,
      name: "Task 16",
      startDate: "2023-05-24",
      duration: 4,
      color: "#0F9D58"
    },
    {
      id: 17,
      name: "Task 17",
      startDate: "2023-05-26",
      duration: 5,
      color: "#4285F4"
    },
    {
      id: 18,
      name: "Task 18",
      startDate: "2023-05-28",
      duration: 6,
      color: "#DB4437"
    },
    {
      id: 19,
      name: "Task 19",
      startDate: "2023-05-30",
      duration: 7,
      color: "#F4B400"
    },
    {
      id: 20,
      name: "Task 20",
      startDate: "2023-06-01",
      duration: 5,
      color: "#0F9D58"
    },
    {
      id: 21,
      name: "Task 21",
      startDate: "2023-06-03",
      duration: 4,
      color: "#4285F4"
    },
    {
      id: 22,
      name: "Task 22",
      startDate: "2023-06-05",
      duration: 3,
      color: "#DB4437"
    },
    {
      id: 23,
      name: "Task 23",
      startDate: "2023-06-07",
      duration: 5,
      color: "#F4B400"
    },
    {
      id: 24,
      name: "Task 24",
      startDate: "2023-06-09",
      duration: 6,
      color: "#0F9D58"
    },
    {
      id: 25,
      name: "Task 25",
      startDate: "2023-06-11",
      duration: 4,
      color: "#4285F4"
    },
    {
      id: 26,
      name: "Task 26",
      startDate: "2023-06-13",
      duration: 7,
      color: "#DB4437"
    },
    {
      id: 27,
      name: "Task 27",
      startDate: "2023-06-15",
      duration: 3,
      color: "#F4B400"
    },
    {
      id: 28,
      name: "Task 28",
      startDate: "2023-06-17",
      duration: 6,
      color: "#0F9D58"
    },
    {
      id: 29,
      name: "Task 29",
      startDate: "2023-06-19",
      duration: 5,
      color: "#4285F4"
    },
    {
      id: 30,
      name: "Task 30",
      startDate: "2023-06-21",
      duration: 8,
      color: "#DB4437"
    }
  ];

  const data = [
    {
      name: "Project 1",
      milestones: [
        {
          id: 14,
          name: "Milestone 14",
          startDate: "2023-05-20",
          duration: 7,
          primaryColor: "#DB4437",
          secondaryColor: "#DB443780",
          progress: 35
        },
        {
          id: 15,
          name: "Milestone 15",
          startDate: "2023-05-22",
          duration: 3,
          primaryColor: "#F4B400",
          secondaryColor: "#F4B40080",
          progress: 65
        },
        {
          id: 16,
          name: "Milestone 16",
          startDate: "2023-05-24",
          duration: 4,
          primaryColor: "#0F9D58",
          secondaryColor: "#0F9D5880",
          progress: 28
        },
        {
          id: 17,
          name: "Milestone 17",
          startDate: "2023-05-26",
          duration: 5,
          primaryColor: "#4285F4",
          secondaryColor: "#4285F480",
          progress: 45
        }
      ]
    },
    {
      name: "Project 2",
      milestones: [
        {
          id: 5,
          name: "Milestone 5",
          startDate: "2023-04-28",
          duration: 4,
          primaryColor: "#4285F4",
          secondaryColor: "#4285F480",
          progress: 70
        },
        {
          id: 6,
          name: "Milestone 6",
          startDate: "2023-04-30",
          duration: 7,
          primaryColor: "#DB4437",
          secondaryColor: "#DB443780",
          progress: 11
        },
        {
          id: 7,
          name: "Milestone 7",
          startDate: "2023-05-01",
          duration: 3,
          primaryColor: "#F4B400",
          secondaryColor: "#F4B40080",
          progress: 52
        }
      ]
    },
    {
      name: "Project 3",
      milestones: [
        {
          id: 9,
          name: "Milestone 9",
          startDate: "2023-05-06",
          duration: 5,
          primaryColor: "#4285F4",
          secondaryColor: "#4285F480",
          progress: 89
        },
        {
          id: 10,
          name: "Milestone 10",
          startDate: "2023-05-09",
          duration: 8,
          primaryColor: "#DB4437",
          secondaryColor: "#DB443780",
          progress: 33
        }
      ]
    },
    {
      name: "Project 4",
      milestones: [
        {
          id: 11,
          name: "Milestone 11",
          startDate: "2023-05-11",
          duration: 4,
          primaryColor: "#F4B400",
          secondaryColor: "#F4B40080",
          progress: 15
        },
        {
          id: 12,
          name: "Milestone 12",
          startDate: "2023-05-13",
          duration: 6,
          primaryColor: "#0F9D58",
          secondaryColor: "#0F9D5880",
          progress: 48
        },
        {
          id: 13,
          name: "Milestone 13",
          startDate: "2023-05-15",
          duration: 5,
          primaryColor: "#4285F4",
          secondaryColor: "#4285F480",
          progress: 76
        }
      ]
    },
    {
      name: "Project 5",
      milestones: [
        {
          id: 1,
          name: "Milestone 1",
          startDate: "2023-04-25",
          duration: 4,
          primaryColor: "#4285F",
          secondaryColor: "#4285F080",
          progress: 20
        },
        {
          id: 2,
          name: "Milestone 2",
          startDate: "2023-04-25",
          duration: 3,
          primaryColor: "#DB4437",
          secondaryColor: "#DB443780",
          progress: 47
        },
        {
          id: 3,
          name: "Milestone 3",
          startDate: "2023-04-26",
          duration: 5,
          primaryColor: "#F4B400",
          secondaryColor: "#F4B40080",
          progress: 30
        },
        {
          id: 4,
          name: "Milestone 4",
          startDate: "2023-04-28",
          duration: 6,
          primaryColor: "#0F9D58",
          secondaryColor: "#0F9D5880",
          progress: 68
        }
      ]
    },
    {
      name: "Project 6",
      milestones: [
        {
          id: 8,
          name: "Milestone 8",
          startDate: "2023-05-04",
          duration: 6,
          primaryColor: "#0F9D58",
          secondaryColor: "#0F9D5880",
          progress: 54
        },
        {
          id: 18,
          name: "Milestone 18",
          startDate: "2023-05-28",
          duration: 6,
          primaryColor: "#DB4437",
          secondaryColor: "#DB443780",
          progress: 26
        },
        {
          id: 19,
          name: "Milestone 19",
          startDate: "2023-05-30",
          duration: 7,
          primaryColor: "#F4B400",
          secondaryColor: "#F4B40080",
          progress: 12
        }
      ]
    }
  ];

  return (
    <div className="App">
      <h1>Gantt Chart</h1>
      {/**
       * displayText: What is displayed in the card
       *   - diff - difference beteween start time and current time
       *   - name - Name property in the object passed as a prop
       */}
      <GanttChart displayText="diff" data={data} tasks={tasks} width={1000} height={700} />
    </div>
  );
}

export default App;
