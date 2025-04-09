import { toast } from 'react-toastify';

export const showSuccessToast = (message: string) => {
    toast.success(message);
};

export const showErrorToast = (message: string) => {
    toast.error(message);
};

export const showInfoToast = (message: string) => {
    toast.info(message);
};

export const showWarningToast = (message: string) => {
    toast.warning(message);
};

export const toastMessages = {
    eventCreated: 'Event successfully created',
    eventUpdated: 'Event successfully updated',
    eventDeleted: 'Event successfully deleted',
    eventError: 'Error occurred while processing the event',

    categoryCreated: 'Category successfully created',
    categoryDeleted: 'Category successfully deleted',
    categoryError: 'Error occurred while processing the category',

    success: 'Operation completed successfully',
    error: 'An error occurred',
}; 