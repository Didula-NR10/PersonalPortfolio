import { createContext, useContext, useEffect, useState } from 'react';
import { applyPalette, getPalette } from './palette-config';

const ThemeContext = createContext(null);

function initialTheme() {
  try {
    const preferences = JSON.parse(window.localStorage.getItem('portfolio-theme-preferences') || 'null');
    if (preferences?.appearance === 'light' || preferences?.appearance === 'dark') return preferences.appearance;
    const saved = window.localStorage.getItem('portfolio-theme') || window.localStorage.getItem('education-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* Storage can be unavailable. */ }
  return 'dark';
}

function initialPreferences() {
  try {
    const saved = JSON.parse(window.localStorage.getItem('portfolio-theme-preferences') || 'null');
    // One-time migration: apply the new default even if an older palette was saved.
    const migrated = window.localStorage.getItem('midnight-cobalt-default-v3') === 'yes';
    if (!migrated) { window.localStorage.setItem('midnight-cobalt-default-v3', 'yes'); return { paletteId: 'midnight-cobalt', favorites: Array.isArray(saved?.favorites) ? saved.favorites : [] }; }
    return {
      paletteId: getPalette(saved?.paletteId || 'midnight-cobalt').id,
      favorites: Array.isArray(saved?.favorites) ? saved.favorites.filter(id => getPalette(id).id === id) : []
    };
  } catch { return { paletteId: 'midnight-cobalt', favorites: [] }; }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);
  const [preferences, setPreferences] = useState(initialPreferences);
  const { paletteId, favorites } = preferences;

  const selectPalette = id => setPreferences(current => ({ ...current, paletteId: getPalette(id).id }));
  const toggleFavorite = id => setPreferences(current => ({ ...current, favorites: current.favorites.includes(id) ? current.favorites.filter(value => value !== id) : [...current.favorites, id] }));
  const previewPalette = id => applyPalette(getPalette(id), theme);
  const restorePalette = () => applyPalette(getPalette(paletteId), theme);

  useEffect(() => {
    const tokens = applyPalette(getPalette(paletteId), theme);
    try {
      window.localStorage.setItem('portfolio-theme', theme);
      window.localStorage.setItem('portfolio-theme-preferences', JSON.stringify({ paletteId, appearance: theme, favorites, tokens }));
    } catch { /* Storage can be unavailable. */ }
  }, [theme, paletteId, favorites]);

  return <ThemeContext.Provider value={{ theme, setTheme, paletteId, favorites, selectPalette, toggleFavorite, previewPalette, restorePalette }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}
