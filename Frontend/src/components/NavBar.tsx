import { HStack, Heading } from "@chakra-ui/layout";
import ColorModeSwitch from "./ColorModeSwitch";
import { Box, Image } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <HStack justifyContent={"space-between"}>
      <Box boxSize={20}>
        <Image src="https://static.wixstatic.com/media/977dce_eaf439279def4538a53230ab7726d14e~mv2.png" />
      </Box>
      <Heading>Group Flow AI</Heading>
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
