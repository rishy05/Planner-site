import create from 'zustand';

const useStore = create((set) => ({
    showForm: false,
    setShowForm: (show) => set({ showForm: show }),
}));

export default useStore;
