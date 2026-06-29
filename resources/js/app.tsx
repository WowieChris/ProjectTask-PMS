import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { route as ziggyRoute, type Config as ZiggyConfig } from 'ziggy-js';
import 'leaflet/dist/leaflet.css';
import '../css/app.css';
import { initializeTheme } from './hooks/use-appearance';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

declare global {
  interface Window {
    Ziggy: ZiggyConfig;
    route: (
      name: string,
      params?: Parameters<typeof ziggyRoute>[1],
      absolute?: Parameters<typeof ziggyRoute>[2]
    ) => string;
  }
}

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),

  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),

  setup({ el, App, props }) {
    const root = createRoot(el);

    // Inject Ziggy config from Inertia shared props
    window.Ziggy = props.initialPage.props.ziggy as ZiggyConfig;

    // Global route() helper
    window.route = (name, params, absolute) =>
      ziggyRoute(name, params, absolute, window.Ziggy);

    root.render(
      <StrictMode>
        <App {...props} />
      </StrictMode>
    );
  },

  progress: { color: '#4B5563' },
});

initializeTheme();