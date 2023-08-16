import {
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Select,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { ITask } from "../pages/Dashboard";
import useUser from "../hooks/useUser";
import supabase from "../db/supabase";

type TaskInputs = {
  name: string;
  label: string;
  due: Date;
  urgent: boolean;
};

type AddTodoProps = {
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
};

const AddTodo = ({ setTasks }: AddTodoProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskInputs>();

  const onSubmit: SubmitHandler<TaskInputs> = async (data) => {
    const newTask = {
      created_by: user?.id,
      ...data,
    };

    const { data: response, error } = await supabase
      .from("tasks")
      .insert(newTask)
      .select();

    if (error) {
      toast({
        title: "Error",
        description: "Some error occured during sign in",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    if (response) {
      const task = response[0] as ITask;
      setTasks((prev) => [...prev, task]);
    }

    reset();
    onClose();
  };

  return (
    <>
      <Flex
        p={5}
        bg={"gray.100"}
        alignItems={"center"}
        justifyContent={"center"}
        cursor={"pointer"}
        onClick={onOpen}
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"gray.200"}
        _hover={{ backgroundColor: "gray.300" }}
      >
        <AddIcon mx={2} boxSize={3} />
        <Text fontSize={"md"}>New Task</Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent mx={2} as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Task</FormLabel>
              <Input
                placeholder="Play some music"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Text as={"span"} color={"red"}>
                  This field is required
                </Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Label</FormLabel>
              <Select
                placeholder="Select label"
                {...register("label", { required: true })}
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </Select>
              {errors.label && (
                <Text as={"span"} color={"red"}>
                  This field is required
                </Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Due</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                {...register("due", { required: true })}
              />
              {errors.due && (
                <Text as={"span"} color={"red"}>
                  This field is required
                </Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <Checkbox {...register("urgent")}>Is Urgent?</Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTodo;
