import { useToast } from "primevue/usetoast";

export const useToastLogic = () => {
    const toast = useToast();

    const toastInfo = (text, status) => toast.add({
        severity: status,
        summary: text,
        life: 3000
    });

    return {toastInfo }
}