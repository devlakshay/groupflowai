import { HStack, Heading } from "@chakra-ui/layout";
import ColorModeSwitch from "./ColorModeSwitch";

const Navbar = () => {
  return (
    <HStack justifyContent={"space-between"}>
      <Heading>Group Flow AI</Heading>
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
