export interface Device {
  serial_number: string;
  name: string;
  manufacturer: string;
  model: string;
  firmware_version: string;
  display_category: DeviceCategory;
  capabilities: Capability[];
  protocol: string;
  state: Record<string, any>;
  tags: Record<string, any>;
  online: boolean;
  room?: string;
}

export type DeviceCategory = 
  | 'switch'
  | 'plug'
  | 'light'
  | 'curtain'
  | 'contactSensor'
  | 'motionSensor'
  | 'temperatureSensor'
  | 'humiditySensor'
  | 'temperatureAndHumiditySensor'
  | 'waterLeakDetector'
  | 'smokeDetector'
  | 'button'
  | 'camera'
  | 'sensor'
  | 'fanLight'
  | 'airConditioner'
  | 'fan'
  | 'thermostat';

export interface Capability {
  capability: string;
  permission: string;
  name?: string;
  settings?: Record<string, any>;
}

export interface GatewayInfo {
  ip: string;
  mac: string;
  domain: string;
  fw_version: string;
  name: string;
}

export interface GatewayState {
  ram_used: number;
  cpu_used: number;
  power_up_time: string;
  cpu_temp: number;
  cpu_temp_unit: string;
  sd_card_used?: string;
}

export interface SecurityMode {
  sid: number;
  name: string;
  enable: boolean;
}

export interface AppConfig {
  gatewayUrl: string;
  token: string;
  appName: string;
}

export interface ApiResponse<T> {
  error: number;
  data: T;
  message: string;
}
