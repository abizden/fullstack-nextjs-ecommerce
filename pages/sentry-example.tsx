// pages/sentry.tsx

import React from 'react';
import * as Sentry from '@sentry/nextjs';

const SentryExamplePage = () => {
  // Sentry'ye manuel hata gönderme
  const handleManualError = () => {
    try {
      throw new Error('Sentry manual test error!');
    } catch (error) {
      Sentry.captureException(error);
      alert("Hata Sentry'ye manuel olarak gönderildi!");
    }
  };

  // Otomatik hata yakalama (unhandled error)
  const handleUnhandledError = () => {
    throw new Error('Sentry automatic (unhandled) test error!');
  };

  const handleFetchWithSpan = async () => {
    // Sentry span başlat
    Sentry.startSpan({ op: 'custom.api', name: 'Veri çekiliyor' }, async (span) => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        alert('Veri başarıyla çekildi: ' + JSON.stringify(data));
      } catch (error) {
        Sentry.captureException(error);
        alert('Hata oluştu!');
      } finally {
        if (span) span.end();
      }
    });
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Sentry Test Sayfası</h1>
      <p>
        Bu sayfa, Sentry entegrasyonunu test etmek için hazırlanmıştır.
        <br />
        Aşağıdaki butonlarla Sentry'ye hata gönderebilirsin.
      </p>
      <button
        style={{
          background: '#3182ce',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: 4,
          marginRight: 16,
          cursor: 'pointer',
        }}
        onClick={handleManualError}
      >
        Manuel Hata Gönder (Sentry.captureException)
      </button>
      <button
        style={{
          background: '#e53e3e',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
        onClick={handleUnhandledError}
      >
        Otomatik Hata Fırlat (Unhandled)
      </button>
      <button
        style={{
          background: '#805ad5',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
        onClick={handleFetchWithSpan}
      >
        Sentry Span ile API Çağrısı
      </button>
    </div>
  );
};

export default SentryExamplePage;
