import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Container, Spinner, useToast, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";

const Dashboard = ({ userToken }) => {
  const [apiKey, setApiKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingUserInfo, setIsFetchingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchUserInfo = async () => {
    setIsFetchingUserInfo(true);
    try {
      const response = await fetch("https://backengine-pkys.fly.dev/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUserInfo(data);
        onOpen();
      } else {
        toast({
          title: "Error",
          description: data.detail ? data.detail[0].msg : "Failed to fetch user information",
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
      setIsFetchingUserInfo(false);
    }
  };

  return (
    <Container centerContent>
      {isLoading ? (
        <Spinner />
      ) : apiKey ? (
        <Box w="100%" p={4}>
          <Heading mb={6}>Dashboard</Heading>
          <Text mt={4}>Your API Key: {apiKey}</Text>
          <Button onClick={fetchUserInfo} isLoading={isFetchingUserInfo} m={4}>
            User Info
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>User Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <pre>{JSON.stringify(userInfo, null, 2)}</pre>
              </ModalBody>
            </ModalContent>
          </Modal>
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
