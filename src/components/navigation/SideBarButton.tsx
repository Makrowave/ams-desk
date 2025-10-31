import Link from 'next/link';
import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Route } from '../routing/routes';

type SideBarButtonProps = {
  current: boolean;
  isExpanded: boolean;
} & Route;

export function SideBarButton({
  href,
  name,
  current,
  icon,
  isExpanded,
}: SideBarButtonProps) {
  const button = (
    <ListItemButton
      component={Link}
      href={href}
      selected={current}
      sx={{
        color: 'text.primary',
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
          primary={name}
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
        <Tooltip title={name} placement="right">
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </ListItem>
  );
}
