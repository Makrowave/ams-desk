'use client';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { SideBarButton } from './SideBarButton';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Drawer,
  List,
  IconButton,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import { appBarHeight } from '../../styles/layout';
import { Route } from '../routing/routes';

const DRAWER_WIDTH_EXPANDED = 240;
const DRAWER_WIDTH_COLLAPSED = 64;

const SideBar = ({ baseUrl, links }: { baseUrl: string; links: Route[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const path = usePathname();

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 0, // Don't take up space in flex layout
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isExpanded ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          position: 'fixed',
          top: `${appBarHeight}px`,
          height: `calc(100vh - ${appBarHeight}px)`,
          left: 0,
          zIndex: 1200,
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isExpanded ? 'space-between' : 'center',
            p: 1,
            minHeight: 48,
          }}
        >
          {isExpanded && (
            <Typography variant="h6" sx={{ ml: 1 }}>
              Zakładki
            </Typography>
          )}
          <IconButton
            sx={{ color: 'inherit' }}
            onClick={toggleDrawer}
            size="small"
          >
            {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ pt: 1 }}>
          {links.map((item) => (
            <SideBarButton
              href={baseUrl + item.href}
              name={item.name}
              icon={item.icon}
              current={path === baseUrl + item.href}
              isExpanded={isExpanded}
              key={item.href}
            />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
