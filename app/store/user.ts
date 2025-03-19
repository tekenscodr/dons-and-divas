import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}


interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
    getUser: () => User | null;
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
    getUser: () => get().user,

}));

