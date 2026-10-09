# SmartHome Monitor

A modern, responsive smart home dashboard for controlling SONOFF devices via the eWeLink Open API V2. Built with React, TypeScript, Vite, and Tailwind CSS.

![SmartHome Dashboard](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

- 🏠 **Device Management** - Control lights, switches, plugs, sensors, and more
- 📊 **Real-time Monitoring** - Live device status with auto-refresh
- 🎨 **Modern UI** - Dark theme with responsive design
- 🔌 **eWeLink API V2** - Full integration with SONOFF iHost gateway
- 📱 **Room Organization** - Group devices by room
- 🔍 **Search & Filter** - Quickly find and control devices
- 🎛️ **Multi-channel Support** - Control multi-gang switches
- 💡 **Dimming & Color** - Brightness and color temperature controls
- 📡 **Signal Monitoring** - View device signal strength and battery levels
- 🛡️ **Demo Mode** - Explore the dashboard without a gateway

## Supported Devices

| Category | Devices |
|----------|---------|
| Lights | Smart bulbs, LED strips, dimmable lights |
| Switches | Single/dual/quad gang switches |
| Plugs | Smart plugs with power monitoring |
| Sensors | Temperature, humidity, motion, contact, smoke |
| Motors | Curtains, blinds, garage doors |
| Thermostats | TRV radiator valves |
| Fans | Smart fans and fan lights |

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **SONOFF iHost Gateway** (for live connection)
- Devices paired with your eWeLink account

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/lubosko/SmartHomeMonitor.git
cd SmartHomeMonitor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Copy the example environment file and update it:

```bash
cp .env.example .env
```

Edit `.env` with your gateway details:

```env
VITE_GATEWAY_URL=http://192.168.1.100
VITE_GATEWAY_TOKEN=your-access-token-here
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Getting Your Access Token

### Method 1: Via Dashboard
1. Press the physical pairing button on your iHost gateway
2. Within 5 minutes, enter your gateway URL in the dashboard
3. Click "Connect to Gateway"
4. The dashboard will automatically request a token

### Method 2: Manual API Call

```bash
# Press the pairing button on your gateway first, then:
curl --location --request GET 'http://<gateway-ip>/open-api/v2/rest/bridge/access_token' \
  --header 'Content-Type: application/json'
```

Response:
```json
{
  "error": 0,
  "data": {
    "token": "376310da-7adf-4521-b18c-5e0752cfff8d"
  },
  "message": "success"
}
```

## Project Structure

```
SmartHomeMonitor/
├── src/
│   ├── api/
│   │   └── ewelink.ts          # eWeLink API client
│   ├── components/
│   │   ├── Dashboard.tsx       # Main dashboard view
│   │   ├── DeviceCard.tsx      # Device control card
│   │   └── Login.tsx           # Login/configuration screen
│   ├── data/
│   │   └── mockData.ts         # Demo mode mock data
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── utils/
│   │   └── deviceUtils.tsx     # Device helper functions
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## API Endpoints Used

This dashboard uses the eWeLink Open API V2:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/open-api/v2/rest/bridge/access_token` | GET | Get access token |
| `/open-api/v2/rest/bridge` | GET | Get gateway info |
| `/open-api/v2/rest/bridge/runtime` | GET | Get gateway state |
| `/open-api/v2/rest/devices` | GET | List all devices |
| `/open-api/v2/rest/devices/{id}` | PUT | Update device |
| `/open-api/v2/rest/devices/{id}` | DELETE | Remove device |
| `/open-api/v2/rest/security` | GET | Get security modes |

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_GATEWAY_URL` | iHost gateway URL | `http://192.168.1.100` |
| `VITE_GATEWAY_TOKEN` | Access token | - |

### Gateway Discovery

If you don't know your gateway's IP address:

1. Check your router's DHCP client list
2. Use mDNS: `http://ihost.local`
3. Use the eWeLink app to find the gateway IP

## Development

### Adding New Device Types

1. Update `DeviceCategory` type in `src/types/index.ts`
2. Add icon mapping in `src/utils/deviceUtils.tsx`
3. Add control handlers in `DeviceCard.tsx`
4. Update API methods in `src/api/ewelink.ts`

### Styling

The project uses Tailwind CSS v4 with a dark theme. Customize colors in `tailwind.config.js`.

## Troubleshooting

### Cannot Connect to Gateway

- Ensure your computer and gateway are on the same network
- Check the gateway IP address is correct
- Verify the gateway is powered on (blue LED = connected)
- Try accessing `http://ihost.local` in your browser

### Authentication Failed

- Ensure you pressed the pairing button before connecting
- Token expires after 5 minutes if not used
- Generate a new token via the API

### Devices Not Showing

- Check devices are paired with your eWeLink account
- Verify devices are online in the eWeLink app
- Try refreshing the dashboard

### CORS Errors

If you see CORS errors when connecting to the gateway, you may need to:
- Run a local proxy server
- Or configure your gateway to allow cross-origin requests

## Backend Integration (Planned)

Future backend features:
- [ ] User authentication system
- [ ] Device automation & scenes
- [ ] Historical data storage
- [ ] Push notifications
- [ ] Multi-gateway support
- [ ] Voice assistant integration
- [ ] Energy usage analytics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [eWeLink](https://ewelink.cc/) for the Open API
- [SONOFF](https://sonoff.tech/) for the smart home devices
- [iHost](https://ewelink.cc/ewelink-cube/) gateway platform
- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icons

## Support

For issues related to:
- **This dashboard**: Open an issue on GitHub
- **eWeLink API**: Visit [eWeLink Developer Center](https://ewelink.cc/ewelink-cube/introduce-open-api/)
- **SONOFF devices**: Contact [SONOFF Support](https://sonoff.tech/en-us/support/)

---

Made with ❤️ for the smart home community
