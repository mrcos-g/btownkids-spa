'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import {
  AppBar,
  Box,
  Checkbox,
  CssBaseline,
  Collapse,
  Drawer,
  FormGroup,
  FormControlLabel,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { usePathname } from 'next/navigation';

import { Menu, ExpandMore, ExpandLess, FilterAlt } from '@mui/icons-material';

const DrawerAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const pathname = usePathname();

  const toggleState = (setState: Dispatch<SetStateAction<boolean>>) => {
    setState((previousState) => !previousState);
  };

  const handleFilterMenuOpen = () => toggleState(setFilterMenuOpen);
  const handleDrawerOpen = () => toggleState(setDrawerOpen);

  const renderSourceFilters = () => (
    <List>
      <ListItemButton onClick={handleFilterMenuOpen}>
        <ListItemIcon>
          <FilterAlt />
        </ListItemIcon>
        <ListItemText primary="Source Filters" />
        {filterMenuOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={filterMenuOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <FormGroup>
            <FormControlLabel sx={{ pl: 4 }} control={<Checkbox defaultChecked />} label="Label" />
            <FormControlLabel sx={{ pl: 4 }} required control={<Checkbox />} label="Required" />
            <FormControlLabel sx={{ pl: 4 }} disabled control={<Checkbox />} label="Disabled" />
          </FormGroup>
        </List>
      </Collapse>
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerOpen}
        PaperProps={{
          sx: {
            position: 'fixed',
            top: { xs: '57px', sm: '64px' },
            height: { xs: `calc(100% - 57px)`, sm: `calc(100% - 64px)` },
            width: { xs: '240px', sm: '300px' },
          },
        }}
      >
        {pathname === '/calendar' && renderSourceFilters()}
      </Drawer>
    </Box>
  );
};

export default DrawerAppBar;
