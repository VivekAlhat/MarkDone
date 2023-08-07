import { ITask } from "../App";

const dummyTasks: ITask[] = [
  {
    id: 1,
    name: "Do something",
    label: "Personal",
    isUrgent: false,
    due: new Date(),
    isCompleted: false,
  },
  {
    id: 2,
    name: "Do anything",
    label: "Personal",
    isUrgent: false,
    due: new Date(),
    isCompleted: false,
  },
  {
    id: 3,
    name: "Do this",
    label: "Work",
    isUrgent: true,
    due: new Date(),
    isCompleted: true,
  },
];

export { dummyTasks };
