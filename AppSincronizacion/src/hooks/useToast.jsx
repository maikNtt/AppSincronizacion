// PARIDAD POWER APPS: Este hook simula Notify("mensaje", NotificationType.Success)
// de Power Apps. Provee un toast/notificación tipo banner en la parte superior.

import { createContext, useContext, useCallback, useState } from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import {
  CheckmarkCircle24Filled,
  ErrorCircle24Filled,
  Info24Filled,
  Warning24Filled,
  Dismiss16Regular,
} from '@fluentui/react-icons';

const ToastContext = createContext(null);

const useStyles = makeStyles({
  container: {
    position: 'fixed',
    top: '56px',
    right: '24px',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxWidth: '400px',
  },
  toast: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: tokens.shadow8,
    animation: 'slideIn 0.3s ease-out',
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '18px',
  },
  dismiss: {
    cursor: 'pointer',
    marginLeft: 'auto',
    opacity: 0.7,
    flexShrink: 0,
    ':hover': {
      opacity: 1,
    },
  },
});

const TOAST_STYLES = {
  success: { bg: '#DFF6DD', color: 'var(--color-success)', border: '1px solid #107C10', Icon: CheckmarkCircle24Filled },
  error: { bg: '#FDE7E9', color: 'var(--color-danger)', border: '1px solid #D13438', Icon: ErrorCircle24Filled },
  warning: { bg: '#FFF4CE', color: 'var(--color-warning)', border: '1px solid #FFB900', Icon: Warning24Filled },
  info: { bg: '#E8DDF4', color: 'var(--color-primary)', border: '1px solid #6B46B8', Icon: Info24Filled },
};

export function ToastProvider({ children }) {
  const styles = useStyles();
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.length > 0 && (
        <div className={styles.container}>
          {toasts.map((toast) => {
            const config = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
            const { Icon } = config;
            return (
              <div
                key={toast.id}
                className={styles.toast}
                style={{
                  backgroundColor: config.bg,
                  color: config.color,
                  border: config.border,
                }}
              >
                <Icon style={{ fontSize: '20px', flexShrink: 0 }} />
                <span>{toast.message}</span>
                <Dismiss16Regular
                  className={styles.dismiss}
                  onClick={() => dismissToast(toast.id)}
                  style={{ color: config.color }}
                />
              </div>
            );
          })}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
