import { HStack, Heading } from "@chakra-ui/layout";
import ColorModeSwitch from "./ColorModeSwitch";
import { Box, Image } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <HStack justifyContent={"space-between"}>
      <Box boxSize={20}>
        <Image src="https://static.wixstatic.com/media/977dce_69967a030adc4ee78c0c90c1cd9e2b32~mv2.png" />
        {/* <HStack> */}
        {/* </HStack> */}
      </Box>
      <Heading>Group Flow AI</Heading>
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
