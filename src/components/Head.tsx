import {
  Avatar,
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import supabase from "../db/supabase";

type HeadProps = {
  pending: number;
};

const Head = ({ pending }: HeadProps) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
      <Box>
        <Heading as={"h2"} size={"lg"}>
          Your Tasks
        </Heading>
        <Text color={"gray.700"} mt={2}>
          {pending} pending {pending > 1 || pending === 0 ? "tasks" : "task"}
        </Text>
      </Box>
      <Menu>
        <MenuButton>
          <Avatar
            name={user?.user_metadata.name}
            src={user?.user_metadata.avatar_url}
          />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Head;
