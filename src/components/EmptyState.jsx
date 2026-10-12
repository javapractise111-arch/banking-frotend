import { Box, Typography, Button } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: '1px dashed rgba(17,34,64,0.15)',
        borderRadius: 3,
        background: '#f9fbfe'
      }}
    >
      <InboxOutlinedIcon sx={{ fontSize: 52, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" sx={{ mb: 1 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500, mb: 3 }}>
        {description}
      </Typography>
      {actionLabel && <Button variant="contained" onClick={onAction}>{actionLabel}</Button>}
    </Box>
  );
}
