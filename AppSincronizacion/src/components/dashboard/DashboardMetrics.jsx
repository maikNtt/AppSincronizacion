import { makeStyles } from '@fluentui/react-components';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '../../hooks/useTheme';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '24px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E8DDF4',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(64, 32, 96, 0.08)',
    transition: 'all 0.3s ease',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#323130',
  },
  chartContainer: {
    width: '100%',
    height: '300px',
  },
});

export default function DashboardMetrics({ ideas, initiatives, theme, isDark }) {
  const styles = useStyles();

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

  // Datos para gráfico de iniciativas por estado
  const initByStatus = initiatives.reduce((acc, init) => {
    const found = acc.find((item) => item.name === init.status);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: init.status, value: 1 });
    }
    return acc;
  }, []);

  // Datos para gráfico de iniciativas por equipo
  const initByTeam = initiatives.reduce((acc, init) => {
    const found = acc.find((item) => item.name === init.team_id);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: init.team_id, value: 1 });
    }
    return acc;
  }, []);

  // Paleta de colores
  const COLORS = ['#6B46B8', '#2B1B5E', '#9D7FDD', '#553373', '#402060'];

  const chartStyle = {
    backgroundColor: isDark ? '#141418' : '#FFFFFF',
  };

  const textColor = isDark ? '#FFFFFF' : '#323130';

  return (
    <div
      className={styles.container}
      style={{
        color: theme.text,
      }}
    >
      {/* Gráfico Pastel: Ideas por Estado */}
      <div
        className={styles.card}
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
          boxShadow: theme.shadow,
        }}
      >
        <div
          className={styles.cardTitle}
          style={{
            color: theme.text,
          }}
        >
          📊 Ideas por Estado
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ideasByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ideasByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#252530' : '#FFFFFF',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.text,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico Pastel: Iniciativas por Estado */}
      <div
        className={styles.card}
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
          boxShadow: theme.shadow,
        }}
      >
        <div
          className={styles.cardTitle}
          style={{
            color: theme.text,
          }}
        >
          📈 Iniciativas por Estado
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={initByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#82ca9d"
                dataKey="value"
              >
                {initByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#252530' : '#FFFFFF',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.text,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Barras: Iniciativas por Equipo */}
      <div
        className={styles.card}
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
          boxShadow: theme.shadow,
          gridColumn: 'span 1',
        }}
      >
        <div
          className={styles.cardTitle}
          style={{
            color: theme.text,
          }}
        >
          👥 Iniciativas por Equipo
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={initByTeam}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
              <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 12 }} />
              <YAxis tick={{ fill: textColor, fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#252530' : '#FFFFFF',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.text,
                }}
              />
              <Bar dataKey="value" fill="#6B46B8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
