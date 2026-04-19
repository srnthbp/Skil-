const { chromium } = require('playwright');

async function testPlaywright() {
  console.log('🎭 Starting Playwright MCP Test...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Test 1: Navigate to a simple URL
    console.log('Test 1: Navigating to example.com...');
    await page.goto('https://example.com');
    const title = await page.title();
    console.log(`✅ Page title: "${title}"\n`);

    // Test 2: Get page content
    console.log('Test 2: Extracting content...');
    const heading = await page.locator('h1').textContent();
    console.log(`✅ Main heading: "${heading}"\n`);

    // Test 3: Screenshot
    console.log('Test 3: Taking screenshot...');
    await page.screenshot({ path: 'playwright-test.png' });
    console.log('✅ Screenshot saved: playwright-test.png\n');

    // Test 4: Viewport info
    console.log('Test 4: Checking viewport...');
    const size = page.viewportSize();
    console.log(`✅ Viewport: ${size.width}x${size.height}\n`);

    console.log('🎭 All Playwright MCP tests passed!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testPlaywright();
