import React from 'react';
import { Card, CardContent, Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const StatusCard = ({ title, value, color, icon }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: `2px solid ${color}22`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
          borderColor: color,
        },
      }}
    >
      <CardContent sx={{ p: isMobile ? 2 : 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              sx={{
                fontSize: isMobile ? '0.85rem' : '0.95rem',
                color: '#666',
                fontWeight: 500,
                mb: 1,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: isMobile ? '1.75rem' : '2.25rem',
                fontWeight: 700,
                color: color,
                lineHeight: 1,
              }}
            >
              {value.toLocaleString()}
            </Typography>
          </Box>
          <Box
            sx={{
              fontSize: isMobile ? '2.5rem' : '3rem',
              opacity: 0.7,
            }}
          >
            {icon}
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: color,
              animation: 'pulse 2s infinite',
            }}
          />
          <Typography
            sx={{
              fontSize: '0.75rem',
              color: '#999',
              fontWeight: 500,
            }}
          >
            Updated now
          </Typography>
        </Box>
      </CardContent>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </Card>
  );
};

export default StatusCard;
