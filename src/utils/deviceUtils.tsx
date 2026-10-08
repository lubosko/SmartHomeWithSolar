import { Device } from '../types';
import { 
  Lightbulb, Power, Plug, Thermometer, Droplets, Shield, 
  Wind, Blinds, AlertTriangle, Cpu, Zap, Eye
} from 'lucide-react';

export function getDeviceIcon(category: Device['display_category'], className: string = "w-5 h-5") {
  switch (category) {
    case 'light':
    case 'fanLight':
      return <Lightbulb className={className} />;
    case 'switch':
      return <Power className={className} />;
    case 'plug':
      return <Plug className={className} />;
    case 'temperatureSensor':
    case 'temperatureAndHumiditySensor':
      return <Thermometer className={className} />;
    case 'humiditySensor':
      return <Droplets className={className} />;
    case 'contactSensor':
      return <Shield className={className} />;
    case 'motionSensor':
      return <Eye className={className} />;
    case 'fan':
      return <Wind className={className} />;
    case 'curtain':
      return <Blinds className={className} />;
    case 'smokeDetector':
    case 'waterLeakDetector':
      return <AlertTriangle className={className} />;
    case 'thermostat':
      return <Cpu className={className} />;
    case 'airConditioner':
      return <Wind className={className} />;
    default:
      return <Zap className={className} />;
  }
}

export function getCategoryLabel(category: Device['display_category']): string {
  const labels: Record<string, string> = {
    switch: 'Switch',
    plug: 'Smart Plug',
    light: 'Light',
    curtain: 'Curtain/Blinds',
    contactSensor: 'Door/Window Sensor',
    motionSensor: 'Motion Sensor',
    temperatureSensor: 'Temperature Sensor',
    humiditySensor: 'Humidity Sensor',
    temperatureAndHumiditySensor: 'Temp & Humidity',
    waterLeakDetector: 'Water Leak Detector',
    smokeDetector: 'Smoke Detector',
    button: 'Wireless Button',
    camera: 'Camera',
    sensor: 'Sensor',
    fanLight: 'Fan Light',
    airConditioner: 'Air Conditioner',
    fan: 'Fan',
    thermostat: 'Thermostat'
  };
  return labels[category] || category;
}

export function getDevicePowerState(device: Device): 'on' | 'off' | null {
  if (device.state?.power?.powerState) {
    return device.state.power.powerState === 'on' ? 'on' : 'off';
  }
  return null;
}

export function getDeviceBrightness(device: Device): number | null {
  return device.state?.brightness?.brightness ?? null;
}

export function getDeviceTemperature(device: Device): number | null {
  return device.state?.temperature?.temperature ?? null;
}

export function getDeviceHumidity(device: Device): number | null {
  return device.state?.humidity?.humidity ?? null;
}

export function getDeviceBattery(device: Device): number | null {
  return device.state?.battery?.battery ?? null;
}

export function getDeviceRSSI(device: Device): number | null {
  return device.state?.rssi?.rssi ?? null;
}

export function getSignalStrength(rssi: number): 'excellent' | 'good' | 'fair' | 'weak' {
  if (rssi >= -50) return 'excellent';
  if (rssi >= -60) return 'good';
  if (rssi >= -70) return 'fair';
  return 'weak';
}

export function getSignalColor(strength: string): string {
  switch (strength) {
    case 'excellent': return 'text-green-400';
    case 'good': return 'text-blue-400';
    case 'fair': return 'text-yellow-400';
    case 'weak': return 'text-red-400';
    default: return 'text-slate-400';
  }
}
