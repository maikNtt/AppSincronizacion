import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function SidebarMetrics({ ideas, theme, isDark }) {
  // Datos para gráfico de ideas por estado
  const ideasByStatus = ideas.reduce((acc, idea) => {
    const found = acc.find((item) => item.name === idea.status);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: idea.status, value: 1 });
    }
    return acc;
  }, []);

  // Paleta de colores
  const COLORS = ['#6B46B8', '#2B1B5E', '#9D7FDD', '#553373', '#402060'];

  return (
    <div
      style={{
        width: '100%',
        height: '180px',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={ideasByStatus}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
          >
            {ideasByStatus.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
