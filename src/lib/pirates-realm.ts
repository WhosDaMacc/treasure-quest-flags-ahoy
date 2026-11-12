// Pirates Realm opt-in score sharing.
//
// When the player opts in (Profile page), each completed challenge posts one
// row to the shared Supabase leaderboard so the score also shows up in the
// Pirates Realm inside Ice Wall. Posting is fire-and-forget: a failure only
// logs to the console and never blocks gameplay.
//
// The publishable key below is designed for client-side use. No database
// password or secret/service key is used anywhere here.

const SUPABASE_URL = 'https://tfoxlkxdsxpqnnmqbaob.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_7rF6rzVF5vyEcCxQfkqZ5Q_3OILDalA';

export const PIRATES_REALM_SHARE_KEY = 'treasure-quest-share-pirates';
export const PIRATES_REALM_TOTAL_POINTS_KEY = 'treasure-quest-total-points';
// Matches the Total Points value the Profile page showed before scores were
// tracked for real, so existing players start from the displayed total.
export const PIRATES_REALM_DEFAULT_TOTAL_POINTS = 1250;

export const PIRATES_REALM_FALLBACK_PLAYER_NAME = 'Anonymous Hunter';

export function isPiratesRealmSharingEnabled(): boolean {
  try {
    return localStorage.getItem(PIRATES_REALM_SHARE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setPiratesRealmSharingEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(PIRATES_REALM_SHARE_KEY, enabled ? 'true' : 'false');
  } catch {
    // Sharing preference could not be saved; gameplay is unaffected.
  }
}

/** The player's running total points, persisted across sessions. */
export function getTotalPoints(): number {
  try {
    const stored = localStorage.getItem(PIRATES_REALM_TOTAL_POINTS_KEY);
    const parsed = stored === null ? NaN : parseInt(stored, 10);
    return Number.isFinite(parsed) ? parsed : PIRATES_REALM_DEFAULT_TOTAL_POINTS;
  } catch {
    return PIRATES_REALM_DEFAULT_TOTAL_POINTS;
  }
}

/** Adds points from a completed challenge to the running total and returns the new total. */
export function addPointsToTotal(points: number): number {
  const nextTotal = getTotalPoints() + points;
  try {
    localStorage.setItem(PIRATES_REALM_TOTAL_POINTS_KEY, String(nextTotal));
  } catch {
    // Total could not be saved; the score is still shared below.
  }
  return nextTotal;
}

/** Posts one leaderboard entry. Never throws; failures are console-only. */
export async function shareScoreToPiratesRealm(
  playerName: string,
  score: number
): Promise<void> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard_entries`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        player_name: playerName || PIRATES_REALM_FALLBACK_PLAYER_NAME,
        player_type: 'hunter',
        realm: 'treasure-quest',
        score,
      }),
    });
    if (!response.ok) {
      console.warn('[Pirates Realm] Score share failed:', response.status);
    }
  } catch (error) {
    console.warn('[Pirates Realm] Score share failed:', error);
  }
}
