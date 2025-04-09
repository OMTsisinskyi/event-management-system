import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Event Management System
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{ mt: 4 }}>
                {children}
            </Container>
            <Box
                component="footer"
                sx={{
                    p: 2,
                    mt: 'auto',
                    backgroundColor: 'grey.200',
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body2" color="text.secondary" align="center">
                        © 2025 Event Management System
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Layout; 