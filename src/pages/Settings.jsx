import { Box, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Settings() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetch("https://backengine-pkys.fly.dev/users/me")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast({
          title: "Error fetching user data.",
          description: error.toString(),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
      });
  }, [toast]);

  return (
    <Box p={4}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box>
          {}
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
}

export default Settings;
