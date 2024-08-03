import { create } from 'zustand';

type State = {
  readOnlyForm: boolean;
};

type Actions = {
  activateReadOnlyForm: () => void;
  deactivateReadOnlyForm: () => void;
};

export const useFormStore = create<State & Actions>((set) => ({
  readOnlyForm: false,
  activateReadOnlyForm: () => set({ readOnlyForm: true }),
  deactivateReadOnlyForm: () => set({ readOnlyForm: false }),
}));

type ProjectState = {
  projectFormList: number[];
};

type ProjectActions = {
  addValidProjectForm: (index: number) => void;
  removeValidProjectForm: (index: number) => void;
};

export const useProjectStore = create<ProjectState & ProjectActions>((set) => ({
  projectFormList: [],
  addValidProjectForm: (index) => set((state) => ({ projectFormList: [...state.projectFormList, index] })),
  removeValidProjectForm: (index) =>
    set((state) => ({ projectFormList: [...state.projectFormList].filter((item) => item !== index) })),
}));
