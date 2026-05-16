export default function Snackbar({ message }) {
  return (
    <div className={`snackbar ${message ? 'opened' : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
