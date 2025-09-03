import PropTypes from 'prop-types';
import { createContext } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';

const defaultConfig = {
  mode: 'light',                         // 'light' | 'dark'
  fontFamily: "'Inter', system-ui, sans-serif",
  borderRadius: 8,
  primaryColor: '#1976d2',               // azul
  secondaryColor: '#9c27b0'              // púrpura
};

export const ConfigContext = createContext({
  ...defaultConfig,
  onToggleMode: () => {},
  onSetMode: () => {},
  onChangeFontFamily: () => {},
  onChangeBorderRadius: () => {},
  onSetPrimary: () => {},
  onSetSecondary: () => {},
  onReset: () => {}
});

export function ConfigProvider({ children }) {
  const [cfg, setCfg] = useLocalStorage('mana-theme', defaultConfig);

  const onToggleMode = () => setCfg({ ...cfg, mode: cfg.mode === 'dark' ? 'light' : 'dark' });
  const onSetMode = (mode) => setCfg({ ...cfg, mode });
  const onChangeFontFamily = (fontFamily) => setCfg({ ...cfg, fontFamily });
  const onChangeBorderRadius = (_, v) => setCfg({ ...cfg, borderRadius: v });
  const onSetPrimary = (hex) => setCfg({ ...cfg, primaryColor: hex });
  const onSetSecondary = (hex) => setCfg({ ...cfg, secondaryColor: hex });
  const onReset = () => setCfg(defaultConfig);

  return (
    <ConfigContext.Provider value={{
      ...cfg,
      onToggleMode,
      onSetMode,
      onChangeFontFamily,
      onChangeBorderRadius,
      onSetPrimary,
      onSetSecondary,
      onReset
    }}>
      {children}
    </ConfigContext.Provider>
  );
}
ConfigProvider.propTypes = { children: PropTypes.node };
