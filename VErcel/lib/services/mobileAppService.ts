/**
 * Mobile App Integration Service
 * Handles deep linking and mobile app communication
 */

export interface MobileAppConfig {
  deepLinkScheme: string;
  appStoreLinks: {
    ios: string;
    android: string;
  };
  webFallbackUrl: string;
}

export interface ElectionDeepLink {
  electionId: string;
  electionTitle: string;
  deepLink: string;
  qrCodeData: string;
  webUrl: string;
}

class MobileAppService {
  private config: MobileAppConfig;

  constructor() {
    this.config = {
      deepLinkScheme: 'votingapp',
      appStoreLinks: {
        ios: 'https://apps.apple.com/app/your-voting-app', // Replace with actual iOS app link
        android: 'https://play.google.com/store/apps/details?id=com.yourapp.voting' // Replace with actual Android app link
      },
      webFallbackUrl: 'https://yourapp.com' // Replace with actual web app URL
    };
  }

  /**
   * Generate deep link for election voting
   */
  generateElectionDeepLink(electionId: string, electionTitle: string): ElectionDeepLink {
    const deepLink = `${this.config.deepLinkScheme}://vote/election/${electionId}`;
    const webUrl = `${this.config.webFallbackUrl}/vote/${electionId}`;
    
    return {
      electionId,
      electionTitle,
      deepLink,
      qrCodeData: deepLink,
      webUrl
    };
  }

  /**
   * Detect user's platform and return appropriate app store link
   */
  getAppStoreLink(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      return this.config.appStoreLinks.ios;
    } else if (userAgent.includes('android')) {
      return this.config.appStoreLinks.android;
    } else {
      // For desktop, return both options or default to Android
      return this.config.appStoreLinks.android;
    }
  }

  /**
   * Check if mobile app is installed (basic detection)
   */
  async isMobileAppInstalled(): Promise<boolean> {
    try {
      // Try to open the deep link
      const testLink = `${this.config.deepLinkScheme}://test`;
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = testLink;
      document.body.appendChild(iframe);
      
      // Wait a bit to see if the app opens
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clean up
      document.body.removeChild(iframe);
      
      // If we're still here, the app probably didn't open
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Attempt to open mobile app with deep link
   */
  async openMobileApp(deepLink: string): Promise<boolean> {
    try {
      // Try to open the deep link
      window.location.href = deepLink;
      
      // Wait a bit to see if the app opens
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // If we're still here, the app probably didn't open
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Show mobile app installation prompt
   */
  showInstallPrompt(): void {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = userAgent.includes('iphone') || userAgent.includes('ipad');
    const isAndroid = userAgent.includes('android');
    
    if (isIOS) {
      alert('To vote securely, please download our mobile app from the App Store.');
      window.open(this.config.appStoreLinks.ios, '_blank');
    } else if (isAndroid) {
      alert('To vote securely, please download our mobile app from Google Play Store.');
      window.open(this.config.appStoreLinks.android, '_blank');
    } else {
      // Desktop - show both options
      const choice = confirm(
        'To vote securely, please download our mobile app.\n\n' +
        'Click OK for iOS App Store\n' +
        'Click Cancel for Google Play Store'
      );
      
      if (choice) {
        window.open(this.config.appStoreLinks.ios, '_blank');
      } else {
        window.open(this.config.appStoreLinks.android, '_blank');
      }
    }
  }

  /**
   * Copy deep link to clipboard
   */
  async copyDeepLink(deepLink: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(deepLink);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate QR code data URL for deep link
   */
  async generateQRCode(deepLink: string): Promise<string> {
    try {
      // Dynamic import to avoid SSR issues
      const QRCode = (await import('qrcode')).default;
      return await QRCode.toDataURL(deepLink, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get mobile app download instructions
   */
  getDownloadInstructions(): {
    title: string;
    steps: string[];
    appStoreLinks: { ios: string; android: string };
  } {
    return {
      title: 'Download Mobile App to Vote',
      steps: [
        '1. Download the mobile app from your device\'s app store',
        '2. Open the app and log in with your credentials',
        '3. Navigate to the election you want to vote in',
        '4. Complete your vote securely with biometric authentication',
        '5. Return to the web app to view results and track your vote'
      ],
      appStoreLinks: this.config.appStoreLinks
    };
  }
}

export const mobileAppService = new MobileAppService();
