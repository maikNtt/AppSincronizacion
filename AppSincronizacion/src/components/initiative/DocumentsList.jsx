// PARIDAD POWER APPS: Lista de documentos mock.
// Equivale a una Gallery con Items = iniciativa.documents (colección embebida)
// o a un conector a una Document Library de SharePoint.
//
// FUERA DE ALCANCE: subida real de archivos, preview de documentos.
// En la versión final, los documentos se almacenarían en una SharePoint Document Library
// vinculada por el código de la iniciativa (ej: /sites/CoEIA/MNT-001/).

import { makeStyles, tokens, Text } from '@fluentui/react-components';
import {
  Document24Regular,
  DocumentPdf24Regular,
  Table24Regular,
  SlideText24Regular,
  Notebook24Regular,
  Info16Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  section: {
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #EDEBE9',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: tokens.shadow2,
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#323130',
    marginBottom: '16px',
    display: 'block',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '6px',
    backgroundColor: '#FAFAFA',
    border: '1px solid #EDEBE9',
  },
  icon: {
    fontSize: '24px',
    flexShrink: 0,
  },
  info: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  fileName: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#323130',
  },
  fileMeta: {
    fontSize: '11px',
    color: '#A19F9D',
  },
  notice: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#E8DDF4',
    border: '1px solid #B8A3D8',
    marginTop: '12px',
    fontSize: '12px',
    color: '#6B46B8',
    lineHeight: '16px',
  },
  empty: {
    fontSize: '13px',
    color: '#A19F9D',
    fontStyle: 'italic',
    padding: '12px 0',
  },
});

const FILE_ICONS = {
  Word: { Icon: Document24Regular, color: '#2B579A' },
  Excel: { Icon: Table24Regular, color: '#217346' },
  PowerPoint: { Icon: SlideText24Regular, color: '#D24726' },
  PDF: { Icon: DocumentPdf24Regular, color: '#D13438' },
  Notebook: { Icon: Notebook24Regular, color: '#7719AA' },
};

export default function DocumentsList({ documents }) {
  const styles = useStyles();

  return (
    <div className={styles.section}>
      <Text className={styles.sectionTitle}>Documentos asociados</Text>

      {(!documents || documents.length === 0) ? (
        <Text className={styles.empty}>No hay documentos asociados a esta iniciativa.</Text>
      ) : (
        <div className={styles.list}>
          {documents.map((doc, index) => {
            const fileConfig = FILE_ICONS[doc.type] || FILE_ICONS.Word;
            const { Icon, color } = fileConfig;
            return (
              <div key={index} className={styles.item}>
                <Icon className={styles.icon} style={{ color }} />
                <div className={styles.info}>
                  <Text className={styles.fileName}>{doc.name}</Text>
                  <Text className={styles.fileMeta}>{doc.type} · {doc.size}</Text>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.notice}>
        <Info16Regular style={{ flexShrink: 0, marginTop: '1px' }} />
        <span>
          En la versión final, estos documentos se almacenarán en la Document Library de SharePoint
          vinculada a cada iniciativa. La subida y descarga de archivos no está disponible en este prototipo.
        </span>
      </div>
    </div>
  );
}
