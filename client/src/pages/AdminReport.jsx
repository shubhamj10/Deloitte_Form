
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const AdminReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch data from the Flask backend
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/heatmaps');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data from the backend server');
        setLoading(false);
        console.error('Fetch error:', err);
      }
    };
    
    fetchData();
  }, []);
  
  // Custom heat map component using CSS grid
  const ReactHeatmap = ({ data, title, indexKey, labels }) => {
    if (!data || data.length === 0) return null;
    
    // Extract row labels and column headers
    const rowLabels = data.map(item => item[indexKey]);
    
    // Get all keys except the index key
    const columnHeaders = Object.keys(data[0]).filter(key => key !== indexKey);
    
    // Find min and max values for color scaling
    let minValue = Infinity;
    let maxValue = -Infinity;
    
    data.forEach(row => {
      columnHeaders.forEach(col => {
        if (typeof row[col] === 'number') {
          minValue = Math.min(minValue, row[col]);
          maxValue = Math.max(maxValue, row[col]);
        }
      });
    });
    
    // Color scale function (from light to dark blue)
    const getColor = (value) => {
      if (typeof value !== 'number') return 'bg-gray-100';
      const normalized = (value - minValue) / (maxValue - minValue);
      
      // Tailwind blue color scale
      if (normalized < 0.1) return 'bg-blue-50 text-blue-900';
      if (normalized < 0.2) return 'bg-blue-100 text-blue-900';
      if (normalized < 0.3) return 'bg-blue-200 text-blue-900';
      if (normalized < 0.4) return 'bg-blue-300 text-blue-900';
      if (normalized < 0.5) return 'bg-blue-400 text-blue-900';
      if (normalized < 0.6) return 'bg-blue-500 text-white';
      if (normalized < 0.7) return 'bg-blue-600 text-white';
      if (normalized < 0.8) return 'bg-blue-700 text-white';
      if (normalized < 0.9) return 'bg-blue-800 text-white';
      return 'bg-blue-900 text-white';
    };
    
    return (
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 bg-gray-50">{labels?.index || indexKey}</th>
              {columnHeaders.map(header => (
                <th key={header} className="p-2 border border-gray-300 bg-gray-50">
                  {labels?.columns?.[header] || header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 border border-gray-300 font-medium">{row[indexKey]}</td>
                {columnHeaders.map(col => (
                  <td 
                    key={col} 
                    className={`p-2 border border-gray-300 text-center ${getColor(row[col])}`}
                  >
                    {typeof row[col] === 'number' ? row[col].toFixed(2).replace(/\.00$/, '') : row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  if (loading) return <div className="flex justify-center items-center h-64">Loading heatmap data...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!data) return <div>No data available</div>;
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Heatmap Visualization Dashboard</h1>
      
      <Tabs defaultValue="reactHeatmaps">
        <TabsList className="mb-4">
          <TabsTrigger value="reactHeatmaps">React Heatmaps</TabsTrigger>
          <TabsTrigger value="imageHeatmaps">Python Generated Heatmaps</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reactHeatmaps">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Heat Map - Score</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactHeatmap 
                  data={data.rawData.heatmap1} 
                  title="Heat Map - Score" 
                  indexKey="Code"
                  labels={{ index: "Category Code", columns: { Score: "Score" } }}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Heat Map - Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactHeatmap 
                  data={data.rawData.heatmap2} 
                  title="Heat Map - Categories" 
                  indexKey="Code"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Heat Map - Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactHeatmap 
                  data={data.rawData.heatmap3} 
                  title="Heat Map - Questions" 
                  indexKey="Questions"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="imageHeatmaps">
          <div className="grid grid-cols-1 gap-6">
            {data.images.map((imgSrc, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>
                    {index === 0 && "Heat Map - Score"}
                    {index === 1 && "Heat Map - Categories"}
                    {index === 2 && "Heat Map - Questions"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <img 
                    src={`data:image/png;base64,${imgSrc}`} 
                    alt={`Heatmap ${index + 1}`} 
                    className="max-w-full h-auto"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReport;

