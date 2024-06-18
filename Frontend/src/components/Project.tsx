import { Box, Button, Flex } from "@chakra-ui/react";
import AdditionalDetailInput from "./AdditionalDetailInput";
import ProjectInput from "./ProjectInput";
import UserInputs from "./UserInputs";
import useProjectQueryStore from "../store/useProjectQueryStore";
import axios from "axios";

const Project = () => {
  const projetQuery = useProjectQueryStore((s) => s.projectQuery);
  const handleStartChat = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/add-point",
        projetQuery,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
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
