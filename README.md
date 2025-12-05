# Admission Analytics Dashboard

A responsive University Admission Analytics Dashboard built with React, Material-UI, and Recharts to display application metrics visually.

## Features

- 📊 **Real-time Analytics Dashboard** with status cards showing:
  - Total Applicants
  - Verified Applicants
  - Rejected Applicants
  - Pending Applicants

- 📈 **Interactive Charts**:
  - Bar Chart: Applications per Program
  - Pie Chart: Application Status Distribution
  - Line Chart: Application Trends (with date filtering)

- 🎨 **Custom University Theme**:
  - Modern Material-UI design
  - Color-coded metrics (Orange for >500, Red for >1000)
  - Responsive cards with hover effects

- 📱 **Fully Responsive Design**:
  - Desktop (1920px+)
  - Tablet (768px - 1024px)
  - Mobile (< 768px)

- 🔄 **Data Management**:
  - Date range filter (from - to)
  - Refresh button to re-fetch data
  - Loading states and error handling
  - Mock API with simulated network delay

## Tech Stack

- **Frontend Framework**: React 18
- **UI Library**: Material-UI (MUI) 5
- **Charts**: Recharts
- **Styling**: MUI System + CSS
- **HTTP Client**: Axios
- **Date Handling**: date-fns

## Project Structure

```
dynamic_dashboard/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── api/
│   │   └── analytics.js         # Mock API endpoints
│   ├── components/
│   │   ├── AdmissionDashboard.js # Main dashboard component
│   │   ├── AdmissionDashboard.css
│   │   └── StatusCard.js         # Status card component
│   ├── App.js                    # Root app component with theme
│   ├── index.js                  # React entry point
│   └── index.css                 # Global styles
├── package.json
├── tsconfig.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 14+ and npm/yarn

### Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd dynamic_dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

4. **Build for production**:
   ```bash
   npm run build
   ```

## Usage

### Dashboard Features

1. **Status Cards**: Display key metrics with color-coded highlighting
2. **Date Filtering**: Use the date range picker to filter application trends
3. **Refresh Button**: Manually refresh data to get the latest metrics
4. **Charts**:
   - Hover over charts to see detailed information
   - All charts are responsive and scale based on screen size

### API Integration

The dashboard uses mock data from `src/api/analytics.js`. To integrate with a real API:

1. Replace the `fetchAdmissionsAnalytics` function with actual API calls:
   ```javascript
   export const fetchAdmissionsAnalytics = async (fromDate, toDate) => {
     const response = await axios.get('/api/v1/analytics/admissions', {
       params: { fromDate, toDate }
     });
     return response.data;
   };
   ```

2. Update the data structure if needed

## Responsive Design Breakdown

### Mobile (< 768px)
- Single column layout for status cards
- Stacked filter controls
- Adjusted chart sizes
- Smaller fonts and spacing

### Tablet (768px - 1024px)
- 2-column layout for status cards
- Inline filter controls
- Medium chart sizes

### Desktop (1920px+)
- 4-column layout for status cards
- Full filter bar
- Large, interactive charts

## Color Scheme

- **Primary Blue**: #1976d2 (Main brand color)
- **Success Green**: #4caf50 (Verified applications)
- **Error Red**: #f44336 (Rejected applications)
- **Warning Orange**: #ff9800 (>500 applications)
- **Background**: #f5f7fa (Light gray)

## Highlight Rules

- **Green**: Default color for metrics
- **Orange**: Metrics > 500 applicants
- **Red**: Metrics > 1000 applicants

## Performance Optimizations

- `useMemo` for expensive calculations
- Conditional rendering to avoid unnecessary components
- Responsive image and chart sizes
- CSS transitions and animations

## Mock Data Features

- 30 days of application trends
- 6 different academic programs
- Realistic data distribution
- 500ms simulated network delay

## Future Enhancements

- [ ] Export data as CSV/PDF
- [ ] Custom date range presets (Last 7 days, Last 30 days, etc.)
- [ ] Application filtering by status
- [ ] Email notifications for milestones
- [ ] Dark mode support
- [ ] Real-time WebSocket updates
- [ ] Advanced analytics with predictive trends

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Contact

For issues or inquiries, please contact the development team.
