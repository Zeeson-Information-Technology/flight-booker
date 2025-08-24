export default function SettingsPage() {
  const env = process.env.NODE_ENV;
  const base = process.env.APP_BASE_URL;
  const email = process.env.EMAIL_FROM_ADDRESS || "not set";
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded">Subscription Status: Free (placeholder)</div>
      <div className="p-4 border rounded">API Keys (coming soon)</div>
      <div className="p-4 border rounded">Email From Address: {email}</div>
      <div className="p-4 border rounded">
        NODE_ENV: {env} <br /> APP_BASE_URL: {base}
      </div>
    </div>
  );
}
