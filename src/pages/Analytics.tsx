
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Globe, MousePointer } from "lucide-react";

const Analytics = () => {
  // Mock data for charts
  const clicksData = [
    { name: 'Mon', clicks: 65 },
    { name: 'Tue', clicks: 89 },
    { name: 'Wed', clicks: 123 },
    { name: 'Thu', clicks: 98 },
    { name: 'Fri', clicks: 156 },
    { name: 'Sat', clicks: 134 },
    { name: 'Sun', clicks: 87 }
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#06b6d4' },
    { name: 'Mobile', value: 38, color: '#8b5cf6' },
    { name: 'Tablet', value: 17, color: '#f59e0b' }
  ];

  const locationData = [
    { name: 'United States', clicks: 234 },
    { name: 'United Kingdom', clicks: 145 },
    { name: 'Germany', clicks: 98 },
    { name: 'France', clicks: 87 },
    { name: 'Canada', clicks: 76 }
  ];

  const timelineData = [
    { time: '00:00', clicks: 12 },
    { time: '04:00', clicks: 8 },
    { time: '08:00', clicks: 45 },
    { time: '12:00', clicks: 89 },
    { time: '16:00', clicks: 134 },
    { time: '20:00', clicks: 98 },
    { time: '23:59', clicks: 34 }
  ];

  const stats = [
    {
      title: "Total Clicks",
      value: "12,543",
      change: "+12.3%",
      icon: MousePointer,
      color: "text-cyan-400"
    },
    {
      title: "Unique Visitors",
      value: "8,291",
      change: "+8.7%", 
      icon: Users,
      color: "text-purple-400"
    },
    {
      title: "Countries",
      value: "45",
      change: "+3",
      icon: Globe,
      color: "text-green-400"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      icon: TrendingUp,
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Deep insights into your link performance and audience behavior
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-neon">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </p>
                    <p className={`text-sm ${stat.color}`}>
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-800/50`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Clicks Chart */}
          <Card className="card-neon">
            <CardHeader>
              <CardTitle className="text-white">Daily Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={clicksData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    labelStyle={{ color: '#1F2937' }}
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="clicks" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Distribution */}
          <Card className="card-neon">
            <CardHeader>
              <CardTitle className="text-white">Device Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Timeline and Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hourly Timeline */}
          <Card className="card-neon">
            <CardHeader>
              <CardTitle className="text-white">Hourly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Locations */}
          <Card className="card-neon">
            <CardHeader>
              <CardTitle className="text-white">Top Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationData.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-white font-medium">{location.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${(location.clicks / Math.max(...locationData.map(l => l.clicks))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-400 text-sm font-medium w-12 text-right">
                        {location.clicks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
