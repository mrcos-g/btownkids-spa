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

export enum EventSource {
  ELLETTSVILLE = 'Ellettsville Branch (MCPL)',
  SOUTHWEST = 'Southwest Branch (MCPL)',
  DOWNTOWN = 'Downtown Library (MCPL)',
  VISIT_BLOOMINGTON = 'VisitBloomington',
}

const DrawerAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>(Object.values(EventSource));

  const pathname = usePathname();

  const toggleState = (setState: Dispatch<SetStateAction<boolean>>) => {
    setState((previousState) => !previousState);
  };

  const handleFilterMenuOpen = () => toggleState(setFilterMenuOpen);
  const handleDrawerOpen = () => toggleState(setDrawerOpen);

  const handleSourceChange = (source: string) => {
    const currentlySelectedSources = selectedSources.includes(source)
      ? selectedSources.filter((selectedSource) => selectedSource !== source)
      : [...selectedSources, source];
    setSelectedSources(currentlySelectedSources);
  };

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
            {Object.values(EventSource).map((source) => (
              <FormControlLabel
                key={source}
                sx={{ pl: 4 }}
                control={
                  <Checkbox
                    checked={selectedSources.includes(source)}
                    onChange={() => handleSourceChange(source)}
                  />
                }
                label={source}
              />
            ))}
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
        ModalProps={{
          keepMounted: true,
        }}
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
