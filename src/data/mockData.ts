import { Device, GatewayInfo, GatewayState, SecurityMode } from '../types';

export const mockDevices: Device[] = [
  {
    serial_number: 'SN001',
    name: 'Living Room Light',
    manufacturer: 'SONOFF',
    model: 'BASICZBR3',
    firmware_version: '1.3.0',
    display_category: 'light',
    capabilities: [
      { capability: 'power', permission: 'readWrite' },
      { capability: 'brightness', permission: 'readWrite' },
      { capability: 'color-temperature', permission: 'readWrite' },
      { capability: 'rssi', permission: 'read' }
    ],
    protocol: 'zigbee',
    state: {
      power: { powerState: 'on' },
      brightness: { brightness: 75 },
      'color-temperature': { colorTemperature: 50 },
      rssi: { rssi: -45 }
    },
    tags: {},
    online: true,
    room: 'Living Room'
  },
  {
    serial_number: 'SN002',
    name: 'Kitchen Switch',
    manufacturer: 'SONOFF',
    model: 'ZBMINI',
    firmware_version: '1.2.0',
    display_category: 'switch',
    capabilities: [
      { capability: 'power', permission: 'readWrite' },
      { capability: 'rssi', permission: 'read' }
    ],
    protocol: 'zigbee',
    state: {
      power: { powerState: 'off' },
      rssi: { rssi: -62 }
    },
    tags: {},
    online: true,
    room: 'Kitchen'
  },
  {
    serial_number: 'SN003',
    name: 'Bedroom Lamp',
    manufacturer: 'SONOFF',
    model: 'BASICZBR3',
    firmware_version: '1.3.0',
    display_category: 'light',
    capabilities: [
      { capability: 'power', permission: 'readWrite' },
      { capability: 'brightness', permission: 'readWrite' },
      { capability: 'color-rgb', permission: 'readWrite' },
      { capability: 'rssi', permission: 'read' }
    ],
    protocol: 'zigbee',
    state: {
      power: { powerState: 'on' },
      brightness: { brightness: 40 },
      'color-rgb': { red: 255, green: 180, blue: 100 },
      rssi: { rssi: -55 }
    },
    tags: {},
    online: true,
    room: 'Bedroom'
  },
  {
    serial_number: 'SN004',
    name: 'Smart Plug - TV',
    manufacturer: 'SONOFF',
    model: 'S31',
    firmware_version: '1.4.0',
    display_category: 'plug',
    capabilities: [
      { capability: 'power', permission: 'readWrite' },
      { capability: 'power-consumption', permission: 'readWrite' },
      { capability: 'voltage', permission: 'read' },
      { capability: 'electric-current', permission: 'read' },
      { capability: 'electric-power', permission: 'read' }
    ],
    protocol: 'wifi',
    state: {
      power: { powerState: 'on' },
      voltage: { voltage: 23100 },
      'electric-current': { 'electric-current': 450 },
      'electric-power': { 'electric-power': 10350 }
    },
    tags: {},
    online: true,
    room: 'Living Room'
  },
  {
    serial_number: 'SN005',
    name: 'Front Door Sensor',
    manufacturer: 'SONOFF',
    model: 'SNZB-04',
    firmware_version: '1.0.2',
    display_category: 'contactSensor',
    capabilities: [
      { capability: 'contact', permission: 'read' },
      { capability: 'battery', permission: 'read' },
      { capability: 'rssi', permission: 'read' }
    ],
    protocol: 'zigbee',
    state: {
      contact: { contact: false },
      battery: { battery: 85 },
      rssi: { rssi: -70 }
    },
    tags: {},
    online: true,
    room: 'Entrance'
  },
  {
    serial_number: 'SN006',
    name: 'Hallway Motion',
    manufacturer: 'SONOFF',
    model: 'SNZB-03',
    firmware_version: '1.0.1',
    display_category: 'motionSensor',
    capabilities: [
      { capability: 'motion', permission: 'read' },
      { capability: 'battery', permission: 'read' },
      { capability: 'rssi', permission: 'read' }
    ],
    protocol: 'zigbee',
    state: {
      motion: { motion: false },
      battery: { battery: 92 },
      rssi: { rssi: -58 }
    },
    tags: {},
    online: true,
    room: 'Hallway'
  },
  {
    serial_number: 'SN007',
    name: 'Office Thermostat',
    manufacturer: 'SONOFF',
    model: 'TRVZB',
    firmware_version: '1.1.0',
    display_category: 'thermostat',
    capabilities: [
      { capability: 'temperature', permission: 'read' },
      { capability: 'humidity', permission: 'read' },
      { capability: 'thermostat-target-setpoint', permission: 'readWrite', name: 'manual-mode' },
      { capability: 'battery', permission: 'read' }
    ],
    protocol: 'zigbee',
    state: {
      temperature: { temperature: 22.5 },
      humidity: { humidity: 45 },
      'thermostat-target-setpoint': { 'manual-mode': { targetSetpoint: 23 } },
      battery: { battery: 78 }
    },
    tags: {},
    online: true,
    room: 'Office'
  },
  {
    serial_number: 'SN008',
    name: 'Garage Door',
    manufacturer: 'SONOFF',
    model: 'ZBMINI',
    firmware_version: '1.2.0',
    display_category: 'curtain',
    capabilities: [
      { capability: 'motor-control', permission: 'readWrite' },
      { capability: 'rssi', permission: 'read' }
    ],
    protocol: 'zigbee',
    state: {
      'motor-control': { motorControl: 'stop' },
      rssi: { rssi: -65 }
    },
    tags: {},
    online: true,
    room: 'Garage'
  },
  {
    serial_number: 'SN009',
    name: '4-Channel Switch',
    manufacturer: 'SONOFF',
    model: 'ZBMINIL2',
    firmware_version: '1.5.0',
    display_category: 'switch',
    capabilities: [
      { capability: 'toggle', permission: 'readWrite', name: '1' },
      { capability: 'toggle', permission: 'readWrite', name: '2' },
      { capability: 'toggle', permission: 'readWrite', name: '3' },
      { capability: 'toggle', permission: 'readWrite', name: '4' },
      { capability: 'rssi', permission: 'read' }
    ],
    protocol: 'zigbee',
    state: {
      toggle: {
        '1': { toggleState: 'on' },
        '2': { toggleState: 'off' },
        '3': { toggleState: 'on' },
        '4': { toggleState: 'off' }
      },
      rssi: { rssi: -48 }
    },
    tags: { toggle: { '1': 'Ceiling', '2': 'Spot', '3': 'LED Strip', '4': 'Fan' } },
    online: true,
    room: 'Living Room'
  },
  {
    serial_number: 'SN010',
    name: 'Garden Sensor',
    manufacturer: 'SONOFF',
    model: 'SNZB-02',
    firmware_version: '1.0.3',
    display_category: 'temperatureAndHumiditySensor',
    capabilities: [
      { capability: 'temperature', permission: 'read' },
      { capability: 'humidity', permission: 'read' },
      { capability: 'battery', permission: 'read' },
      { capability: 'rssi', permission: 'read' }
    ],
    protocol: 'zigbee',
    state: {
      temperature: { temperature: 18.2 },
      humidity: { humidity: 65 },
      battery: { battery: 45 },
      rssi: { rssi: -72 }
    },
    tags: {},
    online: false,
    room: 'Garden'
  },
  {
    serial_number: 'SN011',
    name: 'Smoke Detector',
    manufacturer: 'SONOFF',
    model: 'SNZB-05',
    firmware_version: '1.0.0',
    display_category: 'smokeDetector',
    capabilities: [
      { capability: 'smoke', permission: 'read' },
      { capability: 'battery', permission: 'read' },
      { capability: 'rssi', permission: 'read' }
    ],
    protocol: 'zigbee',
    state: {
      smoke: { smoke: false },
      battery: { battery: 95 },
      rssi: { rssi: -52 }
    },
    tags: {},
    online: true,
    room: 'Kitchen'
  },
  {
    serial_number: 'SN012',
    name: 'Bathroom Fan',
    manufacturer: 'SONOFF',
    model: 'BASICZBR3',
    firmware_version: '1.3.0',
    display_category: 'fan',
    capabilities: [
      { capability: 'power', permission: 'readWrite' },
      { capability: 'rssi', permission: 'read' }
    ],
    protocol: 'zigbee',
    state: {
      power: { powerState: 'off' },
      rssi: { rssi: -60 }
    },
    tags: {},
    online: true,
    room: 'Bathroom'
  }
];

export const mockGatewayInfo: GatewayInfo = {
  ip: '192.168.1.100',
  mac: 'AA:BB:CC:DD:EE:FF',
  domain: 'ihost.local',
  fw_version: '2.1.0',
  name: 'iHost Gateway'
};

export const mockGatewayState: GatewayState = {
  ram_used: 42,
  cpu_used: 18,
  power_up_time: '2024-01-15T08:30:00.000Z',
  cpu_temp: 48,
  cpu_temp_unit: 'c',
  sd_card_used: '35'
};

export const mockSecurityModes: SecurityMode[] = [
  { sid: 1, name: 'Home Mode', enable: true },
  { sid: 2, name: 'Away Mode', enable: false },
  { sid: 3, name: 'Night Mode', enable: false }
];

export function getRooms(devices: Device[]): string[] {
  const rooms = new Set<string>();
  devices.forEach(d => {
    if (d.room) rooms.add(d.room);
  });
  return Array.from(rooms).sort();
}
