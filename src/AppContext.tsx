import { createContext, ReactNode, useContext, useState } from "react";

interface AppState {
    name: string;
    nim: string;
    todo: string;
    presence: string;
}

interface AppStateContextType {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = () => {
    const context = useContext(AppStateContext);

    if (!context) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
}

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>({
        name: '',
        nim: '',
        todo: '',
        presence: '',
    });

    return (
        <AppStateContext.Provider value={{ state, setState }}>
            {children}
        </AppStateContext.Provider>
    );
}