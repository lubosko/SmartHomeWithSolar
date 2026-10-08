import { useState, useEffect, useCallback } from 'react';
import { Device, GatewayInfo, GatewayState } from './types';
import { ewelinkApi } from './api/ewelink';
import { mockDevices, mockGatewayInfo, mockGatewayState } from './data/mockData';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

type AppView = 'login' | 'dashboard';

export default function App() {
  const [view, setView] = useState<AppView>('login');
  const [isDemo, setIsDemo] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [gatewayInfo, setGatewayInfo] = useState<GatewayInfo | null>(null);
  const [gatewayState, setGatewayState] = useState<GatewayState | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<ReturnType<typeof setInterval> | null>(null);

  // Load saved config on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('ewelink_config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (config.gatewayUrl && config.token) {
          ewelinkApi.setConfig(config.gatewayUrl, config.token);
          loadLiveData();
        }
      } catch (e) {
        // Invalid config, ignore
      }
    }
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [refreshInterval]);

  const loadLiveData = useCallback(async () => {
    try {
      const [devicesRes, infoRes, stateRes] = await Promise.allSettled([
        ewelinkApi.getDevices(),
        ewelinkApi.getGatewayInfo(),
        ewelinkApi.getGatewayState()
      ]);

      if (devicesRes.status === 'fulfilled' && devicesRes.value.error === 0) {
        setDevices(devicesRes.value.data.device_list);
      }
      if (infoRes.status === 'fulfilled' && infoRes.value.error === 0) {
        setGatewayInfo(infoRes.value.data);
      }
      if (stateRes.status === 'fulfilled' && stateRes.value.error === 0) {
        setGatewayState(stateRes.value.data);
      }
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  }, []);

  const handleConnect = async (url: string, token: string) => {
    setIsConnecting(true);
    setError(null);

    try {
      ewelinkApi.setConfig(url, token);
      
      // Test connection by fetching devices
      const response = await ewelinkApi.getDevices();
      
      if (response.error === 0) {
        // Save config
        localStorage.setItem('ewelink_config', JSON.stringify({ gatewayUrl: url, token }));
        
        setDevices(response.data.device_list);
        setIsDemo(false);
        setView('dashboard');
        
        // Load additional info
        try {
          const [infoRes, stateRes] = await Promise.allSettled([
            ewelinkApi.getGatewayInfo(),
            ewelinkApi.getGatewayState()
          ]);
          if (infoRes.status === 'fulfilled' && infoRes.value.error === 0) {
            setGatewayInfo(infoRes.value.data);
          }
          if (stateRes.status === 'fulfilled' && stateRes.value.error === 0) {
            setGatewayState(stateRes.value.data);
          }
        } catch (e) {
          // Non-critical, continue
        }

        // Set up polling for live updates
        const interval = setInterval(loadLiveData, 10000);
        setRefreshInterval(interval);
      } else {
        setError(response.message || 'Failed to connect to gateway');
      }
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        setError('Cannot reach the gateway. Check the URL and ensure you are on the same network.');
      } else if (err.response?.status === 401) {
        setError('Authentication failed. Please check your access token.');
      } else {
        setError(err.message || 'Connection failed. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDemoMode = () => {
    setDevices(mockDevices);
    setGatewayInfo(mockGatewayInfo);
    setGatewayState(mockGatewayState);
    setIsDemo(true);
    setView('dashboard');
  };

  const handleDisconnect = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    }
    localStorage.removeItem('ewelink_config');
    setView('login');
    setDevices([]);
    setGatewayInfo(null);
    setGatewayState(null);
    setIsDemo(false);
    setError(null);
  };

  const handleTogglePower = async (serialNumber: string, state: 'on' | 'off') => {
    if (isDemo) {
      // Update mock data
      setDevices(prev => prev.map(d => 
        d.serial_number === serialNumber 
          ? { ...d, state: { ...d.state, power: { powerState: state } } }
          : d
      ));
      return;
    }

    try {
      const response = await ewelinkApi.togglePower(serialNumber, state);
      if (response.error === 0) {
        setDevices(prev => prev.map(d => 
          d.serial_number === serialNumber 
            ? { ...d, state: { ...d.state, power: { powerState: state } } }
            : d
        ));
      }
    } catch (err) {
      console.error('Failed to toggle power:', err);
    }
  };

  const handleSetBrightness = async (serialNumber: string, value: number) => {
    if (isDemo) {
      setDevices(prev => prev.map(d => 
        d.serial_number === serialNumber 
          ? { ...d, state: { ...d.state, brightness: { brightness: value } } }
          : d
      ));
      return;
    }

    try {
      await ewelinkApi.setBrightness(serialNumber, value);
      setDevices(prev => prev.map(d => 
        d.serial_number === serialNumber 
          ? { ...d, state: { ...d.state, brightness: { brightness: value } } }
          : d
      ));
    } catch (err) {
      console.error('Failed to set brightness:', err);
    }
  };

  const handleSetColorTemp = async (serialNumber: string, value: number) => {
    if (isDemo) {
      setDevices(prev => prev.map(d => 
        d.serial_number === serialNumber 
          ? { ...d, state: { ...d.state, 'color-temperature': { colorTemperature: value } } }
          : d
      ));
      return;
    }

    try {
      await ewelinkApi.setColorTemperature(serialNumber, value);
      setDevices(prev => prev.map(d => 
        d.serial_number === serialNumber 
          ? { ...d, state: { ...d.state, 'color-temperature': { colorTemperature: value } } }
          : d
      ));
    } catch (err) {
      console.error('Failed to set color temperature:', err);
    }
  };

  const handleSetMotorControl = async (serialNumber: string, action: 'open' | 'close' | 'stop') => {
    if (isDemo) {
      setDevices(prev => prev.map(d => 
        d.serial_number === serialNumber 
          ? { ...d, state: { ...d.state, 'motor-control': { motorControl: action } } }
          : d
      ));
      return;
    }

    try {
      await ewelinkApi.setMotorControl(serialNumber, action);
      setDevices(prev => prev.map(d => 
        d.serial_number === serialNumber 
          ? { ...d, state: { ...d.state, 'motor-control': { motorControl: action } } }
          : d
      ));
    } catch (err) {
      console.error('Failed to control motor:', err);
    }
  };

  const handleSetToggle = async (serialNumber: string, channel: string, state: 'on' | 'off') => {
    if (isDemo) {
      setDevices(prev => prev.map(d => 
        d.serial_number === serialNumber 
          ? { ...d, state: { ...d.state, toggle: { ...d.state.toggle, [channel]: { toggleState: state } } } }
          : d
      ));
      return;
    }

    try {
      await ewelinkApi.setToggle(serialNumber, channel, state);
      setDevices(prev => prev.map(d => 
        d.serial_number === serialNumber 
          ? { ...d, state: { ...d.state, toggle: { ...d.state.toggle, [channel]: { toggleState: state } } } }
          : d
      ));
    } catch (err) {
      console.error('Failed to toggle channel:', err);
    }
  };

  if (view === 'login') {
    return (
      <Login
        onConnect={handleConnect}
        onDemoMode={handleDemoMode}
        isConnecting={isConnecting}
        error={error}
      />
    );
  }

  return (
    <Dashboard
      devices={devices}
      gatewayInfo={gatewayInfo}
      gatewayState={gatewayState}
      isDemo={isDemo}
      onTogglePower={handleTogglePower}
      onSetBrightness={handleSetBrightness}
      onSetColorTemp={handleSetColorTemp}
      onSetMotorControl={handleSetMotorControl}
      onSetToggle={handleSetToggle}
      onDisconnect={handleDisconnect}
    />
  );
}
