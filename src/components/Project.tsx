import React from "react";
import ProjectInput from "./ProjectInput";
import { Box, Heading } from "@chakra-ui/react";

const Project = () => {
  return (
    <Box padding={5}>
      <Heading size="md" marginY={2}>
        Project Details
      </Heading>
      <ProjectInput />
    </Box>
  );
};

export default Project;
