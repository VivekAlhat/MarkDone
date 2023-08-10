import {
  Box,
  Heading,
  Text,
  HStack,
  Checkbox,
  Flex,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { ITask } from "../pages/Dashboard";
import { format } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";

type TaskProps = {
  currentTask: ITask;
  allTasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
};

const Task = ({ currentTask, allTasks, setTasks }: TaskProps) => {
  const { id, name, label, completed, urgent, due } = currentTask;
  const formattedDate = format(new Date(due), "PP");

  const handleTaskChange = (id: number) => {
    const updatedTasks = allTasks.map((task: ITask) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
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
      <IconButton icon={<DeleteIcon />} aria-label={"Delete Task"} />
    </Flex>
  );
};

export default Task;
