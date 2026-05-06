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

import { AppLanguage } from '@/constants/typography';
import {
  firebaseAuth,
  googleClientIds,
  isFirebaseConfigured,
  isGoogleAuthConfigured,
} from '@/lib/firebase';
import {
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
  isAuthReady: boolean;
  isAppleAuthAvailable: boolean;
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

const nonceCharset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._';

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

type GoogleAuthBridgeProps = {
  onGoogleSignInReady: (nextSignIn: GoogleSignIn | null) => void;
  setAuthError: Dispatch<SetStateAction<string | null>>;
  setIsSigningIn: Dispatch<SetStateAction<boolean>>;
};

function GoogleAuthBridge({
  onGoogleSignInReady,
  setAuthError,
  setIsSigningIn,
}: GoogleAuthBridgeProps) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      androidClientId: googleClientIds.androidClientId,
      iosClientId: googleClientIds.iosClientId,
      language: AppLanguage.locale,
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
        setAuthError('Non sono riuscito ad aprire l’accesso con Google.');
        setIsSigningIn(false);
      }
    });

    return () => onGoogleSignInReady(null);
  }, [onGoogleSignInReady, promptAsync, request, setAuthError, setIsSigningIn]);

  useEffect(() => {
    async function finishGoogleSignIn() {
      if (!firebaseAuth || response?.type !== 'success') {
        return;
      }

      const idToken = response.params.id_token;

      if (!idToken) {
        setAuthError('Google non ha restituito un token valido.');
        setIsSigningIn(false);
        return;
      }

      try {
        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(firebaseAuth, credential);
        setAuthError(null);
      } catch {
        setAuthError('Non sono riuscito a completare l’accesso con Google.');
      } finally {
        setIsSigningIn(false);
      }
    }

    finishGoogleSignIn();
  }, [response, setAuthError, setIsSigningIn]);

  return null;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(!firebaseAuth);
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
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
      isAuthReady,
      isAppleAuthAvailable,
      isFirebaseConfigured,
      isGoogleAuthConfigured,
      isSigningIn,
      signInWithApple: async () => {
        if (!firebaseAuth || !isAppleAuthAvailable) {
          setAuthError('Accesso Apple non disponibile su questo dispositivo.');
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
            setAuthError('Apple non ha restituito un token valido.');
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
            setAuthError('Non sono riuscito a completare l’accesso con Apple.');
          }
        } finally {
          setIsSigningIn(false);
        }
      },
      signInWithGoogle: async () => {
        if (!firebaseAuth || !isGoogleAuthConfigured) {
          setAuthError('Configura Firebase e il client Google prima di usare l’accesso.');
          return;
        }

        if (!googleSignIn) {
          setAuthError('Accesso Google non ancora pronto. Riprova tra qualche istante.');
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
    [authError, googleSignIn, isAppleAuthAvailable, isAuthReady, isSigningIn, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {isGoogleAuthConfigured ? (
        <GoogleAuthBridge
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
