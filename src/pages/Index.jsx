import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, useToast, VStack, Text } from "@chakra-ui/react";

const Index = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const toast = useToast();

  const handleAuth = async (event) => {
    event.preventDefault();
    const url = `https://backengine-pkys.fly.dev/${isLoggingIn ? "login" : "signup"}`;
    const credentials = isLoggingIn ? { email, password } : { username, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (response.ok) {
        toast({ title: `Success!`, description: `You are now ${isLoggingIn ? "logged in" : "signed up"}.`, status: "success" });
      } else {
        toast({ title: "Error", description: data.detail[0].msg, status: "error" });
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, status: "error" });
    }
  };

  return (
    <Container centerContent>
      <Box w="100%" p={4}>
        <Heading mb={6}>{isLoggingIn ? "Login" : "Sign Up"}</Heading>
        <form onSubmit={handleAuth}>
          <VStack spacing={4}>
            {!isLoggingIn && (
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
            )}
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              {isLoggingIn ? "Login" : "Sign Up"}
            </Button>
          </VStack>
        </form>
        <Button onClick={() => navigate("/settings")} colorScheme="blue" mt={4}>
          Settings
        </Button>
        <Text cursor="pointer" mt={2} onClick={() => setIsLoggingIn(!isLoggingIn)}>
          {isLoggingIn ? "Need an account? Sign up" : "Already have an account? Login"}
        </Text>
      </Box>
    </Container>
  );
};

export default Index;
