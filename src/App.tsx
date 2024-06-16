import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./components/NavBar";
import Project from "./components/Project";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav nav" "project chat"`,
        lg: `"nav nav" "project chat"`,
      }}
      templateColumns={{
        base: "1fr 1fr",
        lg: "1fr 1fr",
      }}
      padding={5}
    >
      <GridItem area="nav">
        <Navbar />
      </GridItem>
      <GridItem area="project">
        <Project />
      </GridItem>
      <GridItem area="chat">
        <ChatBot />
      </GridItem>
    </Grid>
  );
}

export default App;
