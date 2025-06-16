import { createContext, PropsWithChildren, useContext } from 'react';
import { createStore } from 'zustand';

type TAssignSubjectStore = {
  sheetOpen: boolean;
  popOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  setPopOpen: (open: boolean) => void;
};

const createAssignSubjectStore = () => {
  return createStore<TAssignSubjectStore>((set) => ({
    sheetOpen: false,
    popOpen: false,
    setSheetOpen: (open) => set({ sheetOpen: open }),
    setPopOpen: (open) => set({ popOpen: open }),
  }));
};

const AssignSubjectContext = createContext<ReturnType<typeof createAssignSubjectStore> | null>(null);

export const AssignSubjectStoreProvider = ({ children }: PropsWithChildren) => {
  const store = createAssignSubjectStore();
  return <AssignSubjectContext.Provider value={store}>{children}</AssignSubjectContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAssignSubjectStore = () => {
  const store = useContext(AssignSubjectContext);
  if (!store) throw new Error('AssignSubjectsStore must be used within provider');
  return store;
};
