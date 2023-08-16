import {
  VStack,
  Flex,
  HStack,
  Spinner,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Task from "../components/Task";
import Head from "../components/Head";
import AddTodo from "../components/AddTodo";
import useUser from "../hooks/useUser";
import supabase from "../db/supabase";

export interface ITask {
  id: number;
  name: string;
  label: string;
  urgent: boolean;
  due: Date;
  completed: boolean;
}

const Dashboard = () => {
  const toast = useToast();
  const { isUserLoading } = useUser();
  const [tasks, setTasks] = useState<ITask[]>([]);

  const pending = tasks.filter((task) => !task.completed).length;

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("tasks").select();
      if (error) {
        toast({
          title: "Error",
          description: "Some error occured while getting your tasks",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      setTasks(data as ITask[]);
    };
    fetchTasks();
  }, [toast]);

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
                  setTasks={setTasks}
                  tasks={tasks}
                />
              </HStack>
            ))}
            <AddTodo setTasks={setTasks} />
          </Flex>
        </VStack>
      )}
    </Box>
  );
};

export default Dashboard;
