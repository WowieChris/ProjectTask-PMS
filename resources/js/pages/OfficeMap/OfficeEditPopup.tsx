import { useEffect, useState } from 'react';

interface Office {
  id: string;
  db_id: number;
  level: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
}

const LEVEL_LABELS: Record<string, string> = {
  division: 'Division',
  district: 'District',
  area: 'Area',
  branch: 'Branch',
};

export default function OfficeEditPopup({
  office,
  onSaved,
}: {
  office: Office;
  onSaved: (updated: Office) => void;
}) {
  const [name, setName]       = useState(office.name);
  const [address, setAddress] = useState(office.address ?? '');
  const [status, setStatus]   = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    setName(office.name);
    setAddress(office.address ?? '');
    setStatus('idle');
  }, [office.id]);

  async function handleSave() {
    setStatus('saving');
    try {
      const res = await fetch(`/api/offices/${office.level}/${office.db_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, address }),
      });

      if (!res.ok) throw new Error('Request failed');

      const updated: Office = await res.json();
      setStatus('success');
      onSaved(updated);
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={{ minWidth: 240 }}>
      <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 13 }}>
        Edit {LEVEL_LABELS[office.level] ?? office.level}
      </p>

      <label style={labelStyle}>Name</label>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        style={inputStyle}
        disabled={status === 'saving'}
      />

      <label style={labelStyle}>Address</label>
      <textarea
        value={address}
        onChange={e => setAddress(e.target.value)}
        rows={3}
        style={{ ...inputStyle, resize: 'vertical' }}
        disabled={status === 'saving'}
      />

      {status === 'success' && (
        <p style={{ color: '#15803d', fontSize: 12, margin: '4px 0' }}>Saved successfully.</p>
      )}
      {status === 'error' && (
        <p style={{ color: '#b91c1c', fontSize: 12, margin: '4px 0' }}>Failed to save. Try again.</p>
      )}

      <button
        onClick={handleSave}
        disabled={status === 'saving'}
        style={buttonStyle}
      >
        {status === 'saving' ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 2,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  fontSize: 12,
  padding: '4px 6px',
  border: '1px solid #d1d5db',
  borderRadius: 4,
  marginBottom: 8,
  boxSizing: 'border-box',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 0',
  background: '#1e3a5f',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 600,
  cursor: 'pointer',
};
