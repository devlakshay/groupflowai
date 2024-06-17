import { Box, Button, Heading, Textarea } from "@chakra-ui/react";
import ProjectInput from "./ProjectInput";
import { useState } from "react";

const AdditionalDetailInput = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  return (
    <Box marginTop={3}>
      <Heading size="md">Aditional Details</Heading>

      <Textarea
        mt={2}
        placeholder="Enter text"
        value={inputValue}
        onChange={handleInputChange}
      />

      <Button mt={4} colorScheme="blue" onClick={() => console.log(inputValue)}>
        Submit
      </Button>
    </Box>
  );
};

export default AdditionalDetailInput;
