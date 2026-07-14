import { LegalPage } from '@/components/legal-page';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { legalCopy } from '@/constants/legal';
import { type AppLanguageCode } from '@/constants/localization';
import { BrandColors, BrandRadii, BrandSpacing } from '@/constants/brand';
import { useAuth } from '@/contexts/auth-context';
import { useSettings } from '@/contexts/settings-context';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

const deletionActionCopy: Record<
  AppLanguageCode,
  {
    confirm: string;
    confirming: string;
    confirmText: string;
    delete: string;
    deleting: string;
    signedInText: string;
    signedInTitle: string;
    signedOutText: string;
    signedOutTitle: string;
    success: string;
  }
> = {
  it: {
    confirm: 'Conferma eliminazione',
    confirming: 'Tocca di nuovo per confermare. L’eliminazione non può essere annullata.',
    confirmText:
      'Verranno eliminati il tuo account, l’archivio online, le risposte condivise e i dati salvati su questo dispositivo.',
    delete: 'Elimina account e dati',
    deleting: 'Eliminazione in corso…',
    signedInText:
      'Hai effettuato l’accesso. Puoi eliminare l’account e i dati direttamente da questa pagina.',
    signedInTitle: 'Elimina dall’app',
    signedOutText:
      'Non c’è alcun account online collegato. Se hai creato un account, accedi dal Profilo e torna qui per eliminarlo.',
    signedOutTitle: 'Nessun account online collegato',
    success: 'Account e dati eliminati. Anche le risposte salvate su questo dispositivo sono state rimosse.',
  },
  en: {
    confirm: 'Confirm deletion',
    confirming: 'Tap again to confirm. Deletion cannot be undone.',
    confirmText:
      'This will delete your account, online archive, shared answers, and data saved on this device.',
    delete: 'Delete account and data',
    deleting: 'Deleting…',
    signedInText:
      'You are signed in. You can delete your account and data directly from this page.',
    signedInTitle: 'Delete in the app',
    signedOutText:
      'No online account is connected. If you created an account, sign in from Profile and return here to delete it.',
    signedOutTitle: 'No online account connected',
    success: 'Your account and data were deleted. Answers saved on this device were also removed.',
  },
  uk: {
    confirm: 'Підтвердити видалення',
    confirming: 'Торкнися ще раз для підтвердження. Цю дію не можна скасувати.',
    confirmText:
      'Кнопка видаляє акаунт додатка, хмарний архів, спільні відповіді й локальні дані на цьому пристрої.',
    delete: 'Видалити акаунт і дані',
    deleting: 'Видалення...',
    signedInText:
      'Ти увійшов. Можна завершити видалення тут, без email і звернення до підтримки.',
    signedInTitle: 'Видалення в додатку',
    signedOutText:
      'Хмарний акаунт не підключено. Якщо акаунт був створений, увійди з Профілю і повернися сюди для видалення.',
    signedOutTitle: 'Акаунт не підключено',
    success: 'Акаунт і дані видалено. Локальні відповіді прибрано з цього пристрою.',
  },
  ru: {
    confirm: 'Подтвердить удаление',
    confirming: 'Нажми ещё раз для подтверждения. Это действие нельзя отменить.',
    confirmText:
      'Кнопка удаляет аккаунт приложения, облачный архив, общие ответы и локальные данные на этом устройстве.',
    delete: 'Удалить аккаунт и данные',
    deleting: 'Удаление...',
    signedInText:
      'Ты вошёл в аккаунт. Удаление можно завершить здесь, без email и обращения в поддержку.',
    signedInTitle: 'Удаление в приложении',
    signedOutText:
      'Облачный аккаунт не подключён. Если аккаунт был создан, войди из Профиля и вернись сюда для удаления.',
    signedOutTitle: 'Аккаунт не подключён',
    success: 'Аккаунт и данные удалены. Локальные ответы удалены с этого устройства.',
  },
  es: {
    confirm: 'Confirmar eliminación',
    confirming: 'Toca de nuevo para confirmar. Esta acción no se puede deshacer.',
    confirmText:
      'El botón elimina tu cuenta de la app, archivo cloud, respuestas compartidas y datos locales guardados en este dispositivo.',
    delete: 'Eliminar cuenta y datos',
    deleting: 'Eliminando...',
    signedInText:
      'Has iniciado sesión. Puedes completar la eliminación aquí sin enviar email ni contactar soporte.',
    signedInTitle: 'Eliminación en la app',
    signedOutText:
      'No hay una cuenta cloud conectada. Si creaste una cuenta, entra desde Perfil y vuelve aquí para eliminarla.',
    signedOutTitle: 'Ninguna cuenta conectada',
    success: 'Cuenta y datos eliminados. Las respuestas locales se eliminaron de este dispositivo.',
  },
};

export default function DeleteAccountScreen() {
  const { language } = useSettings();
  const { authError, deleteAccount, isDeletingAccount, user } = useAuth();
  const content = legalCopy[language];
  const actionCopy = deletionActionCopy[language];
  const [isConfirming, setIsConfirming] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    if (!user || isDeletingAccount) {
      return;
    }

    if (!isConfirming) {
      setIsConfirming(true);
      setStatusMessage(actionCopy.confirming);
      return;
    }

    setStatusMessage(null);
    const didDelete = await deleteAccount();

    if (didDelete) {
      setIsConfirming(false);
      setStatusMessage(actionCopy.success);
    }
  };

  return (
    <LegalPage
      backLabel={content.backToProfile}
      intro={content.dataDeletion.intro}
      kicker={content.dataDeletion.kicker}
      sections={content.dataDeletion.sections}
      title={content.dataDeletion.title}
      updated={content.dataDeletion.updated}>
      <ThemedView style={styles.actionPanel}>
        <ThemedText type="subtitle">
          {user ? actionCopy.signedInTitle : actionCopy.signedOutTitle}
        </ThemedText>
        <ThemedText style={styles.mutedText}>
          {user ? actionCopy.signedInText : actionCopy.signedOutText}
        </ThemedText>
        {user ? <ThemedText style={styles.mutedText}>{actionCopy.confirmText}</ThemedText> : null}
        {user ? (
          <Pressable
            accessibilityRole="button"
            disabled={isDeletingAccount}
            onPress={handleDeleteAccount}
            style={[
              styles.deleteButton,
              isConfirming ? styles.deleteButtonConfirm : undefined,
              isDeletingAccount ? styles.deleteButtonDisabled : undefined,
            ]}>
            <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.deleteButtonText}>
              {isDeletingAccount
                ? actionCopy.deleting
                : isConfirming
                  ? actionCopy.confirm
                  : actionCopy.delete}
            </ThemedText>
          </Pressable>
        ) : null}
        {statusMessage ? <ThemedText style={styles.statusText}>{statusMessage}</ThemedText> : null}
        {authError ? <ThemedText style={styles.errorText}>{authError}</ThemedText> : null}
      </ThemedView>
    </LegalPage>
  );
}

const styles = StyleSheet.create({
  actionPanel: {
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.borderStrong,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.sm,
    padding: BrandSpacing.lg,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: BrandColors.rose,
    borderRadius: BrandRadii.control,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  deleteButtonConfirm: {
    backgroundColor: '#8F2E47',
  },
  deleteButtonDisabled: {
    backgroundColor: '#BFA5AD',
  },
  deleteButtonText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  errorText: {
    color: BrandColors.rose,
  },
  mutedText: {
    color: BrandColors.muted,
  },
  statusText: {
    color: BrandColors.teal,
  },
});
