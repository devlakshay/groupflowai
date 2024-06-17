import React from "react";
import ProjectInput from "./ProjectInput";
import { Box, Heading } from "@chakra-ui/react";
import AdditionalDetailInput from "./AdditionalDetailInput";
import UserInputs from "./UserInputs";

const Project = () => {
  return (
    <Box padding={5}>
      <ProjectInput />
      <AdditionalDetailInput />
      <UserInputs />
    </Box>
  );
};

export default Project;
