import { useState } from 'react';
import { Device, GatewayInfo, GatewayState } from '../types';
import { getRooms } from '../data/mockData';
import DeviceCard from './DeviceCard';
import { 
  Home, LayoutGrid, Thermometer, Zap, Wifi, WifiOff, 
  Settings, LogOut, Search, Cpu, HardDrive, Clock,
  Shield, SlidersHorizontal
} from 'lucide-react';

interface DashboardProps {
  devices: Device[];
  gatewayInfo: GatewayInfo | null;
  gatewayState: GatewayState | null;
  isDemo: boolean;
  onTogglePower: (serialNumber: string, state: 'on' | 'off') => void;
  onSetBrightness: (serialNumber: string, value: number) => void;
  onSetColorTemp: (serialNumber: string, value: number) => void;
  onSetMotorControl: (serialNumber: string, action: 'open' | 'close' | 'stop') => void;
  onSetToggle: (serialNumber: string, channel: string, state: 'on' | 'off') => void;
  onDisconnect: () => void;
}

export default function Dashboard({
  devices, gatewayInfo, gatewayState, isDemo,
  onTogglePower, onSetBrightness, onSetColorTemp, onSetMotorControl, onSetToggle, onDisconnect
}: DashboardProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSettings, setShowSettings] = useState(false);

  const rooms = ['All', ...getRooms(devices)];
  
  const filteredDevices = devices.filter(d => {
    const matchesRoom = selectedRoom === 'All' || d.room === selectedRoom;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRoom && matchesSearch;
  });

  const onlineDevices = devices.filter(d => d.online).length;
  const activeDevices = devices.filter(d => d.state?.power?.powerState === 'on' || 
    d.state?.toggle && Object.values(d.state.toggle).some((t: any) => t.toggleState === 'on')).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">SmartHome</h1>
                {isDemo && <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">DEMO</span>}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden sm:flex items-center bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search devices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-40"
                />
              </div>

              {/* Gateway status */}
              {gatewayInfo && (
                <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{gatewayInfo.name}</span>
                </div>
              )}

              {/* Settings */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* Disconnect */}
              <button
                onClick={onDisconnect}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-slate-800/50 border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gatewayInfo && (
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Gateway Info</h4>
                  <div className="space-y-1 text-xs text-slate-400">
                    <p>IP: {gatewayInfo.ip}</p>
                    <p>MAC: {gatewayInfo.mac}</p>
                    <p>Firmware: {gatewayInfo.fw_version}</p>
                    <p>Domain: {gatewayInfo.domain}</p>
                  </div>
                </div>
              )}
              {gatewayState && (
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">System Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1"><Cpu className="w-3 h-3" /> CPU</span>
                      <span className="text-slate-300">{gatewayState.cpu_used}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${gatewayState.cpu_used}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1"><HardDrive className="w-3 h-3" /> RAM</span>
                      <span className="text-slate-300">{gatewayState.ram_used}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-1.5">
                      <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${gatewayState.ram_used}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1"><Thermometer className="w-3 h-3" /> Temp</span>
                      <span className="text-slate-300">{gatewayState.cpu_temp}°{gatewayState.cpu_temp_unit.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="bg-slate-700/30 rounded-xl p-4">
                <h4 className="text-sm font-medium text-slate-300 mb-2">Connection</h4>
                <div className="space-y-1 text-xs text-slate-400">
                  <p>Mode: {isDemo ? 'Demo (Mock Data)' : 'Live (eWeLink API)'}</p>
                  <p>Devices: {devices.length} total</p>
                  <p>Online: {onlineDevices}</p>
                  <p>Active: {activeDevices}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{devices.length}</p>
                <p className="text-xs text-slate-400">Total Devices</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{onlineDevices}</p>
                <p className="text-xs text-slate-400">Online</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{activeDevices}</p>
                <p className="text-xs text-slate-400">Active</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                <WifiOff className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{devices.length - onlineDevices}</p>
                <p className="text-xs text-slate-400">Offline</p>
              </div>
            </div>
          </div>
        </div>

        {/* Room Filter */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {rooms.map(room => (
            <button
              key={room}
              onClick={() => setSelectedRoom(room)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedRoom === room
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-slate-700/40'
              }`}
            >
              {room}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-400">
            Showing {filteredDevices.length} device{filteredDevices.length !== 1 ? 's' : ''}
            {selectedRoom !== 'All' && ` in ${selectedRoom}`}
          </p>
          <div className="flex items-center gap-1 bg-slate-800/50 border border-slate-700/40 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Device Grid */}
        {filteredDevices.length > 0 ? (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-2xl'
          }`}>
            {filteredDevices.map(device => (
              <DeviceCard
                key={device.serial_number}
                device={device}
                onTogglePower={onTogglePower}
                onSetBrightness={onSetBrightness}
                onSetColorTemp={onSetColorTemp}
                onSetMotorControl={onSetMotorControl}
                onSetToggle={onSetToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-slate-400">No devices found</p>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            SmartHome Control • eWeLink Open API V2 • {gatewayState && (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Uptime: {Math.floor((Date.now() - new Date(gatewayState.power_up_time).getTime()) / (1000 * 60 * 60))}h
              </span>
            )}
          </p>
        </footer>
      </main>
    </div>
  );
}
