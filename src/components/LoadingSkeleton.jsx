import { Box, Skeleton, Stack } from '@mui/material';

export default function LoadingSkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
      <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
      <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 2 }} />
      <Box display="flex" gap={2}>
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
      </Box>
    </Stack>
  );
}
