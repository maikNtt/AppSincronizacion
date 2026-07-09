// PARIDAD POWER APPS: Equivale a un Dropdown de áreas con
// Visible = If(varCurrentUser.is_coe, true, false)
// y OnChange = Set(varSelectedArea, Self.Selected.Value)

import { Dropdown, Option, makeStyles } from '@fluentui/react-components';
import { useAppContext } from '../../hooks/useAppContext';
import { TEAM_LIST } from '../../utils/constants';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    whiteSpace: 'nowrap',
  },
});

export default function AreaSelector() {
  const styles = useStyles();
  const { currentUser, selectedArea, setSelectedArea } = useAppContext();

  // Solo visible para usuarios CoE
  if (!currentUser?.is_coe) return null;

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Filtrar por área:</span>
      <Dropdown
        value={selectedArea === 'all' ? 'Todas las áreas' : selectedArea}
        selectedOptions={[selectedArea]}
        onOptionSelect={(_, data) => setSelectedArea(data.optionValue)}
        size="small"
        style={{ minWidth: '180px', backgroundColor: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.4)', color: 'white' }}
      >
        <Option value="all">Todas las áreas</Option>
        {TEAM_LIST.map((team) => (
          <Option key={team} value={team}>
            {team}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
}
