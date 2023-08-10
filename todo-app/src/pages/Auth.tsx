import { Button, Flex, Heading, useToast } from "@chakra-ui/react";
import supabase from "../db/supabase";

const Auth = () => {
  const toast = useToast();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/dashboard",
      },
    });

    if (error) {
      toast({
        title: "Error",
        description: "Some error occured during sign in",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={3}
      h={"100vh"}
    >
      <Heading>MarkDone</Heading>
      <Button onClick={handleSignIn} fontWeight={"normal"}>
        Sign in with Google
      </Button>
    </Flex>
  );
};

export default Auth;
