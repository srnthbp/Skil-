/**
 * MCP Server Configuration Manager
 * Playwright MCP for Claude Code Integration
 *
 * This module manages Model Context Protocol (MCP) server
 * configuration, startup, and communication patterns.
 */

const fs = require('fs');
const path = require('path');

class MCPServerManager {
  constructor() {
    this.configPath = path.join(__dirname, '.mcp.json');
    this.config = this.loadConfig();
    this.servers = {};
    this.status = 'initialized';
  }

  /**
   * Load MCP configuration from .mcp.json
   */
  loadConfig() {
    try {
      if (fs.existsSync(this.configPath)) {
        const content = fs.readFileSync(this.configPath, 'utf-8');
        return JSON.parse(content);
      }
      return { mcpServers: {} };
    } catch (error) {
      console.error('❌ Failed to load MCP config:', error.message);
      return { mcpServers: {} };
    }
  }

  /**
   * Get all configured MCP servers
   */
  getServers() {
    return Object.keys(this.config.mcpServers || {});
  }

  /**
   * Get specific server configuration
   */
  getServerConfig(serverName) {
    return this.config.mcpServers[serverName] || null;
  }

  /**
   * Validate MCP server configuration
   */
  validateServer(serverName) {
    const serverConfig = this.getServerConfig(serverName);

    if (!serverConfig) {
      return { valid: false, error: `Server '${serverName}' not found` };
    }

    const { command, args } = serverConfig;

    if (!command) {
      return { valid: false, error: 'Missing command field' };
    }

    if (!Array.isArray(args)) {
      return { valid: false, error: 'Args must be an array' };
    }

    return { valid: true, config: serverConfig };
  }

  /**
   * Build command string from config
   */
  buildCommand(serverName) {
    const config = this.getServerConfig(serverName);
    if (!config) return null;

    const { command, args } = config;
    return `${command} ${args.join(' ')}`;
  }

  /**
   * Print MCP configuration summary
   */
  printSummary() {
    console.log('\n🔷 MCP SERVER CONFIGURATION SUMMARY\n');
    console.log('═'.repeat(60));

    const servers = this.getServers();

    if (servers.length === 0) {
      console.log('ℹ️  No MCP servers configured');
      return;
    }

    servers.forEach((serverName, index) => {
      const config = this.getServerConfig(serverName);
      const validation = this.validateServer(serverName);

      console.log(`\n${index + 1}. ${serverName.toUpperCase()}`);
      console.log('─'.repeat(60));
      console.log(`   Status: ${validation.valid ? '✅ Valid' : '❌ Invalid'}`);
      console.log(`   Command: ${config.command}`);
      console.log(`   Args: ${JSON.stringify(config.args)}`);
      console.log(`   Full: ${this.buildCommand(serverName)}`);
    });

    console.log('\n' + '═'.repeat(60));
    console.log(`Total Servers: ${servers.length}`);
  }

  /**
   * Export configuration for Claude Code
   */
  exportForClaudeCode() {
    const servers = this.getServers();
    const exported = {
      totalServers: servers.length,
      servers: {}
    };

    servers.forEach(serverName => {
      const config = this.getServerConfig(serverName);
      const validation = this.validateServer(serverName);

      exported.servers[serverName] = {
        status: validation.valid ? 'ready' : 'invalid',
        command: this.buildCommand(serverName),
        config: config
      };
    });

    return exported;
  }

  /**
   * Health check all servers
   */
  healthCheck() {
    console.log('\n🔷 MCP SERVER HEALTH CHECK\n');

    const servers = this.getServers();
    const results = {
      total: servers.length,
      healthy: 0,
      unhealthy: 0,
      servers: {}
    };

    servers.forEach(serverName => {
      const validation = this.validateServer(serverName);
      const isHealthy = validation.valid;

      results.servers[serverName] = {
        status: isHealthy ? '✅ healthy' : '❌ unhealthy',
        error: validation.error || null,
        command: this.buildCommand(serverName)
      };

      if (isHealthy) {
        results.healthy++;
      } else {
        results.unhealthy++;
      }
    });

    console.log(`Total Servers: ${results.total}`);
    console.log(`Healthy: ${results.healthy}`);
    console.log(`Unhealthy: ${results.unhealthy}`);
    console.log();

    Object.entries(results.servers).forEach(([name, info]) => {
      console.log(`${name}: ${info.status}`);
      if (info.error) {
        console.log(`  Error: ${info.error}`);
      }
      console.log(`  Command: ${info.command}`);
    });

    return results;
  }

  /**
   * Generate integration code for Claude Code
   */
  generateIntegrationCode() {
    return `
// MCP Server Integration for Claude Code
// Generated: ${new Date().toISOString()}

const MCPServers = {
${this.getServers().map(serverName => {
  const config = this.getServerConfig(serverName);
  return `  ${serverName}: {
    command: '${config.command}',
    args: ${JSON.stringify(config.args)},
    startup: '${this.buildCommand(serverName)}'
  }`;
}).join(',\n')}
};

module.exports = MCPServers;
`;
  }

  /**
   * Generate environment configuration
   */
  generateEnvConfig() {
    const servers = this.getServers();
    let envContent = '# MCP Server Configuration\n';
    envContent += `# Generated: ${new Date().toISOString()}\n\n`;

    servers.forEach(serverName => {
      const config = this.getServerConfig(serverName);
      envContent += `# ${serverName.toUpperCase()}\n`;
      envContent += `MCP_${serverName.toUpperCase()}_COMMAND=${config.command}\n`;
      envContent += `MCP_${serverName.toUpperCase()}_ARGS=${config.args.join(' ')}\n\n`;
    });

    return envContent;
  }
}

// Export manager
module.exports = MCPServerManager;

// CLI Usage
if (require.main === module) {
  const manager = new MCPServerManager();

  const command = process.argv[2];

  switch (command) {
    case 'status':
      manager.printSummary();
      break;
    case 'health':
      manager.healthCheck();
      break;
    case 'export':
      console.log(JSON.stringify(manager.exportForClaudeCode(), null, 2));
      break;
    case 'integration':
      console.log(manager.generateIntegrationCode());
      break;
    case 'env':
      console.log(manager.generateEnvConfig());
      break;
    default:
      console.log('MCP Server Configuration Manager\n');
      console.log('Usage: node mcp-server-config.js <command>\n');
      console.log('Commands:');
      console.log('  status       - Show MCP server configuration');
      console.log('  health       - Run health check on all servers');
      console.log('  export       - Export configuration (JSON)');
      console.log('  integration  - Generate integration code');
      console.log('  env          - Generate environment config');
      manager.printSummary();
  }
}
