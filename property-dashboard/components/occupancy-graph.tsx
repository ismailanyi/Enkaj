"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

type OccupancyData = {
  name: string
  value: number
  color: string
}

type OccupancyGraphProps = {
  data: OccupancyData[]
  title: string
}

export function OccupancyGraph({ data, title }: OccupancyGraphProps) {
  return (
    <div className="h-full w-full">
      <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

