import Icon from './Icon';

export default function NetworkWarning({ offline, onRetry }) {
  return (
    <section className="network-warning">
      {offline ? (
        <>
          <Icon className="network-warning-icon" name="wifi" />
          <h1>No internet connection</h1>
          <p>Check if your device is connected to a mobile network or WiFi.</p>
        </>
      ) : (
        <h1>Couldn't reach the server</h1>
      )}
      <button className="shop-button-link" onClick={onRetry} type="button">
        Try Again
      </button>
    </section>
  );
}
