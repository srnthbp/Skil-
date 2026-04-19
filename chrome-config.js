/**
 * Chrome Configuration for Playwright MCP
 * Preset configurations for different automation scenarios
 */

const chromeConfigs = {
  /**
   * Standard headless Chrome for web scraping
   */
  headless: {
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-background-networking',
      '--disable-sync'
    ]
  },

  /**
   * Chrome with performance optimizations
   */
  performance: {
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
      '--disable-software-rasterizer',
      '--disable-extensions',
      '--disable-plugins',
      '--disable-images',
      '--single-process'
    ]
  },

  /**
   * Chrome for testing with full features
   */
  testing: {
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
      '--enable-automation',
      '--disable-extensions',
      '--no-sandbox'
    ]
  },

  /**
   * Chrome for visual regression testing
   */
  visual: {
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
      '--force-device-scale-factor=1',
      '--force-color-profile=srgb'
    ]
  },

  /**
   * Chrome for security/compliance testing
   */
  security: {
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--disable-plugins',
      '--disable-javascript',
      '--no-sandbox'
    ]
  },

  /**
   * Chrome for debugging (with visible UI)
   */
  debug: {
    headless: false,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--start-maximized'
    ],
    devtools: true
  }
};

/**
 * Viewport presets for device emulation
 */
const viewports = {
  desktop: { width: 1920, height: 1080 },
  laptop: { width: 1366, height: 768 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
  mobileXL: { width: 414, height: 896 },
  iphone12: { width: 390, height: 844 },
  ipadPro: { width: 1024, height: 1366 }
};

/**
 * User agent strings
 */
const userAgents = {
  chrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  firefox: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  safari: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
  mobile: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
};

/**
 * Network conditions presets
 */
const networkConditions = {
  offline: {
    downloadThroughput: 0,
    uploadThroughput: 0,
    latency: 0
  },
  slow3G: {
    downloadThroughput: 400 * 1024 / 8,
    uploadThroughput: 400 * 1024 / 8,
    latency: 400
  },
  fast3G: {
    downloadThroughput: 1.6 * 1024 * 1024 / 8,
    uploadThroughput: 750 * 1024 / 8,
    latency: 40
  },
  wifi: {
    downloadThroughput: 30 * 1024 * 1024 / 8,
    uploadThroughput: 15 * 1024 * 1024 / 8,
    latency: 2
  }
};

/**
 * Get config by preset name
 */
function getConfig(preset = 'headless') {
  return chromeConfigs[preset] || chromeConfigs.headless;
}

/**
 * Get viewport by device name
 */
function getViewport(device = 'desktop') {
  return viewports[device] || viewports.desktop;
}

/**
 * Get user agent by browser type
 */
function getUserAgent(browser = 'chrome') {
  return userAgents[browser] || userAgents.chrome;
}

/**
 * Get network conditions by speed preset
 */
function getNetworkConditions(speed = 'wifi') {
  return networkConditions[speed] || networkConditions.wifi;
}

/**
 * Print all available configurations
 */
function printConfigs() {
  console.log('🔷 Chrome Automation Configurations\n');

  console.log('📋 Browser Presets:');
  Object.keys(chromeConfigs).forEach(preset => {
    console.log(`   • ${preset}`);
  });

  console.log('\n📱 Viewport Presets:');
  Object.keys(viewports).forEach(viewport => {
    const size = viewports[viewport];
    console.log(`   • ${viewport}: ${size.width}x${size.height}`);
  });

  console.log('\n🌐 User Agents:');
  Object.keys(userAgents).forEach(agent => {
    console.log(`   • ${agent}`);
  });

  console.log('\n⚡ Network Conditions:');
  Object.keys(networkConditions).forEach(condition => {
    console.log(`   • ${condition}`);
  });
}

module.exports = {
  chromeConfigs,
  viewports,
  userAgents,
  networkConditions,
  getConfig,
  getViewport,
  getUserAgent,
  getNetworkConditions,
  printConfigs
};

// Print if run directly
if (require.main === module) {
  const config = require('./chrome-config');
  config.printConfigs();
}
