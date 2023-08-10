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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRef } from "react";

const AddTodo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

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

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent mx={2}>
          <ModalHeader>Create new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Task</FormLabel>
              <Input ref={initialRef} placeholder="Play some music" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Label</FormLabel>
              <Select placeholder="Select label">
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Due</FormLabel>
              <Input placeholder="Select Date and Time" size="md" type="date" />
            </FormControl>

            <FormControl mt={4}>
              <Checkbox>Is Urgent?</Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
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
