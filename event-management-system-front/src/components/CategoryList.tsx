import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Paper, Tooltip, Button, TextField, FormHelperText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Category } from '@/types';
import { StyledScrollBox } from '@/components/common/StyledScrollBox';
import { useCategories } from '@/hooks/useCategories';

interface CategoryListProps {
    selectedCategoryId?: number;
    onSelectCategory?: (categoryId: number) => void;
    error?: string;
    touched?: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({
    selectedCategoryId,
    onSelectCategory,
    error,
    touched,
}) => {
    const { categories, addCategory, deleteCategory } = useCategories();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    useEffect(() => {
        if (selectedCategoryId) {
            setIsExpanded(false);
        }
    }, [selectedCategoryId]);

    const handleAddCategory = async () => {
        if (newCategoryName.trim()) {
            try {
                await addCategory(newCategoryName.trim());
                setNewCategoryName('');
                setIsAddingCategory(false);
            } catch (error) {
                console.error('Failed to add category:', error);
            }
        }
    };

    const handleDeleteCategory = async (e: React.MouseEvent, category: Category) => {
        e.stopPropagation();
        if (category._count?.events && category._count.events > 0) return;
        try {
            await deleteCategory(category.id);
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    const handleCategorySelect = (categoryId: number) => {
        onSelectCategory?.(categoryId);
        setIsExpanded(false);
    };

    return (
        <Box>
            <Paper>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1,
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: 'action.hover',
                        },
                    }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Typography variant="subtitle2">
                        {selectedCategoryId
                            ? `Category: ${categories.find(c => c.id === selectedCategoryId)?.name || 'Categories'}`
                            : 'Categories'
                        }
                    </Typography>
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Box>

                {isExpanded && (
                    <StyledScrollBox>
                        <Box sx={{ p: 1 }}>
                            {isAddingCategory ? (
                                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="New category name"
                                        autoFocus
                                    />
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={handleAddCategory}
                                        disabled={!newCategoryName.trim()}
                                    >
                                        Add
                                    </Button>
                                </Box>
                            ) : (
                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={() => setIsAddingCategory(true)}
                                    sx={{ mb: 1 }}
                                >
                                    Add Category
                                </Button>
                            )}

                            {categories.map((category) => (
                                <Box
                                    key={category.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        p: 1,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                        },
                                        bgcolor: selectedCategoryId === category.id ? 'action.selected' : 'transparent',
                                    }}
                                    onClick={() => handleCategorySelect(category.id)}
                                >
                                    <Typography variant="body2">
                                        {category.name}
                                        {category._count?.events !== undefined && (
                                            <Typography
                                                component="span"
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{ ml: 1 }}
                                            >
                                                ({category._count.events} events)
                                            </Typography>
                                        )}
                                    </Typography>
                                    <Tooltip title={category._count?.events && category._count.events > 0
                                        ? "Cannot delete category with associated events"
                                        : "Delete category"}>
                                        <span>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleDeleteCategory(e, category)}
                                                disabled={!!(category._count?.events && category._count.events > 0)} // 👈 тут додано !!
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </span>
                                    </Tooltip>

                                </Box>
                            ))}
                        </Box>
                    </StyledScrollBox>
                )}
            </Paper>
            {touched && error && (
                <FormHelperText error sx={{ mt: 1 }}>
                    {error}
                </FormHelperText>
            )}
        </Box>
    );
};

export default CategoryList; 