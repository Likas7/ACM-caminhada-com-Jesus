import { useApp } from '../context/useApp';
import styles from './Toast.module.css';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className={styles.toast}>
      <span>{toastMessage}</span>
    </div>
  );
}
