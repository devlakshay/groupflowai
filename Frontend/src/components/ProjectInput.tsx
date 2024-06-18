import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  Stack,
  Input,
  Button,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import useProjectQueryStore from "../store/useProjectQueryStore";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "/Users/lakshyagoel/Desktop/Projects/GroupFlowAI/Frontend/node_modules/pdfjs-dist/build/pdf.worker.mjs";

const ProjectInput = () => {
  const projectDeatils = useProjectQueryStore(
    (s) => s.projectQuery.projectDeatils
  );
  const setProjectDeatils = useProjectQueryStore((s) => s.setProjectDeatils);
  const [selectedOption, setSelectedOption] = useState<string>("text");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setProjectDeatils("");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProjectDeatils(event.target.value);
  };

  const convertPdfToJson = async (arrayBuffer: ArrayBuffer) => {
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    const numPages = pdf.numPages;
    const pages = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const textItems = textContent.items.map((item: any) => item.str);
      pages.push({ pageNumber: pageNum, text: textItems.join(" ") });
    }

    return pages;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const json = await convertPdfToJson(arrayBuffer);
      console.log(JSON.parse(JSON.stringify(json)));
      setProjectDeatils(JSON.stringify(json));
    }
  };

  return (
    <>
      <Heading size="md" marginY={2}>
        Project Details
      </Heading>
      <RadioGroup onChange={handleOptionChange} value={selectedOption}>
        <Stack direction="row">
          <Radio value="text">Text</Radio>
          <Radio value="pdf">PDF</Radio>
          <Radio value="link">Link</Radio>
        </Stack>
      </RadioGroup>

      {selectedOption === "text" && (
        <Textarea
          mt={4}
          placeholder="Enter text"
          value={projectDeatils}
          onChange={handleInputChange}
        />
      )}

      {selectedOption === "pdf" && (
        <Input
          mt={4}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          alignContent={"center"}
        />
      )}

      {selectedOption === "link" && (
        <Input
          mt={4}
          placeholder="Enter link"
          value={projectDeatils}
          onChange={handleInputChange}
        />
      )}
    </>
  );
};

export default ProjectInput;
