import {
  VStack,
  Flex,
  Divider,
  HStack,
  Checkbox,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";

import { dummyTasks } from "./constants/tasks";
import Task from "./components/Task";
import Head from "./components/Head";
import AddTodo from "./components/AddTodo";

export interface ITask {
  id: number;
  name: string;
  label: string;
  isUrgent: boolean;
  due: Date;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState(dummyTasks);

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
    <Container maxW={"container.md"} minH={"100vh"} p={5}>
      <VStack spacing={5} align={"flex-start"}>
        <Head pending={pending} />
        <Divider />
        <Flex flexDir={"column"} gap={3} mt={5} w={"full"}>
          {tasks.map((task) => (
            <HStack
              key={task.id}
              as={"div"}
              bg={"white"}
              p={5}
              rounded={"lg"}
              spacing={5}
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
    </Container>
  );
}

export default App;
