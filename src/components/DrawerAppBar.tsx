'use client';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  AppBar,
  Box,
  Checkbox,
  Collapse,
  Divider,
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
import { CalendarToday, Menu, ExpandMore, ExpandLess, FilterAlt, Home } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEventSourceContext } from '@/context/EventSourceContext';
import { EventSource } from '@/lib/formatters';

const DrawerAppBar: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const { selectedSources, setStateSelectedSource } = useEventSourceContext();

  const pathname = usePathname();

  const toggleState = (setState: Dispatch<SetStateAction<boolean>>) => {
    setState((previousState) => !previousState);
  };

  const handleFilterMenuOpen = () => toggleState(setFilterMenuOpen);
  const handleDrawerOpen = () => toggleState(setDrawerOpen);

  const renderSourceFilters = () => (
    <List>
      <Divider />
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
                key={source.location}
                sx={{
                  pl: 4,
                }}
                control={
                  <Checkbox
                    checked={selectedSources.includes(source.location)}
                    onChange={() => setStateSelectedSource(source.location)}
                    sx={{
                      color: source.color,
                      '&.Mui-checked': {
                        color: source.color,
                      },
                    }}
                  />
                }
                label={source.location}
              />
            ))}
          </FormGroup>
        </List>
      </Collapse>
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
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
        <List>
          <ListItemButton component={Link} href="/" selected={pathname === '/'}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton component={Link} href="/calendar" selected={pathname === '/calendar'}>
            <ListItemIcon>
              <CalendarToday />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItemButton>
        </List>
        {pathname === '/calendar' && renderSourceFilters()}
      </Drawer>
    </Box>
  );
};

export default DrawerAppBar;
