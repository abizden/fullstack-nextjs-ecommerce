import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // Sentry'ye hataları göndermek için kullanılan bağlantı adresi (proje anahtarı)
  tracesSampleRate: 1, // Performans izleme (tracing) için toplanacak isteklerin oranı (1 = %100, 0.5 = %50)
  debug: false, // Sentry SDK'nın debug loglarını konsola yazıp yazmayacağı (geliştirme için true yapılabilir)
  replaysOnErrorSampleRate: 1.0, // Hata oluştuğunda Session Replay kaydının alınma oranı (1 = %100 hata için replay kaydı alınır)
  replaysSessionSampleRate: 0.1, // Genel olarak (hata olmasa da) Session Replay kaydının alınma oranı (0.1 = %10 oturumda replay kaydı alınır)
  integrations: [/* Sentry.profilingIntegration(),  */ Sentry.replayIntegration()],
});
