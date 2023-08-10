import { VStack, Flex, HStack, Spinner, Box, Text } from "@chakra-ui/react";
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
  urgent: boolean;
  due: Date;
  completed: boolean;
}

const Dashboard = () => {
  const { isUserLoading } = useUser();
  const [tasks, setTasks] = useState<ITask[]>(dummyTasks);

  const pending = tasks.filter((task) => !task.completed).length;

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
                <Task
                  key={task.id}
                  currentTask={task}
                  allTasks={tasks}
                  setTasks={setTasks}
                />
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
