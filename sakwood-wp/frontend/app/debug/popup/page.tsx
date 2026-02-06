'use client';

import { useEffect, useState } from 'react';

export default function DebugPopupPage() {
  const [storage, setStorage] = useState<any>(null);

  useEffect(() => {
    // Check localStorage
    const dismissed = localStorage.getItem('promo-popup-dismissed');
    setStorage({
      'promo-popup-dismissed': dismissed,
      hasDismissed: !!dismissed
    });
  }, []);

  const clearDismissed = () => {
    localStorage.removeItem('promo-popup-dismissed');
    alert('Popup dismissed flag cleared! Refresh the page to see the popup.');
    setStorage({ ...storage, 'promo-popup-dismissed': null, hasDismissed: false });
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Popup Debug Tool</h1>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>LocalStorage Status:</h2>
        <pre style={{ background: '#fff', padding: '15px', borderRadius: '4px' }}>
          {JSON.stringify(storage, null, 2)}
        </pre>

        {storage?.hasDismissed && (
          <button
            onClick={clearDismissed}
            style={{
              background: '#0073aa',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Clear Dismissed Flag
          </button>
        )}
      </div>

      <div style={{ background: '#e8f4f8', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Instructions:</h2>
        <ol style={{ lineHeight: '1.8' }}>
          <li>If <strong>hasDismissed: true</strong>, click the button above to clear it</li>
          <li>Then refresh the homepage to see the popup</li>
          <li>The popup will appear after a 3-second delay</li>
        </ol>
      </div>

      <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '8px' }}>
        <h2>Why isn&apos;t the popup showing?</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Dismissed before:</strong> If you clicked &quot;Don&apos;t show again&quot;, the popup won&apos;t show</li>
          <li><strong>Delay:</strong> The popup waits 3 seconds before appearing</li>
          <li><strong>Not enabled:</strong> Check WordPress admin → Settings → Popup → Make sure &quot;Enable Popup&quot; is checked</li>
        </ul>
      </div>
    </div>
  );
}
