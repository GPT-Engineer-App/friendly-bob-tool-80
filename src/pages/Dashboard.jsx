import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Text, Container } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Container centerContent>
      <Box w="100%" p={4}>
        <Heading mb={6}>Dashboard</Heading>
        <Text>Welcome to your dashboard!</Text>
        {}
      </Box>
    </Container>
  );
};

export default Dashboard;
