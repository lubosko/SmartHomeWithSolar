import { useState } from 'react';
import { Device } from '../types';
import { 
  getDeviceIcon, getCategoryLabel, getDevicePowerState, 
  getDeviceBrightness, getDeviceTemperature, getDeviceHumidity,
  getDeviceBattery, getDeviceRSSI, getSignalStrength, getSignalColor
} from '../utils/deviceUtils';
import { Wifi, WifiOff, Battery, ChevronDown, ChevronUp } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  onTogglePower?: (serialNumber: string, state: 'on' | 'off') => void;
  onSetBrightness?: (serialNumber: string, value: number) => void;
  onSetColorTemp?: (serialNumber: string, value: number) => void;
  onSetMotorControl?: (serialNumber: string, action: 'open' | 'close' | 'stop') => void;
  onSetToggle?: (serialNumber: string, channel: string, state: 'on' | 'off') => void;
}

export default function DeviceCard({ 
  device, onTogglePower, onSetBrightness, onSetColorTemp, onSetMotorControl, onSetToggle 
}: DeviceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const powerState = getDevicePowerState(device);
  const brightness = getDeviceBrightness(device);
  const temperature = getDeviceTemperature(device);
  const humidity = getDeviceHumidity(device);
  const battery = getDeviceBattery(device);
  const rssi = getDeviceRSSI(device);
  const isOn = powerState === 'on';

  const hasPowerControl = device.capabilities.some(c => c.capability === 'power');
  const hasBrightness = device.capabilities.some(c => c.capability === 'brightness');
  const hasColorTemp = device.capabilities.some(c => c.capability === 'color-temperature');
  const hasMotorControl = device.capabilities.some(c => c.capability === 'motor-control');
  const hasToggle = device.capabilities.some(c => c.capability === 'toggle');
  const toggleChannels = device.capabilities
    .filter(c => c.capability === 'toggle')
    .map(c => c.name || '1');

  const handlePowerToggle = () => {
    if (onTogglePower && powerState) {
      onTogglePower(device.serial_number, powerState === 'on' ? 'off' : 'on');
    }
  };

  return (
    <div className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
      !device.online 
        ? 'bg-slate-800/40 border-slate-700/30 opacity-60' 
        : isOn 
          ? 'bg-slate-800/80 border-blue-500/30 shadow-lg shadow-blue-500/5' 
          : 'bg-slate-800/60 border-slate-700/40'
    }`}>
      {/* Online indicator */}
      <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${
        device.online ? 'bg-green-400 shadow-sm shadow-green-400/50' : 'bg-red-400'
      }`}></div>

      {/* Main content */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            !device.online
              ? 'bg-slate-700/50 text-slate-500'
              : isOn 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-slate-700/50 text-slate-400'
          }`}>
            {getDeviceIcon(device.display_category, "w-6 h-6")}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate">{device.name}</h3>
            <p className="text-slate-400 text-sm">{getCategoryLabel(device.display_category)}</p>
            
            {/* Quick stats */}
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {temperature !== null && (
                <span className="text-xs text-slate-300 bg-slate-700/50 px-2 py-0.5 rounded-full">
                  {temperature}°C
                </span>
              )}
              {humidity !== null && (
                <span className="text-xs text-slate-300 bg-slate-700/50 px-2 py-0.5 rounded-full">
                  {humidity}%
                </span>
              )}
              {battery !== null && (
                <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  battery > 20 ? 'text-green-300 bg-green-500/10' : 'text-red-300 bg-red-500/10'
                }`}>
                  <Battery className="w-3 h-3" />
                  {battery}%
                </span>
              )}
              {rssi !== null && (
                <span className={`text-xs flex items-center gap-1 ${getSignalColor(getSignalStrength(rssi))}`}>
                  {rssi > -60 ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                </span>
              )}
            </div>
          </div>

          {/* Power toggle */}
          {hasPowerControl && device.online && (
            <button
              onClick={handlePowerToggle}
              className={`flex-shrink-0 w-14 h-8 rounded-full relative transition-all duration-300 ${
                isOn ? 'bg-blue-500' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                isOn ? 'left-7' : 'left-1'
              }`}></div>
            </button>
          )}
        </div>

        {/* Brightness slider */}
        {hasBrightness && isOn && device.online && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-400">Brightness</span>
              <span className="text-xs text-slate-300">{brightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness || 0}
              onChange={(e) => onSetBrightness?.(device.serial_number, parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        )}

        {/* Color temperature slider */}
        {hasColorTemp && isOn && device.online && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-400">Color Temperature</span>
              <span className="text-xs text-slate-300">{device.state['color-temperature']?.colorTemperature}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={device.state['color-temperature']?.colorTemperature || 50}
              onChange={(e) => onSetColorTemp?.(device.serial_number, parseInt(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: 'linear-gradient(to right, #f59e0b, #ffffff, #60a5fa)'
              }}
            />
          </div>
        )}

        {/* Motor control */}
        {hasMotorControl && device.online && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onSetMotorControl?.(device.serial_number, 'open')}
              className="flex-1 py-2 px-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-xs font-medium rounded-lg transition-colors"
            >
              Open
            </button>
            <button
              onClick={() => onSetMotorControl?.(device.serial_number, 'stop')}
              className="flex-1 py-2 px-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-400 text-xs font-medium rounded-lg transition-colors"
            >
              Stop
            </button>
            <button
              onClick={() => onSetMotorControl?.(device.serial_number, 'close')}
              className="flex-1 py-2 px-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-medium rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {/* Multi-channel toggle */}
        {hasToggle && device.online && (
          <div className="mt-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300 transition-colors"
            >
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {toggleChannels.length} channels
            </button>
            {expanded && (
              <div className="mt-2 space-y-2">
                {toggleChannels.map(channel => {
                  const channelState = device.state?.toggle?.[channel]?.toggleState;
                  const channelName = device.tags?.toggle?.[channel] || `Channel ${channel}`;
                  return (
                    <div key={channel} className="flex items-center justify-between py-1.5">
                      <span className="text-xs text-slate-300">{channelName}</span>
                      <button
                        onClick={() => onSetToggle?.(device.serial_number, channel, channelState === 'on' ? 'off' : 'on')}
                        className={`w-10 h-5 rounded-full relative transition-all duration-300 ${
                          channelState === 'on' ? 'bg-blue-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                          channelState === 'on' ? 'left-5' : 'left-0.5'
                        }`}></div>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
