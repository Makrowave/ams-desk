'use client';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';
import { Link as MUILink } from '@mui/material';
import React from 'react';

const links = [
  {
    href: '/admin/rowery',
    label: 'Rowery',
    description: 'Tabelka z rowerami z możliwością usuwania modeli',
  },
  {
    href: '/admin/pracownicy',
    label: 'Pracownicy',
    description: 'Zarządzanie pracownikami i kontami',
  },
  {
    href: '/admin/statusy',
    label: 'Statusy',
    description: 'Zarządzanie statusami',
  },
  {
    href: '/admin/kolory',
    label: 'Kolory',
    description: 'Zarządzanie grupami kolorów',
  },
  {
    href: '/admin/kola',
    label: 'Koła',
    description: 'Zarządzanie rozmiarami kół',
  },
  {
    href: '/admin/producenci',
    label: 'Producenci',
    description: 'Zarządzanie producetami rowerów',
  },
  {
    href: '/admin/kategorie',
    label: 'Kategorie',
    description: 'Zarządzanie kategoriami rowerów',
  },
];

const AdminPanel = () => {
  const { admin } = useAuth();
  return (
    <Paper sx={{ p: 2 }}>
      <Stack>
        <Typography variant="h3">Witaj {admin.username}!</Typography>
        <Typography variant="h6">
          Skorzystaj z paska bocznego do nawigacji lub przejdź do stron z
          panelu:
        </Typography>
        {links.map((link) => (
          <React.Fragment key={link.label}>
            <Typography variant="h5">
              <MUILink component={Link} href={link.href}>
                {link.label}
              </MUILink>
            </Typography>
            <Typography variant="h6">{link.description}</Typography>
            <Divider />
          </React.Fragment>
        ))}
      </Stack>
    </Paper>
  );
};

export default AdminPanel;
