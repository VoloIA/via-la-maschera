import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as Crypto from 'expo-crypto';
import * as WebBrowser from 'expo-web-browser';
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Platform } from 'react-native';

import type { AppLanguageCode } from '@/constants/localization';
import { AppLanguage } from '@/constants/typography';
import { useSettings } from '@/contexts/settings-context';
import { clearDailyEntries } from '@/lib/daily-ritual';
import {
  firebaseAuth,
  googleClientIds,
  isFirebaseConfigured,
  isGoogleAuthConfigured,
} from '@/lib/firebase';
import { deleteRemoteAccountData } from '@/lib/remote-ritual';
import {
  deleteUser,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut as signOutFromFirebase,
  updateProfile,
  type User,
} from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

type AuthContextValue = {
  authError: string | null;
  deleteAccount: () => Promise<boolean>;
  isAuthReady: boolean;
  isAppleAuthAvailable: boolean;
  isDeletingAccount: boolean;
  isFirebaseConfigured: boolean;
  isGoogleAuthConfigured: boolean;
  isSigningIn: boolean;
  signInWithApple: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type GoogleSignIn = () => Promise<void>;

const RECENT_LOGIN_WINDOW_MS = 5 * 60 * 1000;
const nonceCharset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._';

const authErrorCopy = {
  it: {
    appleInvalidToken: 'Apple non ha fornito i dati necessari per completare l’accesso. Riprova.',
    appleSignInFailed: 'Non è stato possibile completare l’accesso con Apple. Riprova.',
    appleUnavailable: 'L’accesso con Apple non è disponibile su questo dispositivo.',
    deletionFailed: 'Non è stato possibile eliminare l’account e i dati. Riprova tra poco.',
    googleInvalidToken: 'Google non ha fornito i dati necessari per completare l’accesso. Riprova.',
    googleNotReady: 'L’accesso con Google non è ancora pronto. Riprova tra qualche istante.',
    googleOpenFailed: 'Non è stato possibile aprire l’accesso con Google. Riprova.',
    googleSignInFailed: 'Non è stato possibile completare l’accesso con Google. Riprova.',
    noAccount: 'Non c’è alcun account collegato da eliminare.',
    recentLogin: 'Per sicurezza, esci dall’account, accedi di nuovo e riprova.',
    signInUnavailable: 'L’accesso non è disponibile al momento. Riprova più tardi.',
  },
  en: {
    appleInvalidToken: 'Apple did not provide the information needed to sign you in. Try again.',
    appleSignInFailed: 'Sign-in with Apple could not be completed. Try again.',
    appleUnavailable: 'Sign-in with Apple is not available on this device.',
    deletionFailed: 'Your account and data could not be deleted. Try again shortly.',
    googleInvalidToken: 'Google did not provide the information needed to sign you in. Try again.',
    googleNotReady: 'Sign-in with Google is not ready yet. Try again in a moment.',
    googleOpenFailed: 'Sign-in with Google could not be opened. Try again.',
    googleSignInFailed: 'Sign-in with Google could not be completed. Try again.',
    noAccount: 'There is no connected account to delete.',
    recentLogin: 'For security, sign out, sign in again, and then retry.',
    signInUnavailable: 'Sign-in is currently unavailable. Try again later.',
  },
} as const;

type AuthErrorMessages = (typeof authErrorCopy)[keyof typeof authErrorCopy];

function createNonce(length = 32) {
  const randomBytes = Crypto.getRandomBytes(length);

  return Array.from(randomBytes)
    .map((byte) => nonceCharset[byte % nonceCharset.length])
    .join('');
}

function isAppleCancelError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ERR_REQUEST_CANCELED'
  );
}

function isRequiresRecentLoginError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'auth/requires-recent-login'
  );
}

function hasRecentSignIn(user: User) {
  const lastSignInTime = user.metadata.lastSignInTime;

  if (!lastSignInTime) {
    return true;
  }

  return Date.now() - Date.parse(lastSignInTime) <= RECENT_LOGIN_WINDOW_MS;
}

type GoogleAuthBridgeProps = {
  errorCopy: AuthErrorMessages;
  language: AppLanguageCode;
  onGoogleSignInReady: (nextSignIn: GoogleSignIn | null) => void;
  setAuthError: Dispatch<SetStateAction<string | null>>;
  setIsSigningIn: Dispatch<SetStateAction<boolean>>;
};

function GoogleAuthBridge({
  errorCopy,
  language,
  onGoogleSignInReady,
  setAuthError,
  setIsSigningIn,
}: GoogleAuthBridgeProps) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      androidClientId: googleClientIds.androidClientId,
      iosClientId: googleClientIds.iosClientId,
      language: language === 'it' ? AppLanguage.locale : language,
      selectAccount: true,
      webClientId: googleClientIds.webClientId,
    },
    { scheme: 'vialamaschera' }
  );

  useEffect(() => {
    if (!request) {
      onGoogleSignInReady(null);
      return undefined;
    }

    onGoogleSignInReady(async () => {
      try {
        setIsSigningIn(true);
        setAuthError(null);
        const result = await promptAsync();

        if (result.type === 'cancel' || result.type === 'dismiss') {
          setIsSigningIn(false);
        }
      } catch {
        setAuthError(errorCopy.googleOpenFailed);
        setIsSigningIn(false);
      }
    });

    return () => onGoogleSignInReady(null);
  }, [errorCopy.googleOpenFailed, onGoogleSignInReady, promptAsync, request, setAuthError, setIsSigningIn]);

  useEffect(() => {
    async function finishGoogleSignIn() {
      if (!firebaseAuth || response?.type !== 'success') {
        return;
      }

      const idToken = response.params.id_token;

      if (!idToken) {
        setAuthError(errorCopy.googleInvalidToken);
        setIsSigningIn(false);
        return;
      }

      try {
        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(firebaseAuth, credential);
        setAuthError(null);
      } catch {
        setAuthError(errorCopy.googleSignInFailed);
      } finally {
        setIsSigningIn(false);
      }
    }

    finishGoogleSignIn();
  }, [errorCopy.googleInvalidToken, errorCopy.googleSignInFailed, response, setAuthError, setIsSigningIn]);

  return null;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const { language } = useSettings();
  const errorCopy = authErrorCopy[language === 'en' ? 'en' : 'it'];
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(!firebaseAuth);
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [googleSignIn, setGoogleSignIn] = useState<GoogleSignIn | null>(null);

  const registerGoogleSignIn = useCallback((nextSignIn: GoogleSignIn | null) => {
    setGoogleSignIn(() => nextSignIn);
  }, []);

  useEffect(() => {
    if (!firebaseAuth) {
      return undefined;
    }

    return onAuthStateChanged(firebaseAuth, (nextUser) => {
      setUser(nextUser);
      setIsAuthReady(true);
    });
  }, []);

  useEffect(() => {
    let isActive = true;

    async function checkAppleAuthAvailability() {
      if (Platform.OS !== 'ios' || !isFirebaseConfigured) {
        setIsAppleAuthAvailable(false);
        return;
      }

      const isAvailable = await AppleAuthentication.isAvailableAsync();

      if (isActive) {
        setIsAppleAuthAvailable(isAvailable);
      }
    }

    checkAppleAuthAvailability();

    return () => {
      isActive = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      authError,
      deleteAccount: async () => {
        if (!firebaseAuth || !user) {
          setAuthError(errorCopy.noAccount);
          return false;
        }

        if (!hasRecentSignIn(user)) {
          setAuthError(errorCopy.recentLogin);
          return false;
        }

        try {
          setIsDeletingAccount(true);
          setAuthError(null);
          await deleteRemoteAccountData(user);
          await deleteUser(user);
          await clearDailyEntries();
          setAuthError(null);
          return true;
        } catch (error) {
          if (isRequiresRecentLoginError(error)) {
            setAuthError(errorCopy.recentLogin);
          } else {
            setAuthError(errorCopy.deletionFailed);
          }

          return false;
        } finally {
          setIsDeletingAccount(false);
        }
      },
      isAuthReady,
      isAppleAuthAvailable,
      isDeletingAccount,
      isFirebaseConfigured,
      isGoogleAuthConfigured,
      isSigningIn,
      signInWithApple: async () => {
        if (!firebaseAuth || !isAppleAuthAvailable) {
          setAuthError(errorCopy.appleUnavailable);
          return;
        }

        try {
          setIsSigningIn(true);
          setAuthError(null);

          const rawNonce = createNonce();
          const hashedNonce = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            rawNonce
          );
          const appleCredential = await AppleAuthentication.signInAsync({
            nonce: hashedNonce,
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });

          if (!appleCredential.identityToken) {
            setAuthError(errorCopy.appleInvalidToken);
            return;
          }

          const provider = new OAuthProvider('apple.com');
          const credential = provider.credential({
            idToken: appleCredential.identityToken,
            rawNonce,
          });
          const userCredential = await signInWithCredential(firebaseAuth, credential);
          const displayName = appleCredential.fullName
            ? AppleAuthentication.formatFullName(appleCredential.fullName).trim()
            : '';

          if (displayName && !userCredential.user.displayName) {
            await updateProfile(userCredential.user, { displayName });
          }

          setAuthError(null);
        } catch (error) {
          if (!isAppleCancelError(error)) {
            setAuthError(errorCopy.appleSignInFailed);
          }
        } finally {
          setIsSigningIn(false);
        }
      },
      signInWithGoogle: async () => {
        if (!firebaseAuth || !isGoogleAuthConfigured) {
          setAuthError(errorCopy.signInUnavailable);
          return;
        }

        if (!googleSignIn) {
          setAuthError(errorCopy.googleNotReady);
          return;
        }

        await googleSignIn();
      },
      signOut: async () => {
        if (firebaseAuth) {
          await signOutFromFirebase(firebaseAuth);
        }
      },
      user,
    }),
    [authError, errorCopy, googleSignIn, isAppleAuthAvailable, isAuthReady, isDeletingAccount, isSigningIn, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {isGoogleAuthConfigured ? (
        <GoogleAuthBridge
          errorCopy={errorCopy}
          language={language}
          onGoogleSignInReady={registerGoogleSignIn}
          setAuthError={setAuthError}
          setIsSigningIn={setIsSigningIn}
        />
      ) : null}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve essere usato dentro AuthProvider.');
  }

  return context;
}
