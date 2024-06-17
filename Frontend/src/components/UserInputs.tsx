import React, { useState } from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Heading,
  Text,
  Wrap,
  WrapItem,
  TagLabel,
  TagCloseButton,
  Tag,
} from "@chakra-ui/react";

interface Teammate {
  username: string;
  strengths: string[];
}

const Teammates: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [username, setUsername] = useState("");
  const [strengths, setStrengths] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const handleAddTeammate = () => {
    if (isEditing !== null) {
      const updatedTeammates = teammates.map((teammate, index) =>
        index === isEditing ? { username, strengths } : teammate
      );
      setTeammates(updatedTeammates);
      setIsEditing(null);
    } else {
      setTeammates([...teammates, { username, strengths }]);
    }
    setUsername("");
    setStrengths([]);
    onClose();
  };

  const handleEditTeammate = (index: number) => {
    setIsEditing(index);
    setUsername(teammates[index].username);
    setStrengths(teammates[index].strengths);
    onOpen();
  };

  const handleDeleteTeammate = (index: number) => {
    setTeammates(teammates.filter((_, i) => i !== index));
  };

  return (
    <Box marginTop={3}>
      <Heading size="md">User Strengths</Heading>
      <TableContainer mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Strengths</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teammates.map((teammate, index) => (
              <Tr
                key={index}
                onClick={() => handleEditTeammate(index)}
                style={{ cursor: "pointer" }}
              >
                <Td>{teammate.username}</Td>
                <Td>{teammate.strengths.join(", ")}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteTeammate(index)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Button onClick={onOpen} marginTop={3}>
        Add Teammate
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing !== null ? "Edit Teammate" : "Add Teammate"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Strengths</FormLabel>
              <Select
                placeholder="Select strength"
                value={strengths}
                onChange={(e) => setStrengths([e.target.value])}
                multiple
              >
                <option value="No Strength">No Strength</option>
                <option value="Leadership">Leadership</option>
                <option value="Teamwork">Teamwork</option>
                <option value="Problem-solving">Problem-solving</option>
                <option value="Custom">Custom</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddTeammate}>
              {isEditing !== null ? "Update" : "Submit"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Teammates;
