export interface ChatPlatform {
  id: string;
  name: string;
  url: string;
  color: string;
  icon: string;
  enabled: boolean;
}

export interface ChatConfig {
  platforms: Record<string, ChatPlatform>;
  showTooltip: boolean;
  tooltipDelay: number; // seconds
  pulseDuration: number; // seconds
}

// Default configuration
export const defaultChatConfig: ChatConfig = {
  platforms: {
    line: {
      id: 'line',
      name: 'LINE',
      url: '@sakww', // LINE Official Account ID
      color: 'green',
      icon: '/line-logo.png',
      enabled: true,
    },
    telegram: {
      id: 'telegram',
      name: 'Telegram',
      url: 'https://t.me/yourusername',
      color: 'blue',
      icon: '/telegram-logo.png',
      enabled: false,
    },
    messenger: {
      id: 'messenger',
      name: 'Messenger',
      url: 'https://m.me/yourpage',
      color: 'indigo',
      icon: '/messenger-logo.png',
      enabled: false,
    },
    call: {
      id: 'call',
      name: 'Call',
      url: 'tel:+6621234567',
      color: 'black',
      icon: '/call-logo.png',
      enabled: false,
    },
  },
  showTooltip: true,
  tooltipDelay: 3,
  pulseDuration: 5,
};

// Fetch config from WordPress REST API
export async function getChatConfig(): Promise<ChatConfig> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL?.replace('/graphql', '') || 'http://localhost:8006';
    const response = await fetch(`${baseUrl}/wp-json/sakwood/v1/chat`);

    if (!response.ok) {
      console.error('Failed to fetch chat config:', response.status);
      return defaultChatConfig;
    }

    const data = await response.json();

    // Transform the data to match our interface
    // Add id field and default icons to each platform from the WordPress data
    const platforms = data.platforms || {};
    const defaultIcons: Record<string, string> = {
      line: '/line-logo.png',
      telegram: '/telegram-logo.png',
      messenger: '/msg-logo.png',
      call: '/call-logo.png',
    };

    const platformsWithIds = Object.fromEntries(
      Object.entries(platforms).map(([key, platform]: [string, any]) => [
        key,
        {
          ...platform,
          id: key, // Use the platform key as the id
          name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
          icon: platform.icon || defaultIcons[key] || '', // Use default icon if empty
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
    console.error('Error fetching chat config:', error);
    return defaultChatConfig;
  }
}

// Get enabled platforms as array
export function getEnabledPlatforms(config: ChatConfig): ChatPlatform[] {
  return Object.values(config.platforms).filter((p) => p.enabled);
}
