import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

const DeleteConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    onClose,
    onConfirm,
    title = 'Confirm action',
    message = 'Are you sure you want to confirm this action?',
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {message}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} color="error" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog; 