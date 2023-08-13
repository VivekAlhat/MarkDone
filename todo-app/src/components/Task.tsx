import {
  Box,
  Heading,
  Text,
  HStack,
  Checkbox,
  Flex,
  IconButton,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { ITask } from "../pages/Dashboard";
import { format } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import supabase from "../db/supabase";

type TaskProps = {
  currentTask: ITask;
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
};

const Task = ({ currentTask, setTasks, tasks }: TaskProps) => {
  const toast = useToast();
  const { id, name, label, completed, urgent, due } = currentTask;
  const formattedDate = format(new Date(due), "PP");

  const handleTaskChange = async (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);

    const { error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Some error occured while updating your task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTask = async (id: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);

    await supabase.from("tasks").delete().eq("id", id);
  };

  return (
    <Flex gap={5} alignItems={"center"} w={"full"}>
      <Checkbox
        isChecked={completed}
        size={"lg"}
        rounded={"full"}
        onChange={() => handleTaskChange(id)}
      />
      <Box>
        <HStack spacing={"4"} mb={2}>
          <Heading
            as={"h3"}
            size={"md"}
            textDecor={completed ? "line-through" : "none"}
          >
            {name}
          </Heading>
          <Text fontSize={"sm"} bg={"orange.200"} px={2} borderRadius={"md"}>
            {label}
          </Text>
          {urgent && (
            <Text fontSize={"sm"} bg={"red.200"} px={2} borderRadius={"md"}>
              urgent
            </Text>
          )}
        </HStack>
        <Text color={"gray.500"}>Due {formattedDate}</Text>
      </Box>
      <Spacer />
      <IconButton
        icon={<DeleteIcon />}
        aria-label={"Delete Task"}
        onClick={() => handleDeleteTask(id)}
      />
    </Flex>
  );
};

export default Task;
