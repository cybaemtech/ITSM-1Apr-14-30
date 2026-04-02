import { useRef, useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
  Platform,
  Alert,
  Text,
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import NetInfo from '@react-native-community/netinfo';

SplashScreen.preventAutoHideAsync();

const APP_URL = 'https://itsm.cybaemtech.app';
const BRAND_BLUE = '#1e40af';

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: true }
        );
        return true;
      });
      return () => backHandler.remove();
    }
  }, [canGoBack]);

  const onAppReady = useCallback(async () => {
    setAppReady(true);
    await SplashScreen.hideAsync();
  }, []);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    if (!appReady) {
      onAppReady();
    }
  };

  const handleError = () => {
    setIsLoading(false);
    if (!appReady) {
      onAppReady();
    }
  };

  if (isOffline) {
    return (
      <View style={styles.offlineContainer}>
        <StatusBar style="light" backgroundColor={BRAND_BLUE} />
        <Text style={styles.offlineIcon}>📡</Text>
        <Text style={styles.offlineTitle}>No Internet Connection</Text>
        <Text style={styles.offlineText}>
          Please check your network and try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={BRAND_BLUE} />

      <WebView
        ref={webViewRef}
        source={{ uri: APP_URL }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsBackForwardNavigationGestures={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        pullToRefreshEnabled={true}
        cacheEnabled={true}
        startInLoadingState={false}
        mixedContentMode="always"
        userAgent="Mozilla/5.0 (Mobile; CybaemITSM/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={BRAND_BLUE} />
          <Text style={styles.loadingText}>Loading ITSM Portal...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_BLUE,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    color: BRAND_BLUE,
    fontSize: 16,
    fontWeight: '500',
  },
  offlineContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 12,
  },
  offlineIcon: {
    fontSize: 64,
    marginBottom: 8,
  },
  offlineTitle: {
    color: '#1e293b',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  offlineText: {
    color: '#64748b',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
