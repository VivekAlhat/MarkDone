import { Box, Heading, Text, HStack } from "@chakra-ui/react";
import { ITask } from "../App";
import { format } from "date-fns";

type TaskProps = {
  task: ITask;
};

const Task = ({ task }: TaskProps) => {
  const { name, label, isCompleted, isUrgent, due } = task;
  const formattedDate = format(due, "PP");

  return (
    <Box>
      <HStack spacing={"4"} mb={2}>
        <Heading
          as={"h3"}
          size={"md"}
          textDecor={isCompleted ? "line-through" : "none"}
        >
          {name}
        </Heading>
        <Text fontSize={"sm"} bg={"orange.200"} px={2} borderRadius={"md"}>
          {label}
        </Text>
        {isUrgent && (
          <Text fontSize={"sm"} bg={"red.200"} px={2} borderRadius={"md"}>
            Urgent
          </Text>
        )}
      </HStack>
      <Text color={"gray.500"}>Due {formattedDate}</Text>
    </Box>
  );
};

export default Task;
