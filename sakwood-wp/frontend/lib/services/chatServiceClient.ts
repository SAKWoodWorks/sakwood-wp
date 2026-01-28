/**
 * ============================================================================
 * CLIENT-SIDE CHAT CONFIGURATION SERVICE
 * ============================================================================
 *
 * WHAT THIS FILE DOES:
 * - Fetches chat platform settings (LINE, Telegram, Messenger, etc.) from WordPress
 * - Runs in the browser (client-side) to avoid mobile compatibility issues
 * - Falls back to default settings if WordPress is unreachable
 *
 * WHY WE CREATED THIS:
 * - Server-side code can't access WordPress directly from mobile browsers
 * - Mobile devices can't reach localhost:8006 (WordPress Docker container)
 * - This service prevents the chat button from breaking
 *
 * CHANGES MADE (2025-01-28):
 * - Created this new client-side service
 * - Added error handling with fallback to defaults
 * - Updated ChatButtons.tsx to use this instead of server-side function
 * ============================================================================
 */

import { defaultChatConfig, type ChatConfig } from '@/lib/config/chatConfig';

/**
 * Fetch chat settings from WordPress
 *
 * PROCESS FLOW:
 * 1. Build WordPress API URL from environment variables
 * 2. Try to fetch chat configuration from WordPress
 * 3. If fetch fails, use default configuration (LINE @sakww)
 * 4. Transform WordPress data to match our TypeScript interface
 *
 * @returns ChatConfig object with platform settings
 */
export async function getChatConfigClient(): Promise<ChatConfig> {
  try {
    // Step 1: Get WordPress URL from environment or use localhost default
    const graphqlUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'http://localhost:8006/graphql';
    const baseUrl = graphqlUrl.replace('/graphql', '');
    const apiUrl = `${baseUrl}/wp-json/sakwood/v1/chat`;

    // Step 2: Fetch chat settings from WordPress REST API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Don't cache - always get fresh settings
    });

    // Step 3: If WordPress is down/unreachable, use default settings
    if (!response.ok) {
      console.warn('[ChatService] Unable to fetch chat config, using defaults:', response.status);
      return defaultChatConfig; // Falls back to LINE @sakww (defined in chatConfig.ts)
    }

    // Step 4: Parse WordPress response
    const data = await response.json();

    // Step 5: Transform WordPress data to match our ChatConfig interface
    const platforms = data.platforms || {};
    const defaultIcons: Record<string, string> = {
      line: '/line-logo.png',
      telegram: '/telegram-logo.png',
      messenger: '/msg-logo.png',
      call: '/call-logo.png',
    };

    // Convert WordPress platform data to our format
    const platformsWithIds = Object.fromEntries(
      Object.entries(platforms).map(([key, platform]: [string, any]) => [
        key,
        {
          ...platform,
          id: key, // Use platform name as ID (line, telegram, etc.)
          name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize: line -> Line
          icon: platform.icon || defaultIcons[key] || '', // Use default icon if missing
        },
      ])
    );

    return {
      platforms: platformsWithIds,
      showTooltip: data.show_tooltip ?? true,
      tooltipDelay: data.tooltip_delay ?? 3,
      pulseDuration: data.pulse_duration ?? 5,
    };
  } catch (error) {
    // If anything goes wrong (network error, invalid data, etc.), use defaults
    // This ensures the chat button ALWAYS works, even if WordPress is down
    console.warn('[ChatService] Error fetching chat config, using defaults:', error);
    return defaultChatConfig;
  }
}
