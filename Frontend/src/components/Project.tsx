import { Box, Button, Flex, Heading, Spinner, VStack } from "@chakra-ui/react";
import AdditionalDetailInput from "./AdditionalDetailInput";
import ProjectInput from "./ProjectInput";
import UserInputs from "./UserInputs";
import useProjectQueryStore from "../store/useProjectQueryStore";
import axios from "axios";
import { useState } from "react";

const Project = () => {
  const projetQuery = useProjectQueryStore((s) => s.projectQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [isFine, setIsFine] = useState(false);

  const handleStartChat = async () => {
    setIsLoading(true);
    let teamMessage = projetQuery.teammates.reduce(
      (acc, item) =>
        `${acc} ${item.username} who has strengths like ${item.strengths.join(
          ", "
        )} and `,
      ""
    );

    const data = {
      content: `The project details are as follows :  ${projetQuery.projectDeatils}. User is  thinking of approaching the project like this :  ${projetQuery.additionalDetails}. The Team Including The User : ${teamMessage}`,
      metadata: {
        loc: {
          lines: {
            from: 1,
            to: 1,
          },
        },
      },
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/add-point",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        setIsLoading(false);
        setIsFine(true);
      }
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
        <VStack>
          <Button colorScheme={"yellow"} onClick={handleStartChat}>
            Start Chat
          </Button>
          {isLoading && <Spinner marginTop={3} alignSelf={"flex-end"} />}
        </VStack>
      </Flex>

      {isFine && <Heading>YOU CAN NOW START THE CHAT</Heading>}
    </Box>
  );
};

export default Project;
