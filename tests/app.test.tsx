import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('rendrer app-skallet med navigasjon', () => {
    const html = renderToString(<App />);
    expect(html).toContain('IronLog');
    expect(html).toContain('Logg');
    expect(html).toContain('Økter');
    expect(html).toContain('Øvelser');
    expect(html).toContain('Statistikk');
    expect(html).toContain('Innstillinger');
  });
});
