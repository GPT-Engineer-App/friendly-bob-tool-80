import React from "react";
import { Box, Heading, Text, Container } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Container centerContent>
      <Box w="100%" p={4}>
        <Heading mb={6}>Dashboard</Heading>
        <Text>Welcome to your dashboard!</Text>
      </Box>
    </Container>
  );
};

export default Dashboard;
