'use client';
import { Divider, Stack, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';
import { Link as MUILink } from '@mui/material';

function AdminPanel() {
  const { admin } = useAuth();
  return (
    <Stack sx={{ px: 12, py: 6, justifyContent: 'flex-start' }}>
      <Typography variant="h2">Witaj {admin.username}!</Typography>
      <Typography variant="h6">
        Skorzystaj z paska bocznego do nawigacji lub przejdź do stron z panelu:
      </Typography>
      <MUILink component={Link} href={'/admin/rowery'}>
        Rowery
      </MUILink>
      <Typography variant="h6">
        Tabelka z rowerami z możliwością usuwania modeli
      </Typography>
      <Divider />
      <MUILink component={Link} href={'/admin/pracownicy'}>
        Pracownicy
      </MUILink>
      <Divider />
      <Typography variant="h6">Zarządzanie pracownikami i kontami</Typography>
      <MUILink component={Link} href={'/admin/statusy'}>
        Statusy
      </MUILink>
      <Divider />
      <Typography variant="h6">Zarządzanie statusami</Typography>
      <MUILink component={Link} href={'/admin/kolory'}>
        Kolory
      </MUILink>
      <Divider />
      <Typography variant="h6">Zarządzanie grupami kolorów</Typography>
      <MUILink component={Link} href={'/admin/kola'}>
        Koła
      </MUILink>
      <Divider />
      <Typography variant="h6">Zarządzanie rozmiarami kół</Typography>
      <MUILink component={Link} href={'/admin/producenci'}>
        Producenci
      </MUILink>
      <Divider />
      <Typography variant="h6">Zarządzanie producetami rowerów</Typography>
      <MUILink component={Link} href={'/admin/kategorie'}>
        Kategorie
      </MUILink>
      <Typography variant="h6">Zarządzanie kategoriami rowerów</Typography>
    </Stack>
  );
}

export default AdminPanel;
