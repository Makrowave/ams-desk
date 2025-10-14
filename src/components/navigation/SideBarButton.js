import Link from 'next/link';
import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';

export function SideBarButton({ href, title, current, icon, isExpanded }) {
  const button = (
    <ListItemButton
      component={Link}
      href={href}
      selected={current}
      sx={{
        color: 'secondary.main',
        minHeight: 48,
        justifyContent: isExpanded ? 'initial' : 'center',
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          color: 'inherit',
          ml: '3.62px',
          minWidth: 0,
          mr: isExpanded ? 2 : 'auto',
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>
      {isExpanded && (
        <ListItemText
          primary={title}
          sx={{
            color: 'inherit',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 120,
          }}
        />
      )}
    </ListItemButton>
  );

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      {!isExpanded ? (
        <Tooltip title={title} placement="right">
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </ListItem>
  );
}
