import { ITask } from "../App";

const dummyTasks: ITask[] = [
  {
    id: 1,
    name: "Do something",
    label: "personal",
    isUrgent: false,
    due: new Date(),
    isCompleted: false,
  },
  {
    id: 2,
    name: "Do anything",
    label: "personal",
    isUrgent: false,
    due: new Date(),
    isCompleted: false,
  },
  {
    id: 3,
    name: "Do this",
    label: "work",
    isUrgent: true,
    due: new Date(),
    isCompleted: true,
  },
];

export { dummyTasks };
