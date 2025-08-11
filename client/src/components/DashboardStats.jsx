import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    LineChart, Line,
    PieChart, Pie, Cell,
    AreaChart, Area, ResponsiveContainer
} from 'recharts';

const barData = [
    { day: 'Mon', tasks: 3 },
    { day: 'Tue', tasks: 5 },
    { day: 'Wed', tasks: 2 },
    { day: 'Thu', tasks: 4 },
    { day: 'Fri', tasks: 6 },
    { day: 'Sat', tasks: 1 },
    { day: 'Sun', tasks: 0 },
];

const lineData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 4 },
    { day: 'Sat', hours: 1 },
    { day: 'Sun', hours: 0.5 },
];

const pieData = [
    { name: 'Math', value: 10 },
    { name: 'Physics', value: 15 },
    { name: 'Chemistry', value: 5 },
    { name: 'DSA', value: 20 },
];

const areaData = [
    { day: 'Mon', notes: 1 },
    { day: 'Tue', notes: 3 },
    { day: 'Wed', notes: 2 },
    { day: 'Thu', notes: 4 },
    { day: 'Fri', notes: 3 },
    { day: 'Sat', notes: 1 },
    { day: 'Sun', notes: 2 },
];

const COLORS = ['#7C3AED', '#A78BFA', '#C4B5FD', '#DDD6FE'];

const DashboardStats = () => {
    return (
        <div className="p-8 rounded-lg w-full flex items-center justify-center flex-col mb-25">
            <h2 className="text-[1.4rem] font-bold text-purple-900/70 mb-10 text-center">
                📊 Sample Dashboard Analytics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-30 gap-y-20">
                {/* Bar Chart */}
                <div className="bg-white/20 p-4 rounded-2xl shadow mb-30 md:mb-50 h-20 w-80 lg:w-100 transition-all duration-500 ease-in-out hover:scale-[1.03]">
                    <h3 className="text-lg font-semibold text-purple-900/70 mb-4">Weekly Tasks Completed</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', color: 'purple' }}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey="tasks" fill="rgba(76, 29, 149, 0.6)" activeBar={{ fillOpacity: 1 }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart */}
                <div className="bg-white/20 p-4 rounded-2xl shadow mb-30 md:mb-50 h-20 w-80 lg:w-100 transition-all duration-500 ease-in-out hover:scale-[1.03]">
                    <h3 className="text-lg font-semibold text-purple-900/70 mb-4">Daily Study Hours</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="hours" stroke="rgba(76, 29, 149, 0.6)" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white/20 p-5 rounded-2xl shadow mb-30 h-20 w-80 lg:w-100 transition-all duration-500 ease-in-out hover:scale-[1.03]">
                    <h3 className="text-lg font-semibold text-purple-900/70 mb-4">Subject-wise Time Distribution</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label={({ name }) => name}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>  
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                </div>

                {/* Area Chart */}
                <div className="bg-white/20 p-4 rounded-2xl mb-30 md:mb-40 shadow h-20 w-80 lg:w-100 transition-all duration-500 ease-in-out hover:scale-[1.03]">
                    <h3 className="text-lg font-semibold text-purple-900/70 mb-4">Notes Added Over Time</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={areaData}>
                            <defs>
                                <linearGradient id="colorNotes" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#A78BFA" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="notes" stroke="#7C3AED" fillOpacity={1} fill="url(#colorNotes)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
