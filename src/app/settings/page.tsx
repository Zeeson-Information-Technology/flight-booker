import { getEnv } from '@/env';

export default function SettingsPage() {
  const emailFrom = process.env.EMAIL_FROM || 'not set';
  const { APP_BASE_URL } = getEnv();
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded">
        <h2 className="font-semibold">Subscription Status</h2>
        <p>Coming soon</p>
      </div>
      <div className="p-4 border rounded">
        <h2 className="font-semibold">API Keys</h2>
        <p>Coming soon</p>
      </div>
      <div className="p-4 border rounded">
        <h2 className="font-semibold">Email From Address</h2>
        <p>{emailFrom}</p>
      </div>
      <div className="p-4 border rounded">
        <h2 className="font-semibold">Environment</h2>
        <p>NODE_ENV: {process.env.NODE_ENV}</p>
        <p>APP_BASE_URL: {APP_BASE_URL}</p>
      </div>
    </div>
  );
}
