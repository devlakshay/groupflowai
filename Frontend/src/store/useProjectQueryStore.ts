import { create } from "zustand";
import { Teammate } from "../components/UserInputs";

export interface ProjectQuery {
  projectDeatils: string;
  additionalDetails?: string;
  teammates: Teammate[];
}

export interface ProjectQueryStore {
  projectQuery: ProjectQuery;
  setProjectDeatils: (detail: string) => void;
  setAdditionalDetails: (detail: string) => void;
  setTeammates: (teammates: Teammate[]) => void;
}

const useProjectQueryStore = create<ProjectQueryStore>((set) => ({
  projectQuery: { projectDeatils: "", teammates: [] },
  setProjectDeatils: (detail) =>
    set((store) => ({
      projectQuery: { ...store.projectQuery, projectDeatils: detail },
    })),
  setAdditionalDetails: (detail) =>
    set((store) => ({
      projectQuery: { ...store.projectQuery, additionalDetails: detail },
    })),
  setTeammates: (teammates) =>
    set((store) => ({
      projectQuery: {
        ...store.projectQuery,
        teammates: teammates,
      },
    })),
}));

export default useProjectQueryStore;
