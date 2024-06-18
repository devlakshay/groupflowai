import { Box, Button, Flex } from "@chakra-ui/react";
import AdditionalDetailInput from "./AdditionalDetailInput";
import ProjectInput from "./ProjectInput";
import UserInputs from "./UserInputs";

const Project = () => {
  const handleStartChat = () => {};
  return (
    <Box padding={5}>
      <ProjectInput />
      <AdditionalDetailInput />
      <UserInputs />

      <Flex marginY={5} justifyContent={"flex-end"}>
        <Button colorScheme={"yellow"} onClick={handleStartChat}>
          Start Chat
        </Button>
      </Flex>
    </Box>
  );
};

export default Project;
