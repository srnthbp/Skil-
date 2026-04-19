const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * Chrome Automation Suite for Playwright MCP
 * Headless Chrome testing, scraping, and browser automation
 */

class ChromeAutomation {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      tests: [],
      screenshots: [],
      data: []
    };
  }

  /**
   * Initialize Chrome browser (headless mode)
   */
  async init() {
    console.log('🚀 Initializing Headless Chrome...\n');
    this.browser = await chromium.launch({
      headless: true,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-web-resources',
        '--disable-background-networking'
      ]
    });
    console.log('✅ Chrome launched in headless mode\n');
  }

  /**
   * Test 1: Page Navigation & DOM Inspection
   */
  async testPageNavigation() {
    console.log('Test 1: Page Navigation & DOM Inspection');
    this.page = await this.browser.newPage();

    await this.page.goto('https://example.com', { waitUntil: 'domcontentloaded' });
    const title = await this.page.title();
    const url = this.page.url();

    const content = {
      title,
      url,
      timestamp: new Date().toISOString()
    };

    console.log(`  ✅ Title: "${title}"`);
    console.log(`  ✅ URL: ${url}\n`);

    this.results.tests.push({ name: 'Page Navigation', status: 'passed', content });
  }

  /**
   * Test 2: Element Selection & Interaction
   */
  async testElementInteraction() {
    console.log('Test 2: Element Selection & Interaction');

    const h1Elements = await this.page.locator('h1').count();
    const h1Text = await this.page.locator('h1').first().textContent();
    const paragraphs = await this.page.locator('p').count();

    console.log(`  ✅ Found ${h1Elements} h1 element(s)`);
    console.log(`  ✅ H1 Text: "${h1Text}"`);
    console.log(`  ✅ Found ${paragraphs} paragraph(s)\n`);

    this.results.tests.push({
      name: 'Element Interaction',
      status: 'passed',
      elements: { h1Elements, paragraphs }
    });
  }

  /**
   * Test 3: Performance Metrics
   */
  async testPerformanceMetrics() {
    console.log('Test 3: Performance Metrics');

    const metrics = await this.page.evaluate(() => {
      const perfData = window.performance.timing;
      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        pageLoad: perfData.loadEventEnd - perfData.navigationStart,
        timeToFirstByte: perfData.responseStart - perfData.navigationStart
      };
    });

    console.log(`  ✅ DOM Content Loaded: ${metrics.domContentLoaded}ms`);
    console.log(`  ✅ Page Load Time: ${metrics.pageLoad}ms`);
    console.log(`  ✅ Time to First Byte: ${metrics.timeToFirstByte}ms\n`);

    this.results.tests.push({ name: 'Performance Metrics', status: 'passed', metrics });
  }

  /**
   * Test 4: Network Activity
   */
  async testNetworkActivity() {
    console.log('Test 4: Network Request Tracking');

    const requests = [];
    this.page.on('request', request => {
      requests.push({
        url: request.url(),
        method: request.method(),
        type: request.resourceType()
      });
    });

    await this.page.reload();

    const byType = {};
    requests.forEach(req => {
      byType[req.type] = (byType[req.type] || 0) + 1;
    });

    console.log(`  ✅ Total requests: ${requests.length}`);
    console.log(`  ✅ Request breakdown:`);
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`     - ${type}: ${count}`);
    });
    console.log();

    this.results.tests.push({ name: 'Network Activity', status: 'passed', requests: requests.length, byType });
  }

  /**
   * Test 5: Screenshot Capture
   */
  async testScreenshot() {
    console.log('Test 5: Screenshot Capture');

    const screenshotPath = path.join(__dirname, 'chrome-automation-screenshot.png');
    await this.page.screenshot({ path: screenshotPath, fullPage: true });

    const fileSize = fs.statSync(screenshotPath).size;
    console.log(`  ✅ Screenshot saved: chrome-automation-screenshot.png`);
    console.log(`  ✅ File size: ${(fileSize / 1024).toFixed(2)}KB\n`);

    this.results.screenshots.push({ path: screenshotPath, size: fileSize });
  }

  /**
   * Test 6: Page Content Extraction
   */
  async testContentExtraction() {
    console.log('Test 6: Page Content Extraction');

    const pageData = await this.page.evaluate(() => {
      return {
        title: document.title,
        lang: document.documentElement.lang,
        headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
          level: h.tagName,
          text: h.textContent.trim()
        })),
        links: Array.from(document.querySelectorAll('a')).slice(0, 5).map(a => ({
          text: a.textContent.trim(),
          href: a.href
        })),
        meta: {
          description: document.querySelector('meta[name="description"]')?.content,
          charset: document.querySelector('meta[charset]')?.charset
        }
      };
    });

    console.log(`  ✅ Page title: "${pageData.title}"`);
    console.log(`  ✅ Language: ${pageData.lang}`);
    console.log(`  ✅ Headings found: ${pageData.headings.length}`);
    console.log(`  ✅ Links sampled: ${pageData.links.length}\n`);

    this.results.data.push(pageData);
  }

  /**
   * Test 7: Viewport & Device Emulation
   */
  async testViewportEmulation() {
    console.log('Test 7: Viewport & Device Emulation');

    const desktopPage = await this.browser.newPage({
      viewport: { width: 1920, height: 1080 }
    });

    const mobilePage = await this.browser.newPage({
      viewport: { width: 375, height: 667 }
    });

    await desktopPage.goto('https://example.com');
    await mobilePage.goto('https://example.com');

    const desktopSize = desktopPage.viewportSize();
    const mobileSize = mobilePage.viewportSize();

    console.log(`  ✅ Desktop viewport: ${desktopSize.width}x${desktopSize.height}`);
    console.log(`  ✅ Mobile viewport: ${mobileSize.width}x${mobileSize.height}\n`);

    await desktopPage.close();
    await mobilePage.close();

    this.results.tests.push({ name: 'Viewport Emulation', status: 'passed' });
  }

  /**
   * Run all tests
   */
  async runAll() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔷 PLAYWRIGHT CHROME AUTOMATION TEST SUITE');
    console.log('═══════════════════════════════════════════════════════\n');

    try {
      await this.init();
      await this.testPageNavigation();
      await this.testElementInteraction();
      await this.testPerformanceMetrics();
      await this.testNetworkActivity();
      await this.testScreenshot();
      await this.testContentExtraction();
      await this.testViewportEmulation();

      this.printSummary();
    } catch (error) {
      console.error('❌ Test suite failed:', error.message);
      process.exit(1);
    } finally {
      await this.cleanup();
    }
  }

  /**
   * Print test summary
   */
  printSummary() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 TEST SUMMARY');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log(`✅ Tests Passed: ${this.results.tests.length}`);
    this.results.tests.forEach(test => {
      console.log(`   • ${test.name}`);
    });

    console.log(`\n📸 Screenshots: ${this.results.screenshots.length}`);
    this.results.screenshots.forEach(ss => {
      console.log(`   • ${path.basename(ss.path)} (${(ss.size / 1024).toFixed(2)}KB)`);
    });

    console.log(`\n📋 Data Extractions: ${this.results.data.length}`);

    console.log('\n🔷 Chrome Automation Status: ✅ ALL TESTS PASSED\n');
    console.log('Available Chrome Automation Capabilities:');
    console.log('  • Page navigation & DOM inspection');
    console.log('  • Element selection & interaction');
    console.log('  • Performance metrics collection');
    console.log('  • Network activity tracking');
    console.log('  • Screenshot capture (full-page)');
    console.log('  • Content extraction & scraping');
    console.log('  • Viewport & device emulation');
    console.log('  • Headless Chrome execution\n');
  }

  /**
   * Cleanup
   */
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('✅ Chrome browser closed\n');
    }
  }
}

// Run test suite
const automation = new ChromeAutomation();
automation.runAll();
