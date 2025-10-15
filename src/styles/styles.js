export const paperTableStyle = {
  muiTableProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiTablePaperProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiTableContainerProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiTableHeadProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiTableBodyProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiTableFooterProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiTopToolbarProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiBottomToolbarProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiTableHeadCellProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiTableBodyCellProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiTableBodyRowProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiTableHeadRowProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
  muiTableFooterCellProps: {
    sx: {
      bgcolor: 'background.paper',
    },
  },
};

export const flexTableStyle = {
  ...paperTableStyle,
  muiTablePaperProps: {
    sx: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      bgcolor: 'background.paper',
    },
  },
  muiTableContainerProps: {
    sx: {
      bgcolor: 'background.paper',
      overflow: 'auto',
    },
  },
  muiTableProps: {
    sx: {
      bgcolor: 'background.paper',
      height: '100%',
      minHeight: 0,
    },
  },
};
