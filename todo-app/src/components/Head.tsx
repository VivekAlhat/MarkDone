import { Box, Heading, Text } from "@chakra-ui/react";

type HeadProps = {
  pending: number;
};

const Head = ({ pending }: HeadProps) => {
  return (
    <Box>
      <Heading as={"h2"} size={"lg"}>
        Your to-do list
      </Heading>
      <Text color={"gray.700"} mt={2}>
        {pending} pending {pending > 1 || pending === 0 ? "tasks" : "task"}
      </Text>
    </Box>
  );
};

export default Head;
