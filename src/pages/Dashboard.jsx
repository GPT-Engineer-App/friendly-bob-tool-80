import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Container, Spinner, useToast } from "@chakra-ui/react";

const Dashboard = ({ userToken }) => {
  const [apiKey, setApiKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch("https://backengine-pkys.fly.dev/users/apikey", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setApiKey(data);
        } else {
          toast({
            title: "Error",
            description: data.detail ? data.detail[0].msg : "Failed to fetch API key",
            status: "error",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchApiKey();
  }, [userToken, toast]);
  return (
    <Container centerContent>
      {isLoading ? (
        <Spinner />
      ) : apiKey ? (
        <Box w="100%" p={4}>
          <Heading mb={6}>Dashboard</Heading>
          <Text mt={4}>Your API Key: {apiKey}</Text>
          <Text>Welcome to your dashboard!</Text>
        </Box>
      ) : (
        <Box w="100%" p={4}>
          <Heading mb={6}>Dashboard</Heading>
          <Text>Welcome to your dashboard! No API Key available.</Text>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
