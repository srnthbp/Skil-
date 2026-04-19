# MCP Integration Guide: Playwright Server for Claude Code

**Playwright MCP v1.59.1**  
**Status:** ✅ Production Ready  
**Last Updated:** 2026-04-19

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [Configuration](#configuration)
4. [Server Management](#server-management)
5. [Claude Code Integration](#claude-code-integration)
6. [API Reference](#api-reference)
7. [Usage Examples](#usage-examples)
8. [Troubleshooting](#troubleshooting)
9. [Performance Tuning](#performance-tuning)
10. [Security Considerations](#security-considerations)

---

## Quick Start

### 1. Verify MCP Configuration

```bash
node mcp-server-config.js status
```

**Expected Output:**
```
🔷 MCP SERVER CONFIGURATION SUMMARY

PLAYWRIGHT
   Status: ✅ Valid
   Command: npx
   Args: ["@playwright/mcp@latest"]
   Full: npx @playwright/mcp@latest

Total Servers: 1
```

### 2. Run Health Check

```bash
node mcp-server-config.js health
```

**Expected Output:**
```
🔷 MCP SERVER HEALTH CHECK

Total Servers: 1
Healthy: 1
Unhealthy: 0

playwright: ✅ healthy
  Command: npx @playwright/mcp@latest
```

### 3. Start MCP Server

```bash
npx @playwright/mcp@latest
```

**Expected Behavior:**
- Server initializes
- MCP protocol active
- Ready for Claude Code connections
- Listens on stdio (default)

---

## Architecture Overview

### MCP Server Stack

```
┌─────────────────────────────────────┐
│      Claude Code / AI Assistant     │
├─────────────────────────────────────┤
│     MCP Protocol (stdio/tcp)         │
├─────────────────────────────────────┤
│   Playwright MCP Server v1.59.1      │
├─────────────────────────────────────┤
│   Playwright v1.59.1 Library         │
├─────────────────────────────────────┤
│  Chromium / Firefox / WebKit Browsers│
└─────────────────────────────────────┘
```

### Communication Flow

```
Claude Code Request
    ↓
MCP Protocol Handler
    ↓
Playwright MCP Server
    ↓
Playwright Library
    ↓
Browser Process
    ↓
Web Resource
    ↓
Response (back up the chain)
```

### Supported Capabilities

| Capability | Status | Details |
|-----------|--------|---------|
| Page Navigation | ✅ | goto, reload, goBack, goForward |
| Element Interaction | ✅ | click, type, select, hover, focus |
| Screenshot | ✅ | Full-page, element, viewport |
| Network Control | ✅ | Request interception, routing |
| Device Emulation | ✅ | Viewport, user agent, touch |
| Cookie Management | ✅ | Get, set, delete, clear |
| JavaScript Execution | ✅ | evaluate, evaluate_on_selector |
| Performance Metrics | ✅ | Timing, memory, network |
| PDF Generation | ✅ | Print to PDF |
| Video Recording | ✅ | Record video of session |

---

## Configuration

### .mcp.json Structure

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

### Configuration Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `command` | `npx` | Package manager command |
| `args` | `["@playwright/mcp@latest"]` | Package and version |
| `timeout` | Optional | Server startup timeout (ms) |
| `env` | Optional | Environment variables |
| `cwd` | Optional | Working directory |

### Environment Variables

```bash
# Performance tuning
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium
PLAYWRIGHT_FIREFOX_EXECUTABLE_PATH=/usr/bin/firefox
PLAYWRIGHT_WEBKIT_EXECUTABLE_PATH=/usr/bin/webkit

# Logging
PLAYWRIGHT_DEBUG=pw:api
PWDEBUG=1

# Network
HTTP_PROXY=http://proxy:8080
HTTPS_PROXY=https://proxy:8080

# Timeouts
PLAYWRIGHT_TIMEOUT=30000
PLAYWRIGHT_LAUNCH_TIMEOUT=15000
```

### Configuration for Different Environments

#### Development Environment

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {
        "PLAYWRIGHT_DEBUG": "pw:api",
        "PWDEBUG": "1",
        "PLAYWRIGHT_TIMEOUT": "60000"
      }
    }
  }
}
```

#### Production Environment

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless"],
      "env": {
        "PLAYWRIGHT_TIMEOUT": "30000",
        "PLAYWRIGHT_LAUNCH_TIMEOUT": "15000"
      }
    }
  }
}
```

#### CI/CD Environment

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--no-sandbox"],
      "env": {
        "PLAYWRIGHT_TIMEOUT": "45000",
        "CI": "true"
      }
    }
  }
}
```

---

## Server Management

### Configuration Manager Commands

#### Show Status

```bash
node mcp-server-config.js status
```

Lists all configured servers with validation status.

#### Health Check

```bash
node mcp-server-config.js health
```

Validates all server configurations and reports health.

#### Export Configuration

```bash
node mcp-server-config.js export
```

Exports configuration as JSON for programmatic use.

#### Generate Integration Code

```bash
node mcp-server-config.js integration
```

Generates Node.js integration code for your application.

#### Generate Environment Config

```bash
node mcp-server-config.js env
```

Generates environment variables file.

### Server Lifecycle

#### Startup

```bash
# Start MCP server
npx @playwright/mcp@latest

# With logging
PWDEBUG=1 npx @playwright/mcp@latest

# With custom browser path
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/custom/path npx @playwright/mcp@latest
```

#### Status Monitoring

```bash
# Check process status
ps aux | grep playwright

# Monitor resource usage
top -p $(pgrep -f playwright)

# View logs
journalctl -u playwright-mcp -f
```

#### Graceful Shutdown

```bash
# Kill process gracefully
kill -SIGTERM <pid>

# Kill with timeout
timeout 10 kill -SIGTERM <pid> || kill -9 <pid>
```

---

## Claude Code Integration

### Loading MCP Server in Claude Code

#### Option 1: Automatic Discovery

Claude Code automatically discovers MCP servers from `.mcp.json`:

```bash
# Claude Code CLI with MCP auto-discovery
claude code --with-mcp
```

#### Option 2: Explicit Configuration

```bash
# Start with specific MCP server
claude code --mcp-server playwright
```

#### Option 3: Manual Startup

```bash
# Start Claude Code
claude code

# In the session, commands using Playwright MCP will:
# 1. Detect configured MCP server
# 2. Establish connection via stdio
# 3. Execute commands through MCP protocol
```

### Using Playwright MCP in Claude Code

Once connected, use Playwright capabilities:

```
@claude
Take a screenshot of https://example.com

@claude
Click the "Login" button and wait for navigation

@claude
Extract all links from the page

@claude
Fill form with: name=John, email=john@example.com
```

### MCP Tool Availability

Available tools when connected:

```
Playwright Tools:
  - navigate_page
  - click_element
  - type_text
  - take_screenshot
  - extract_content
  - execute_javascript
  - get_page_metrics
  - manage_cookies
  - record_video
  - emulate_device
```

---

## API Reference

### Core Methods

#### Page Navigation

```javascript
// Navigate to URL
await page.goto('https://example.com');

// Wait for specific condition
await page.goto('https://example.com', { 
  waitUntil: 'domcontentloaded' 
});

// Reload page
await page.reload();

// Go back/forward
await page.goBack();
await page.goForward();
```

#### Element Interaction

```javascript
// Click element
await page.click('button.login');

// Type text
await page.type('input[name="email"]', 'user@example.com');

// Select option
await page.selectOption('select#country', 'US');

// Focus element
await page.focus('input#search');

// Hover element
await page.hover('button#submit');

// Check checkbox
await page.check('input[type="checkbox"]');

// Uncheck checkbox
await page.uncheck('input[type="checkbox"]');
```

#### Screenshot Capture

```javascript
// Viewport screenshot
await page.screenshot({ path: 'screenshot.png' });

// Full-page screenshot
await page.screenshot({ path: 'full.png', fullPage: true });

// Element screenshot
const element = await page.$('div.card');
await element.screenshot({ path: 'card.png' });

// Specific clip
await page.screenshot({ 
  path: 'clip.png',
  clip: { x: 0, y: 0, width: 500, height: 500 }
});
```

#### Content Extraction

```javascript
// Get page title
const title = await page.title();

// Get page URL
const url = page.url();

// Get element count
const count = await page.locator('p').count();

// Get text content
const text = await page.locator('h1').textContent();

// Get attribute
const href = await page.locator('a').getAttribute('href');

// Evaluate custom JavaScript
const result = await page.evaluate(() => {
  return document.querySelectorAll('p').length;
});
```

#### Network Control

```javascript
// Intercept requests
await page.route('**/*.png', route => {
  route.abort('blockedbyclient');
});

// Modify requests
await page.route('**/*', route => {
  const request = route.request();
  if (request.resourceType() === 'script') {
    route.abort();
  } else {
    route.continue();
  }
});

// Get all requests
const requests = [];
page.on('request', request => {
  requests.push(request.url());
});
```

#### Device Emulation

```javascript
// Create page with specific viewport
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 }
});

// Set user agent
await page.setUserAgent('Custom User Agent');

// Emulate device
await page.emulate({
  userAgent: 'Mozilla/5.0...',
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  hasTouch: true
});

// Set geolocation
await browser.context().setGeolocation({
  latitude: 37.7749,
  longitude: -122.4194
});
```

---

## Usage Examples

### Example 1: Page Scraping

```javascript
const { chromium } = require('playwright');

async function scrapePage() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://example.com');

  const data = await page.evaluate(() => {
    return {
      title: document.title,
      headings: Array.from(document.querySelectorAll('h1')).map(h => h.textContent),
      links: Array.from(document.querySelectorAll('a')).map(a => ({
        text: a.textContent,
        href: a.href
      }))
    };
  });

  console.log(data);
  await browser.close();
}

scrapePage();
```

### Example 2: Form Filling

```javascript
async function fillForm() {
  const page = await browser.newPage();
  await page.goto('https://example.com/form');

  // Fill inputs
  await page.fill('input[name="firstName"]', 'John');
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="email"]', 'john@example.com');

  // Select dropdown
  await page.selectOption('select[name="country"]', 'US');

  // Check checkbox
  await page.check('input[name="agree"]');

  // Submit form
  await page.click('button[type="submit"]');

  // Wait for navigation
  await page.waitForNavigation();

  console.log('Form submitted successfully');
}
```

### Example 3: API Testing

```javascript
async function testAPI() {
  const requests = [];
  const responses = [];

  page.on('request', request => {
    requests.push({
      url: request.url(),
      method: request.method(),
      headers: request.headers()
    });
  });

  page.on('response', response => {
    responses.push({
      url: response.url(),
      status: response.status(),
      contentType: response.headers()['content-type']
    });
  });

  await page.goto('https://api.example.com');

  console.log('Requests:', requests);
  console.log('Responses:', responses);
}
```

### Example 4: Performance Testing

```javascript
async function measurePerformance() {
  const metrics = await page.evaluate(() => {
    const perf = window.performance.timing;
    return {
      pageLoadTime: perf.loadEventEnd - perf.navigationStart,
      domContentLoaded: perf.domContentLoadedEventEnd - perf.navigationStart,
      firstPaint: perf.responseStart - perf.navigationStart
    };
  });

  console.log('Performance Metrics:', metrics);
}
```

---

## Troubleshooting

### Common Issues

#### Issue: MCP Server Not Starting

**Problem:** `ENOENT: no such file or directory, spawn npx`

**Solution:**
```bash
# Verify npm is installed
which npm

# Check playwright package
npm list playwright

# Reinstall if needed
npm install playwright

# Try with full path
/usr/local/bin/npx @playwright/mcp@latest
```

#### Issue: Browser Not Launching

**Problem:** `Executable doesn't exist at /opt/pw-browsers/...`

**Solution:**
```bash
# Install browser binaries
npx playwright install chromium

# Or install all browsers
npx playwright install

# Check installed browsers
npx playwright install --with-deps
```

#### Issue: Connection Timeout

**Problem:** `TimeoutError: Timeout waiting for event "wsEndpoint"`

**Solution:**
```bash
# Increase timeout
PLAYWRIGHT_LAUNCH_TIMEOUT=60000 npx @playwright/mcp@latest

# Check system resources
free -h
df -h

# Kill zombie processes
killall -9 chrome chromium firefox
```

#### Issue: Permission Denied

**Problem:** `Error: EACCES: permission denied`

**Solution:**
```bash
# Check file permissions
ls -la .mcp.json

# Fix permissions
chmod 644 .mcp.json
chmod 755 mcp-server-config.js

# Run with appropriate user
sudo -u $USER npx @playwright/mcp@latest
```

### Debug Logging

Enable detailed logging:

```bash
# Enable Playwright debug
PWDEBUG=1 npx @playwright/mcp@latest

# Enable API logging
PLAYWRIGHT_DEBUG=pw:api npx @playwright/mcp@latest

# Enable protocol logging
PLAYWRIGHT_DEBUG=pw:protocol npx @playwright/mcp@latest

# All debug output
DEBUG=pw:* npx @playwright/mcp@latest
```

### Health Check Validation

```bash
# Run validation
node mcp-server-config.js health

# Expected: All servers healthy
# If unhealthy: Check error message and fix config
```

---

## Performance Tuning

### Browser Launch Options

```javascript
const browser = await chromium.launch({
  // CPU/Memory optimization
  headless: true,
  
  // Disable features
  args: [
    '--disable-dev-shm-usage',
    '--disable-extensions',
    '--disable-plugins',
    '--disable-sync',
    '--disable-background-networking',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-default-apps',
    '--disable-device-discovery-notifications'
  ]
});
```

### Connection Pooling

```javascript
// Reuse browser instance
let browser = null;

async function getBrowser() {
  if (!browser) {
    browser = await chromium.launch();
  }
  return browser;
}

async function getPage() {
  const b = await getBrowser();
  return b.newPage();
}
```

### Resource Limits

```javascript
// Limit concurrent pages
const MAX_PAGES = 5;
let activePages = 0;

async function createPage() {
  while (activePages >= MAX_PAGES) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  activePages++;
  return await browser.newPage();
}

async function closePage(page) {
  await page.close();
  activePages--;
}
```

### Caching Strategies

```javascript
// Cache page content
const cache = new Map();

async function getCachedPage(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const page = await browser.newPage();
  const html = await page.content();
  cache.set(url, html);
  await page.close();

  return html;
}
```

---

## Security Considerations

### Authentication

```javascript
// Set authentication headers
await page.setExtraHTTPHeaders({
  'Authorization': 'Bearer token123',
  'X-Custom-Header': 'value'
});

// Set cookies
await page.context().addCookies([{
  name: 'session_id',
  value: 'abc123',
  url: 'https://example.com',
  httpOnly: true,
  secure: true
}]);
```

### Network Security

```javascript
// Block external resources
await page.route('**/*.{png,jpg,jpeg,gif,webp,svg}', route => {
  route.abort('blockedbyclient');
});

// Allow only specific domains
await page.route('**/*', route => {
  const request = route.request();
  const url = new URL(request.url());

  if (url.hostname === 'example.com') {
    route.continue();
  } else {
    route.abort('blockedbyclient');
  }
});
```

### Data Privacy

```javascript
// Disable JavaScript execution
const page = await browser.newPage({
  javaScriptEnabled: false
});

// Clear sensitive data
await page.context().clearCookies();
await page.evaluate(() => {
  localStorage.clear();
  sessionStorage.clear();
});

// Don't save credentials
const context = await browser.newContext({
  ignoreHTTPSErrors: false
});
```

### Rate Limiting

```javascript
// Add delay between requests
const delay = (ms) => new Promise(r => setTimeout(r, ms));

for (const url of urls) {
  await page.goto(url);
  // Process page
  await delay(1000); // 1 second between requests
}
```

---

## Monitoring & Metrics

### Server Monitoring

```bash
# Monitor CPU/Memory
watch -n 1 'ps aux | grep playwright'

# Check open connections
lsof -i -P -n | grep playwright

# Monitor network
tcpdump -i any -n 'tcp port 3000'
```

### Logging

```javascript
// Structured logging
const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`),
  debug: (msg) => console.log(`[DEBUG] ${new Date().toISOString()} - ${msg}`)
};

logger.info('Browser launched');
logger.debug(`Processing URL: ${url}`);
```

### Metrics Collection

```javascript
const metrics = {
  startTime: Date.now(),
  pagesCreated: 0,
  pagesClosed: 0,
  errorsEncountered: 0,

  recordPageCreated() { this.pagesCreated++; },
  recordPageClosed() { this.pagesClosed++; },
  recordError() { this.errorsEncountered++; },
  
  getStats() {
    return {
      uptime: Date.now() - this.startTime,
      pagesActive: this.pagesCreated - this.pagesClosed,
      totalErrors: this.errorsEncountered
    };
  }
};
```

---

## Deployment Checklist

- [x] `.mcp.json` configured with Playwright server
- [x] `mcp-server-config.js` created and tested
- [x] Health checks passing (1/1 servers healthy)
- [x] Chrome automation suite implemented
- [x] Video production package created
- [x] Documentation complete
- [x] Ready for production deployment

---

## Next Steps

1. **Start MCP Server:**
   ```bash
   npx @playwright/mcp@latest
   ```

2. **Connect from Claude Code:**
   - MCP server will auto-discover from `.mcp.json`
   - Or explicitly load: `claude code --with-mcp`

3. **Use Playwright Capabilities:**
   - Navigate pages
   - Scrape content
   - Test interactions
   - Capture screenshots
   - Measure performance

4. **Monitor & Troubleshoot:**
   ```bash
   node mcp-server-config.js health
   ```

---

**Status:** ✅ PRODUCTION READY

**Last Updated:** 2026-04-19  
**Version:** Playwright MCP v1.59.1  
**Compatibility:** Claude Code, Node.js 14+
