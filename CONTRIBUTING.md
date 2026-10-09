# Contributing to SmartHome Monitor

Thank you for your interest in contributing to SmartHome Monitor! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- Clear descriptive title
- Detailed steps to reproduce
- Expected vs actual behavior
- Device type and firmware version
- Browser and version
- Console logs or screenshots

### Suggesting Features

Feature suggestions are welcome! Please include:

- Use case and problem statement
- Proposed solution
- Any alternatives considered
- Priority level

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly (demo mode + live gateway if possible)
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js v18+
- npm v9+
- SONOFF iHost Gateway (for live testing)

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/SmartHomeMonitor.git
cd SmartHomeMonitor

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### Project Structure

```
src/
├── api/              # API client and endpoints
├── components/       # React components
├── data/            # Mock data and constants
├── types/           # TypeScript definitions
├── utils/           # Helper functions
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types in `src/types/`
- Avoid `any` type when possible
- Use interfaces over types for object shapes

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Implement error boundaries where needed

### Styling

- Use Tailwind CSS utility classes
- Follow the existing dark theme
- Ensure responsive design
- Test on mobile devices

### API Integration

- Follow eWeLink Open API V2 documentation
- Handle errors gracefully
- Implement loading states
- Add proper TypeScript types for API responses

## Testing

### Manual Testing

Test your changes with:

1. **Demo Mode**: Verify UI changes work with mock data
2. **Live Gateway**: Test with real devices if possible
3. **Multiple Browsers**: Chrome, Firefox, Safari, Edge
4. **Mobile Devices**: Responsive design check

### Device Testing

If you have SONOFF devices, test with:

- Lights (brightness, color temperature)
- Switches (single and multi-gang)
- Plugs (power monitoring)
- Sensors (temperature, humidity, motion)
- Motors (curtains, blinds)

## Commit Messages

Follow conventional commits:

```
feat: add support for new device type
fix: resolve connection timeout issue
docs: update API documentation
style: format code with prettier
refactor: simplify device card component
test: add tests for API client
chore: update dependencies
```

## Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions
- `chore/` - Maintenance tasks

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the version number following SemVer
3. Ensure all tests pass
4. Get review from maintainers
5. Squash commits if requested
6. Merge after approval

## Adding New Device Types

1. Add device category to `src/types/index.ts`
2. Add icon in `src/utils/deviceUtils.tsx`
3. Add control handlers in `DeviceCard.tsx`
4. Add API methods in `src/api/ewelink.ts`
5. Update mock data in `src/data/mockData.ts`
6. Test with demo mode and live device

## API Documentation

Refer to the official eWeLink Open API V2 documentation:
- [API Introduction](https://ewelink.cc/ewelink-cube/introduce-open-api/)
- [API V2 Documentation](https://ewelink.cc/ewelink-cube/introduce-open-api/document/)

## Questions?

- Open an issue for general questions
- Check existing issues and discussions
- Read the README and documentation

## Recognition

Contributors will be added to the README acknowledgments section.

Thank you for contributing to SmartHome Monitor! 🏠✨
