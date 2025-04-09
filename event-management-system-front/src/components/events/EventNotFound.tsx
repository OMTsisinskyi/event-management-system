import { Alert, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface EventNotFoundProps {
    text: string;
}

const EventNotFound = ({text}: EventNotFoundProps) => {
    const router = useRouter();

    return (
        <Box sx={{ p: 3 }}>
            <Alert severity="error">{text}</Alert>
            <Button
                variant="contained"
                onClick={() => router.push('/')}
                sx={{ mt: 2 }}
            >
                Back to Events
            </Button>
        </Box>
    );
};

export default EventNotFound; 