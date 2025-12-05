import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { fetchAdmissionsAnalytics } from '../api/analytics';
import StatusCard from './StatusCard';

const AdmissionDashboard = () => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  });
  const [toDate, setToDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAdmissionsAnalytics(fromDate, toDate);
      if (result.success) {
        setData(result.data);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = () => {
    fetchData();
  };

  const handleRefresh = () => {
    fetchData();
  };

  const getMetricColor = (value) => {
    if (value > 1000) return muiTheme.palette.error.main;
    if (value > 500) return muiTheme.palette.warning.main;
    return muiTheme.palette.success.main;
  };

  const pieData = useMemo(() => {
    if (!data) return [];
    return [
      { name: 'Verified', value: data.verifiedApplicants, color: muiTheme.palette.success.main },
      { name: 'Rejected', value: data.rejectedApplicants, color: muiTheme.palette.error.main },
      { name: 'Pending', value: data.pendingApplications, color: muiTheme.palette.warning.main },
    ];
  }, [data, muiTheme.palette]);

  const programsList = useMemo(() => (data && data.applicationsPerProgram ? data.applicationsPerProgram : []), [data]);
  const programsTotal = useMemo(() => programsList.reduce((s, p) => s + (p.count || 0), 0), [programsList]);

  if (error && !data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ background: '#f5f7fa', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" sx={{ mb: 1, fontWeight: 700, color: '#1a237e' }}>
            Admission Analytics Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            University Application Metrics & Analysis
          </Typography>
        </Box>
        <Paper
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: '12px',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
              alignItems: isMobile ? 'stretch' : 'flex-end',
            }}
          >
            <TextField
              label="From Date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size={isMobile ? 'medium' : 'small'}
              sx={{ flex: 1 }}
            />
            <TextField
              label="To Date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size={isMobile ? 'medium' : 'small'}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilterChange}
              sx={{ width: isMobile ? '100%' : 'auto', py: 1.3 }}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleRefresh}
              disabled={loading}
              startIcon={<RefreshIcon />}
              sx={{ width: isMobile ? '100%' : 'auto', py: 1.3 }}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </Box>
        </Paper>

        {loading && !data ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={50} />
              <Typography sx={{ mt: 2, color: '#666' }}>Loading dashboard data...</Typography>
            </Box>
          </Box>
        ) : !data ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" sx={{ color: '#999' }}>
              No data available
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={isMobile ? 1.5 : 2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatusCard
                  title="Total Applicants"
                  value={data.totalApplicants}
                  color={getMetricColor(data.totalApplicants)}
                  icon="👥"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatusCard
                  title="Verified Applicants"
                  value={data.verifiedApplicants}
                  color={muiTheme.palette.success.main}
                  icon="✓"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatusCard
                  title="Rejected Applicants"
                  value={data.rejectedApplicants}
                  color={muiTheme.palette.error.main}
                  icon="✗"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatusCard
                  title="Pending Applicants"
                  value={data.pendingApplications}
                  color={muiTheme.palette.warning.main}
                  icon="⏳"
                />
              </Grid>
            </Grid>

            <Grid container spacing={isMobile ? 1.5 : 2}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    height: '100%',
                  }}
                >
                  <CardHeader
                    title="Applications per Program"
                    titleTypographyProps={{ variant: 'h6' }}
                    sx={{ pb: 1 }}
                  />
                  <CardContent sx={{ pt: 0 }}>
                    {data.applicationsPerProgram.length > 0 ? (
                      <>
                        <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                          <BarChart data={data.applicationsPerProgram}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis
                              dataKey="program"
                              angle={isMobile ? -45 : 0}
                              height={isMobile ? 80 : 60}
                              interval={0}
                              tick={{ fontSize: isMobile ? 12 : 14 }}
                            />
                            <YAxis tick={{ fontSize: isMobile ? 12 : 14 }} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                              }}
                            />
                            <Bar dataKey="count" fill={muiTheme.palette.primary.main} radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                        <TableContainer sx={{ mt: 2 }}>
                          <Table size={isMobile ? 'small' : 'medium'}>
                            <TableHead>
                              <TableRow>
                                <TableCell>Program</TableCell>
                                <TableCell align="right">Applicants</TableCell>
                                <TableCell align="right">%</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {programsList.map((row) => (
                                <TableRow key={row.program}>
                                  <TableCell component="th" scope="row">
                                    {row.program}
                                  </TableCell>
                                  <TableCell align="right">{(row.count || 0).toLocaleString()}</TableCell>
                                  <TableCell align="right">{programsTotal ? ((row.count || 0) / programsTotal * 100).toFixed(1) : '0.0'}%</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    ) : (
                      <Typography sx={{ color: '#999', textAlign: 'center', py: 4 }}>
                        No data available
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    height: '100%',
                  }}
                >
                  <CardHeader
                    title="Application Status Distribution"
                    titleTypographyProps={{ variant: 'h6' }}
                    sx={{ pb: 1 }}
                  />
                  <CardContent sx={{ pt: 0 }}>
                    {pieData.length > 0 && pieData.some(item => item.value > 0) ? (
                      <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={isMobile ? 80 : 100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => value} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <Typography sx={{ color: '#999', textAlign: 'center', py: 4 }}>
                        No data available
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CardHeader
                    title="Application Trends (Last 30 Days)"
                    titleTypographyProps={{ variant: 'h6' }}
                    sx={{ pb: 1 }}
                  />
                  <CardContent sx={{ pt: 0 }}>
                    {data.applicationTrends.length > 0 ? (
                      <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
                        <LineChart data={data.applicationTrends}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                          <XAxis
                            dataKey="date"
                            angle={isMobile ? -45 : 0}
                            height={isMobile ? 80 : 60}
                            interval={Math.floor(data.applicationTrends.length / 6)}
                            tick={{ fontSize: isMobile ? 12 : 14 }}
                          />
                          <YAxis tick={{ fontSize: isMobile ? 12 : 14 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#fff',
                              border: '1px solid #ccc',
                              borderRadius: '8px',
                            }}
                          />
                          <Legend wrapperStyle={{ fontSize: isMobile ? 12 : 14 }} />
                          <Line
                            type="monotone"
                            dataKey="applications"
                            stroke={muiTheme.palette.primary.main}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 5 }}
                            name="Applications"
                          />
                          <Line
                            type="monotone"
                            dataKey="verified"
                            stroke={muiTheme.palette.success.main}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 5 }}
                            name="Verified"
                          />
                          <Line
                            type="monotone"
                            dataKey="rejected"
                            stroke={muiTheme.palette.error.main}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 5 }}
                            name="Rejected"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <Typography sx={{ color: '#999', textAlign: 'center', py: 4 }}>
                        No data available for the selected date range
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default AdmissionDashboard;
