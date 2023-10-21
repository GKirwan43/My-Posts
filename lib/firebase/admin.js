import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
    credential: cert(process.env.FIREBASE_SECRET_KEY)
}

export default function getFirebaseAuth() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }

    return getAuth(getApp());
}