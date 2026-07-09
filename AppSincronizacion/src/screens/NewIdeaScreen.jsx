// PARIDAD POWER APPS: Esta pantalla equivale al formulario EditForm de una idea.
// Controles: TextInput (título), TextInput MultiLine (problema, solución),
// ComboBox con SelectMultiple=true (autores, Items=Filter(Users, team=varTeam)),
// Button "Guardar" con Patch(Ideas, Defaults(Ideas), {...}),
// Button "Cancelar" con Back() o Navigate(DashboardScreen).
// Validación: If(IsBlank(txtTitulo.Text), DisplayMode.Disabled, DisplayMode.Edit)
// Notificación: Notify("Idea registrada correctamente", NotificationType.Success)

import { useState, useMemo } from 'react';
import {
  makeStyles,
  tokens,
  Text,
  Input,
  Textarea,
  Button,
  Divider,
  Combobox,
  Option,
  Field,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import {
  ArrowLeft24Regular,
  Save24Regular,
  Dismiss24Regular,
  Lightbulb24Regular,
} from '@fluentui/react-icons';
import { useAppContext } from '../hooks/useAppContext';
import { useDataContext } from '../hooks/useDataContext';
import { useToast } from '../hooks/useToast';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  headerIcon: {
    fontSize: '28px',
    color: 'var(--color-primary)',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#323130',
  },
  form: {
    maxWidth: '640px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  charCount: {
    fontSize: '11px',
    color: '#A19F9D',
    textAlign: 'right',
    marginTop: '2px',
  },
});

export default function NewIdeaScreen() {
  const styles = useStyles();
  const { currentUser, goBack } = useAppContext();
  const { getUsersByTeam, addIdea } = useDataContext();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([currentUser.id]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const teamUsers = useMemo(() => getUsersByTeam(currentUser.team), [getUsersByTeam, currentUser.team]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'El título es requerido';
    if (title.length > 120) newErrors.title = 'El título no puede superar 120 caracteres';
    if (!problem.trim()) newErrors.problem = 'El problema actual es requerido';
    if (!solution.trim()) newErrors.solution = 'La solución propuesta es requerida';
    if (selectedAuthors.length === 0) newErrors.authors = 'Debe seleccionar al menos un autor';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setSaving(true);

    addIdea({
      title: title.trim(),
      current_problem: problem.trim(),
      proposed_solution: solution.trim(),
      authors: selectedAuthors,
      team: currentUser.team,
    });

    showToast('Idea registrada correctamente', 'success');

    setTimeout(() => {
      goBack();
    }, 1200);
  };

  const canSave = title.trim() && problem.trim() && solution.trim() && selectedAuthors.length > 0;

  return (
    <>
      <div className={styles.header}>
        <Lightbulb24Regular className={styles.headerIcon} />
        <Text className={styles.title}>Registrar nueva idea</Text>
      </div>

      <div className={styles.form}>
        <Field
          label="Título de la idea"
          required
          validationMessage={errors.title}
          validationState={errors.title ? 'error' : undefined}
        >
          <Input
            value={title}
            onChange={(_, data) => setTitle(data.value)}
            placeholder="Ej: Automatización de reportes de fallas con IA"
            maxLength={120}
          />
          <span className={styles.charCount}>{title.length}/120</span>
        </Field>

        <Field
          label="Problema actual"
          required
          validationMessage={errors.problem}
          validationState={errors.problem ? 'error' : undefined}
          hint="Describe el problema o dolor que se quiere resolver"
        >
          <Textarea
            value={problem}
            onChange={(_, data) => setProblem(data.value)}
            placeholder="¿Cuál es el problema actual? ¿Cuánto tiempo/recursos consume? ¿Qué impacto tiene?"
            rows={4}
            resize="vertical"
          />
        </Field>

        <Field
          label="Solución propuesta con IA"
          required
          validationMessage={errors.solution}
          validationState={errors.solution ? 'error' : undefined}
          hint="Describe cómo la IA podría resolver este problema"
        >
          <Textarea
            value={solution}
            onChange={(_, data) => setSolution(data.value)}
            placeholder="¿Qué tipo de IA se usaría? ¿Cómo funcionaría? ¿Qué se espera lograr?"
            rows={4}
            resize="vertical"
          />
        </Field>

        <Field
          label="Autores"
          required
          validationMessage={errors.authors}
          validationState={errors.authors ? 'error' : undefined}
          hint={`Selecciona los autores de la idea (equipo ${currentUser.team})`}
        >
          <Combobox
            multiselect
            placeholder="Selecciona autores..."
            selectedOptions={selectedAuthors}
            onOptionSelect={(_, data) => setSelectedAuthors(data.selectedOptions)}
          >
            {teamUsers.map((user) => (
              <Option key={user.id} value={user.id} text={user.name}>
                {user.name} ({user.role})
              </Option>
            ))}
          </Combobox>
        </Field>

        <Divider />

        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<Save24Regular />}
            disabled={!canSave || saving}
            onClick={handleSave}
          >
            {saving ? 'Guardando...' : 'Guardar idea'}
          </Button>
          <Button
            appearance="secondary"
            icon={<Dismiss24Regular />}
            onClick={goBack}
            disabled={saving}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </>
  );
}
