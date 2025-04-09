import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Category } from '@/types';
import { categoryApi } from '@/services/api';
import { showSuccessToast, showErrorToast, toastMessages } from '@/utils/toast';

export const useCategories = () => {
    const queryClient = useQueryClient();

    const { data: categories = [], isLoading, error } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: categoryApi.getAll,
    });

    const addCategoryMutation = useMutation({
        mutationFn: categoryApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            showSuccessToast(toastMessages.categoryCreated);
        },
        onError: () => {
            showErrorToast(toastMessages.categoryError);
        },
    });

    const deleteCategoryMutation = useMutation({
        mutationFn: categoryApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            showSuccessToast(toastMessages.categoryDeleted);
        },
        onError: () => {
            showErrorToast(toastMessages.categoryError);
        },
    });

    return {
        categories,
        isLoading,
        error,
        addCategory: (name: string) => addCategoryMutation.mutateAsync(name),
        deleteCategory: (id: number) => deleteCategoryMutation.mutateAsync(id),
    };
}; 