import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { type User } from 'firebase/auth';

import { COMMUNITY_TERMS_VERSION } from '@/constants/community-rules';
import {
  CONTENT_MODERATION_VERSION,
  moderateSharedAnswer,
} from '@/lib/content-moderation';
import { type DailyEntry, sortEntries } from '@/lib/daily-ritual';
import { firestoreDb } from '@/lib/firebase';

export type SharedAnswer = {
  answer: string;
  createdAt: number;
  dateKey: string;
  id: string;
  initials: string;
  questionKey: string;
  authorId?: string;
};

function getInitials(user: User) {
  const source = user.displayName?.trim() || user.email?.split('@')[0] || 'Anonimo';
  const pieces = source
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);

  if (pieces.length === 0) {
    return 'A';
  }

  return pieces
    .slice(0, 2)
    .map((piece) => piece[0])
    .join('')
    .toLocaleUpperCase('it-IT');
}

function shuffleAnswers(answers: SharedAnswer[]) {
  return [...answers].sort(() => Math.random() - 0.5);
}

export async function saveRemoteDailyEntry(user: User, entry: DailyEntry) {
  if (!firestoreDb) {
    return;
  }

  const initials = getInitials(user);
  const publicAnswerId = `${user.uid}_${entry.dateKey}`;
  const publicAnswerRef = doc(firestoreDb, 'questions', entry.questionKey, 'answers', publicAnswerId);
  const batch = writeBatch(firestoreDb);
  const moderation: ReturnType<typeof moderateSharedAnswer> = entry.shareWithCommunity
    ? moderateSharedAnswer(entry.answer)
    : { allowed: true };

  if (!moderation.allowed) {
    throw new Error(`shared-answer-filtered:${moderation.reason}`);
  }

  batch.set(
    doc(firestoreDb, 'users', user.uid),
    {
      displayName: user.displayName ?? null,
      email: user.email ?? null,
      initials,
      lastSeenAt: serverTimestamp(),
      uid: user.uid,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  batch.set(doc(firestoreDb, 'users', user.uid, 'entries', entry.id), {
    ...entry,
    syncedAt: serverTimestamp(),
    uid: user.uid,
  });

  batch.set(
    doc(firestoreDb, 'users', user.uid, 'answeredQuestions', entry.questionKey),
    {
      lastAnsweredAt: serverTimestamp(),
      question: entry.question,
      questionKey: entry.questionKey,
      shared: entry.shareWithCommunity,
      sharedAt: entry.shareWithCommunity ? serverTimestamp() : null,
      termsVersion: entry.shareWithCommunity ? COMMUNITY_TERMS_VERSION : null,
    },
    { merge: true }
  );

  if (entry.shareWithCommunity) {
    batch.set(publicAnswerRef, {
      answer: entry.answer,
      createdAt: entry.createdAt,
      dateKey: entry.dateKey,
      initials,
      moderationStatus: 'visible',
      moderationVersion: CONTENT_MODERATION_VERSION,
      pathId: entry.pathId,
      question: entry.question,
      questionKey: entry.questionKey,
      shareWithCommunity: true,
      termsVersion: COMMUNITY_TERMS_VERSION,
      uid: user.uid,
      updatedAt: serverTimestamp(),
    });
  } else {
    batch.delete(publicAnswerRef);
  }

  await batch.commit();
}

export async function loadRemoteDailyEntries(userId: string) {
  if (!firestoreDb) {
    return [];
  }

  const snapshot = await getDocs(
    query(collection(firestoreDb, 'users', userId, 'entries'), orderBy('createdAt', 'desc'), limit(100))
  );

  return sortEntries(
    snapshot.docs.map((entryDoc) => {
      const data = entryDoc.data() as DailyEntry;

      return {
        ...data,
        id: data.id ?? entryDoc.id,
      };
    })
  );
}

export async function loadSharedAnswersForEntry(userId: string, entry: DailyEntry) {
  if (!firestoreDb) {
    return [];
  }

  const blockedUsersSnapshot = await getDocs(collection(firestoreDb, 'users', userId, 'blockedUsers'));
  const blockedUserIds = new Set(blockedUsersSnapshot.docs.map((blockedUserDoc) => blockedUserDoc.id));

  const snapshot = await getDocs(
    query(
      collection(firestoreDb, 'questions', entry.questionKey, 'answers'),
      orderBy('createdAt', 'desc'),
      limit(40)
    )
  );

  const sharedAnswers = snapshot.docs
    .map((answerDoc) => {
      const data = answerDoc.data() as SharedAnswer & {
        moderationStatus?: string;
        uid?: string;
      };

      return {
        answer: data.answer,
        authorId: data.uid,
        createdAt: data.createdAt,
        dateKey: data.dateKey,
        id: answerDoc.id,
        initials: data.initials,
        moderationStatus: data.moderationStatus,
        questionKey: entry.questionKey,
      };
    })
    .filter((answer) => answer.authorId !== userId)
    .filter((answer) => !answer.authorId || !blockedUserIds.has(answer.authorId))
    .filter((answer) => answer.moderationStatus !== 'removed')
    .map(({ moderationStatus: _moderationStatus, ...answer }) => answer);

  return shuffleAnswers(sharedAnswers).slice(0, 3);
}

export async function reportSharedAnswer(user: User, answer: SharedAnswer) {
  if (!firestoreDb) {
    return;
  }

  const reportId = `${answer.questionKey}_${answer.id}_${user.uid}`;

  await writeBatch(firestoreDb)
    .set(doc(firestoreDb, 'reports', reportId), {
      answerId: answer.id,
      answerInitials: answer.initials,
      answerText: answer.answer,
      authorUid: answer.authorId ?? null,
      createdAt: serverTimestamp(),
      dateKey: answer.dateKey,
      questionKey: answer.questionKey,
      reporterUid: user.uid,
      status: 'open',
      type: 'report',
    })
    .commit();
}

export async function blockSharedAnswerAuthor(user: User, answer: SharedAnswer) {
  if (!firestoreDb || !answer.authorId) {
    return;
  }

  const reportId = `${answer.questionKey}_${answer.id}_${user.uid}_block`;
  const batch = writeBatch(firestoreDb);

  batch.set(doc(firestoreDb, 'users', user.uid, 'blockedUsers', answer.authorId), {
    answerId: answer.id,
    blockedAt: serverTimestamp(),
    blockedUid: answer.authorId,
    questionKey: answer.questionKey,
  });

  batch.set(doc(firestoreDb, 'reports', reportId), {
    answerId: answer.id,
    answerInitials: answer.initials,
    answerText: answer.answer,
    authorUid: answer.authorId,
    createdAt: serverTimestamp(),
    dateKey: answer.dateKey,
    questionKey: answer.questionKey,
    reporterUid: user.uid,
    status: 'open',
    type: 'block',
  });

  await batch.commit();
}
