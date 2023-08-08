import {
  VStack,
  Flex,
  HStack,
  Checkbox,
  Spinner,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { dummyTasks } from "../constants/tasks";
import Task from "../components/Task";
import Head from "../components/Head";
import AddTodo from "../components/AddTodo";
import useUser from "../hooks/useUser";

export interface ITask {
  id: number;
  name: string;
  label: string;
  isUrgent: boolean;
  due: Date;
  isCompleted: boolean;
}

const Dashboard = () => {
  const { isUserLoading } = useUser();
  const [tasks, setTasks] = useState<ITask[]>(dummyTasks);

  const pending = tasks.filter((task) => !task.isCompleted).length;

  const handleTaskChange = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <Box>
      {isUserLoading ? (
        <VStack h={"100vh"} w={"full"} justifyContent={"center"}>
          <Spinner />
          <Text>Loading your tasks</Text>
        </VStack>
      ) : (
        <VStack spacing={5} p={5} w={"full"}>
          <Head pending={pending} />
          <Flex flexDir={"column"} gap={3} mt={5} w={"full"}>
            {tasks.map((task) => (
              <HStack
                key={task.id}
                as={"div"}
                bg={"white"}
                p={5}
                rounded={"lg"}
                spacing={8}
                border={"1px solid"}
                borderColor={"gray.300"}
              >
                <Checkbox
                  isChecked={task.isCompleted}
                  size={"lg"}
                  rounded={"full"}
                  onChange={() => handleTaskChange(task.id)}
                />
                <Task key={task.id} task={task} />
              </HStack>
            ))}
            <AddTodo />
          </Flex>
        </VStack>
      )}
    </Box>
  );
};

export default Dashboard;
