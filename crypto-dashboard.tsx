"use client"

import type * as React from "react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowDown,
  BarChart2,
  CreditCard,
  DollarSign,
  HelpCircle,
  LayoutDashboard,
  MoreVertical,
  Search,
  Settings,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

// Sample data for the chart with more realistic values
const chartData = [
  { month: "Jan", value: 1500 },
  { month: "Feb", value: 2300 },
  { month: "Mar", value: 3000 },
  { month: "Apr", value: 2700 },
  { month: "May", value: 3800 },
  { month: "Jun", value: 3500 },
  { month: "Jul", value: 4200 },
  { month: "Aug", value: 4800 },
  { month: "Sep", value: 4500 },
  { month: "Oct", value: 5100 },
  { month: "Nov", value: 4900 },
  { month: "Dec", value: 5500 },
]

// Sample data for the crypto assets
const cryptoAssets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    price: "$13,954.04",
    daily: "+$213.8",
    apy: "8.56%",
    state: "Fixed",
    startDate: "05.10.2023",
    liquidity: 3,
  },
  {
    name: "USDT",
    symbol: "USDT",
    icon: "₮",
    price: "$3,954.04",
    daily: "+$45.1",
    apy: "5.44%",
    state: "Fixed",
    startDate: "12.03.2023",
    liquidity: 2,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    price: "$3,954.04",
    daily: "+$13.5",
    apy: "4.12%",
    state: "Flexible",
    startDate: "21.01.2023",
    liquidity: 1,
  },
]

export default function CryptoDashboard() {
  useEffect(() => {
    // Add global styles to ensure proper text colors
    document.documentElement.style.setProperty("--background", "#0F1E24")
    document.documentElement.style.setProperty("--foreground", "#FFFFFF")
    document.documentElement.style.setProperty("--card", "#15262E")
    document.documentElement.style.setProperty("--card-foreground", "#FFFFFF")
    document.documentElement.style.setProperty("--popover", "#15262E")
    document.documentElement.style.setProperty("--popover-foreground", "#FFFFFF")
    document.documentElement.style.setProperty("--primary", "#C3F4DC")
    document.documentElement.style.setProperty("--primary-foreground", "#0F1E24")
    document.documentElement.style.setProperty("--muted", "#1A2C35")
    document.documentElement.style.setProperty("--muted-foreground", "#FFFFFF")
  }, [])

  return (
    <div className="flex h-screen bg-[#0F1E24] text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#1C2F37] p-4">
        <div className="flex items-center gap-2 mb-8">
          <Wallet className="h-6 w-6 text-[#C3F4DC]" />
          <h1 className="text-xl font-bold">Subscribe</h1>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#15262E] border border-[#1C2F37] rounded-md pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#C3F4DC] placeholder-gray-400"
          />
        </div>

        <div className="space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <NavItem icon={<BarChart2 size={18} />} label="Statistics & Income" />
          <NavItem icon={<DollarSign size={18} />} label="Market" />
          <NavItem icon={<CreditCard size={18} />} label="Funding" />
          <NavItem icon={<Wallet size={18} />} label="Yield Vaults" />
          <NavItem icon={<HelpCircle size={18} />} label="Support" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-gray-400">Aug 13, 2023 - Aug 18, 2023</p>
            </div>
            <div className="relative">
              <select className="bg-[#15262E] border border-[#1C2F37] rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C3F4DC] text-white">
                <option>Ethereum Network</option>
                <option>Bitcoin Network</option>
                <option>Solana Network</option>
              </select>
              <ArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-400" />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatsCard title="Your Balance" value="$74,892" change="+$1,340" percentage="-2.1%" isNegative />
            <StatsCard title="Your Deposits" value="$54,892" change="+$1,340" percentage="+13.2%" />
            <StatsCard title="Accrued Yield" value="$20,892" change="+$1,340" percentage="+1.2%" />
          </div>

          {/* Chart Section */}
          <Card className="mb-6 bg-[#15262E] border-[#1C2F37]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">General Statistics</CardTitle>
              <Tabs defaultValue="today" className="h-9">
                <TabsList className="bg-[#1A2C35]">
                  <TabsTrigger
                    value="today"
                    className="data-[state=active]:bg-[#C3F4DC] data-[state=active]:text-[#0E1E25] text-white"
                  >
                    Today
                  </TabsTrigger>
                  <TabsTrigger
                    value="week"
                    className="data-[state=active]:bg-[#C3F4DC] data-[state=active]:text-[#0E1E25] text-white"
                  >
                    Last week
                  </TabsTrigger>
                  <TabsTrigger
                    value="month"
                    className="data-[state=active]:bg-[#C3F4DC] data-[state=active]:text-[#0E1E25] text-white"
                  >
                    Last month
                  </TabsTrigger>
                  <TabsTrigger
                    value="6month"
                    className="data-[state=active]:bg-[#C3F4DC] data-[state=active]:text-[#0E1E25] text-white"
                  >
                    Last 6 month
                  </TabsTrigger>
                  <TabsTrigger
                    value="year"
                    className="data-[state=active]:bg-[#C3F4DC] data-[state=active]:text-[#0E1E25] text-white"
                  >
                    Year
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-[#1A2C35] rounded-md p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1C2F37" vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke="#5C7D8B"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#5C7D8B" }}
                    />
                    <YAxis
                      stroke="#5C7D8B"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                      tick={{ fill: "#5C7D8B" }}
                      domain={[0, "dataMax + 1000"]}
                      ticks={[0, 1500, 3000, 4500, 6000]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Assets Table */}
          <Card className="bg-[#15262E] border-[#1C2F37]">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#1C2F37] hover:bg-transparent">
                    <TableHead className="text-white">Vault</TableHead>
                    <TableHead className="text-white">Daily</TableHead>
                    <TableHead className="text-white">Balance</TableHead>
                    <TableHead className="text-white">APY</TableHead>
                    <TableHead className="text-white">State</TableHead>
                    <TableHead className="text-white">Start date</TableHead>
                    <TableHead className="text-white">Liquidity</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cryptoAssets.map((asset) => (
                    <TableRow key={asset.symbol} className="border-[#1C2F37] hover:bg-[#1A2C35]">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1A2C35] flex items-center justify-center text-lg">
                            {asset.icon}
                          </div>
                          <div>
                            <div className="text-white">{asset.name}</div>
                            <div className="text-gray-400 text-xs">
                              ${asset.symbol === "BTC" ? "13,643.21" : asset.symbol === "USDT" ? "1.00" : "2,123.87"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-[#A1E3C8] font-medium">{asset.daily}</TableCell>
                      <TableCell className="text-white">{asset.price}</TableCell>
                      <TableCell className="text-white">{asset.apy}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "px-2 py-1 rounded-md text-xs font-medium",
                            asset.state === "Fixed"
                              ? "bg-[#CFDE9C]/20 text-[#CFDE9C]"
                              : "bg-[#A1E3C8]/20 text-[#A1E3C8]",
                          )}
                        >
                          {asset.state}
                        </span>
                      </TableCell>
                      <TableCell className="text-white">{asset.startDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "w-2 h-2 rounded-full",
                                i < asset.liquidity ? "bg-[#C3F4DC]" : "bg-[#1C2F37]",
                              )}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <button className="text-gray-400 hover:text-white">
                          <MoreVertical size={16} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Custom tooltip for the chart
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#15262E] border border-[#1C2F37] p-3 rounded-md shadow-md">
        <p className="text-gray-400 mb-1">{`${label}`}</p>
        <p className="text-white font-medium text-lg">{`$${payload[0].value.toLocaleString()}`}</p>
      </div>
    )
  }
  return null
}

// Navigation item component
function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
        active ? "bg-[#15262E] text-white" : "text-gray-400 hover:bg-[#15262E]/50 hover:text-white",
      )}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  )
}

// Stats card component
function StatsCard({
  title,
  value,
  change,
  percentage,
  isNegative = false,
}: {
  title: string
  value: string
  change: string
  percentage: string
  isNegative?: boolean
}) {
  return (
    <Card className="bg-[#15262E] border-[#1C2F37]">
      <CardHeader className="pb-2">
        <CardTitle className="text-gray-400 text-sm font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1 text-white">{value}</div>
        <div className="flex items-center gap-2">
          <span className="text-white">{change}</span>
          <span className={isNegative ? "text-red-400" : "text-[#A1E3C8]"}>{percentage}</span>
        </div>
      </CardContent>
    </Card>
  )
}
