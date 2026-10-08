import axios from 'axios';
import { ApiResponse, Device, GatewayInfo, GatewayState, SecurityMode } from '../types';

class EWeLinkAPI {
  private baseUrl: string = '';
  private token: string = '';

  constructor(baseUrl?: string, token?: string) {
    if (baseUrl) this.baseUrl = baseUrl;
    if (token) this.token = token;
  }

  setConfig(baseUrl: string, token: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = token;
  }

  getConfig() {
    return { baseUrl: this.baseUrl, token: this.token };
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }

  // Gateway Functions
  async getAccessToken(appName: string = 'SmartHome Dashboard'): Promise<ApiResponse<{ token: string }>> {
    const response = await axios.get(`${this.baseUrl}/open-api/v2/rest/bridge/access_token`, {
      headers: { 'Content-Type': 'application/json' },
      params: { app_name: appName }
    });
    return response.data;
  }

  async getGatewayInfo(): Promise<ApiResponse<GatewayInfo>> {
    const response = await axios.get(`${this.baseUrl}/open-api/v2/rest/bridge`, {
      headers: this.getHeaders()
    });
    return response.data;
  }

  async getGatewayState(): Promise<ApiResponse<GatewayState>> {
    const response = await axios.get(`${this.baseUrl}/open-api/v2/rest/bridge/runtime`, {
      headers: this.getHeaders()
    });
    return response.data;
  }

  async setGatewayVolume(volume: number): Promise<ApiResponse<{}>> {
    const response = await axios.put(`${this.baseUrl}/open-api/v2/rest/bridge/config`, 
      { volume },
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  // Device Functions
  async getDevices(): Promise<ApiResponse<{ device_list: Device[] }>> {
    const response = await axios.get(`${this.baseUrl}/open-api/v2/rest/devices`, {
      headers: this.getHeaders()
    });
    return response.data;
  }

  async updateDevice(serialNumber: string, data: { state?: Record<string, any>; name?: string; tags?: Record<string, any> }): Promise<ApiResponse<Device>> {
    const response = await axios.put(`${this.baseUrl}/open-api/v2/rest/devices/${serialNumber}`, 
      data,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async deleteDevice(serialNumber: string): Promise<ApiResponse<{}>> {
    const response = await axios.delete(`${this.baseUrl}/open-api/v2/rest/devices/${serialNumber}`, {
      headers: this.getHeaders()
    });
    return response.data;
  }

  async discoverDevices(type: string = 'zigbee', enable: boolean = true): Promise<ApiResponse<{}>> {
    const response = await axios.put(`${this.baseUrl}/open-api/v2/rest/devices/discovery`,
      { enable, type },
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  // Device Control Helpers
  async togglePower(serialNumber: string, state: 'on' | 'off'): Promise<ApiResponse<Device>> {
    return this.updateDevice(serialNumber, {
      state: {
        power: {
          powerState: state
        }
      }
    });
  }

  async setBrightness(serialNumber: string, brightness: number): Promise<ApiResponse<Device>> {
    return this.updateDevice(serialNumber, {
      state: {
        brightness: {
          brightness: Math.max(0, Math.min(100, brightness))
        }
      }
    });
  }

  async setColorTemperature(serialNumber: string, colorTemp: number): Promise<ApiResponse<Device>> {
    return this.updateDevice(serialNumber, {
      state: {
        'color-temperature': {
          colorTemperature: Math.max(0, Math.min(100, colorTemp))
        }
      }
    });
  }

  async setColorRGB(serialNumber: string, red: number, green: number, blue: number): Promise<ApiResponse<Device>> {
    return this.updateDevice(serialNumber, {
      state: {
        'color-rgb': {
          red: Math.max(0, Math.min(255, red)),
          green: Math.max(0, Math.min(255, green)),
          blue: Math.max(0, Math.min(255, blue))
        }
      }
    });
  }

  async setMotorControl(serialNumber: string, action: 'open' | 'close' | 'stop'): Promise<ApiResponse<Device>> {
    return this.updateDevice(serialNumber, {
      state: {
        'motor-control': {
          motorControl: action
        }
      }
    });
  }

  async setToggle(serialNumber: string, channel: string, state: 'on' | 'off'): Promise<ApiResponse<Device>> {
    return this.updateDevice(serialNumber, {
      state: {
        toggle: {
          [channel]: {
            toggleState: state
          }
        }
      }
    });
  }

  // Security Functions
  async getSecurityList(): Promise<ApiResponse<{ security_list: SecurityMode[] }>> {
    const response = await axios.get(`${this.baseUrl}/open-api/v2/rest/security`, {
      headers: this.getHeaders()
    });
    return response.data;
  }

  async enableSecurity(securityId: number): Promise<ApiResponse<{}>> {
    const response = await axios.put(`${this.baseUrl}/open-api/v2/rest/security/${securityId}/enable`, {},
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async disableSecurity(): Promise<ApiResponse<{}>> {
    const response = await axios.put(`${this.baseUrl}/open-api/v2/rest/security/disable`, {},
      { headers: this.getHeaders() }
    );
    return response.data;
  }
}

export const ewelinkApi = new EWeLinkAPI();
export default EWeLinkAPI;
