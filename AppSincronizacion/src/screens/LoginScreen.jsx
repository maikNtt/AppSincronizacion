// PARIDAD POWER APPS: Esta pantalla equivale a un Screen de login simulado.
// Controles: Dropdown (lista de usuarios), Button ("Ingresar"),
// Label (título), Image/Icon (branding).
// OnStart: no aplica (no hay autenticación real).
// Button.OnSelect: Set(varCurrentUser, Dropdown.Selected); Navigate(DashboardScreen)

import { useState } from 'react';
import {
  makeStyles,
  tokens,
  Card,
  Dropdown,
  Option,
  Button,
  Text,
  Divider,
} from '@fluentui/react-components';
import { BrainCircuit48Regular, PersonCircle24Regular } from '@fluentui/react-icons';
import { useAppContext } from '../hooks/useAppContext';
import { useDataContext } from '../hooks/useDataContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--color-primary)',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '40px 36px',
    borderRadius: '12px',
    boxShadow: tokens.shadow16,
    textAlign: 'center',
  },
  icon: {
    color: 'var(--color-primary)',
    fontSize: '48px',
    marginBottom: '8px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#323130',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#605E5C',
    marginBottom: '32px',
    lineHeight: '20px',
  },
  formSection: {
    textAlign: 'left',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#323130',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  dropdown: {
    width: '100%',
    marginBottom: '24px',
  },
  button: {
    width: '100%',
    height: '40px',
    fontSize: '15px',
    fontWeight: '600',
  },
  footer: {
    fontSize: '11px',
    color: '#A19F9D',
    marginTop: '24px',
    lineHeight: '16px',
  },
  divider: {
    margin: '24px 0 16px',
  },
});

export default function LoginScreen() {
  const styles = useStyles();
  const { setCurrentUser } = useAppContext();
  const { getUsers } = useDataContext();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const users = getUsers();
  const selectedUser = users.find((u) => u.id === selectedUserId);

  const handleLogin = () => {
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <BrainCircuit48Regular className={styles.icon} />
        <Text as="h1" className={styles.title}>
          CoE IA Sync App
        </Text>
        <Text className={styles.subtitle}>
          Centro de Excelencia en Inteligencia Artificial
          <br />
          Gestión de Ideas e Iniciativas
        </Text>

        <div className={styles.formSection}>
          <label className={styles.label}>
            <PersonCircle24Regular />
            Selecciona tu usuario
          </label>
          <Dropdown
            className={styles.dropdown}
            placeholder="Elige un usuario de prueba..."
            selectedOptions={selectedUserId ? [selectedUserId] : []}
            value={selectedUser ? `${selectedUser.name} — ${selectedUser.team} (${selectedUser.role}${selectedUser.is_coe ? ', CoE' : ''})` : ''}
            onOptionSelect={(_, data) => setSelectedUserId(data.optionValue)}
          >
            {users.map((user) => (
              <Option key={user.id} value={user.id} text={`${user.name} — ${user.team} (${user.role})`}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600 }}>{user.name}</span>
                  <span style={{ fontSize: '12px', color: '#605E5C' }}>
                    {user.team} · {user.role}{user.is_coe ? ' · CoE IA' : ''}
                  </span>
                </div>
              </Option>
            ))}
          </Dropdown>

          <Button
            className={styles.button}
            appearance="primary"
            disabled={!selectedUser}
            onClick={handleLogin}
          >
            Ingresar
          </Button>
        </div>

        <Divider className={styles.divider} />

        <Text className={styles.footer}>
          Este es un prototipo de validación UX.
          <br />
          En la versión final, la autenticación se hará con Microsoft 365 / Entra ID.
        </Text>
      </Card>
    </div>
  );
}
