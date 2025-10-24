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
import {
  appBarHeight,
  drawerWidthCollapsed,
  drawerWidthExpanded,
} from '../../styles/layout';
import { Route } from '../routing/routes';

const SideBar = ({ baseUrl, links }: { baseUrl: string; links: Route[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const path = usePathname();

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Drawer
      variant="permanent"
      elevation={4}
      sx={{
        width: 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isExpanded ? drawerWidthExpanded : drawerWidthCollapsed,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          position: 'fixed',
          top: `${appBarHeight}px`,
          height: `calc(100vh - ${appBarHeight}px)`,
          left: 0,
          zIndex: (theme) => theme.zIndex.appBar - 1,
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
