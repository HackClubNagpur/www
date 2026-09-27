/**
 * Discord login for Hack Club Nagpur.
 *
 * Secrets live in `.env` (never committed — see `.env.example`):
 *   VITE_DISCORD_CLIENT_ID   from Discord Developer Portal → OAuth2
 *   VITE_DISCORD_WEBHOOK_URL full webhook URL from Server Settings → Integrations
 *   VITE_INBOX_EMAIL         where join mails go
 *
 * In the Discord portal → OAuth2 → Redirects, list these exact URLs
 * (trailing slash matters):
 *   http://localhost:3000/            (for testing)
 *   https://<your-deployed-domain>/    (for the live site)
 *
 * NOTE: Vite bakes VITE_* values into the public JS bundle, so `.env`
 * keeps secrets out of the git repo — not out of the browser. Anyone
 * opening the live site can still read the webhook URL from the code.
 * If spam ever appears: regenerate the token in Discord and update `.env`.
 * The real fix, when the club grows, is moving the webhook call server-side.
 *
 * HOW IT WORKS: popup → Discord authorize (identify + email scopes) →
 * back to the site with a code → PKCE token exchange (no secret needed,
 * nothing to leak) → verified email + username → forwarded to the inbox.
 *
 * If Discord ever rejects the PKCE exchange, the escape hatch is a ~20 line
 * Cloudflare Worker that swaps the code server-side: set TOKEN_EXCHANGE_URL
 * to the worker URL and this module will use it instead.
 */

export const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID ?? '';
export const INBOX_EMAIL = import.meta.env.VITE_INBOX_EMAIL ?? '';

/** Discord user ID that gets pinged on every new join (not a secret). */
export const ADMIN_PING_ID = import.meta.env.VITE_ADMIN_PING_ID ?? '1269984634771607616';
export const TOKEN_EXCHANGE_URL = '';

/** New-member alerts go to Discord through the "mails" webhook: embed + <@USERID> ping. */
export const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL ?? '';

/** One join per browser: remembers a successful signup so it can't be repeated. */
const MEMBER_KEY = 'hcn-member';

export function loadMember(): { username: string } | null {
  try {
    const raw = localStorage.getItem(MEMBER_KEY);
    return raw ? (JSON.parse(raw) as { username: string }) : null;
  } catch {
    return null;
  }
}

export function saveMember(user: DiscordUser): void {
  try {
    localStorage.setItem(MEMBER_KEY, JSON.stringify({ username: user.username, at: Date.now() }));
  } catch {
    /* private mode — the guard just won't stick */
  }
}

export interface DiscordUser {
  id: string;
  username: string;
  email: string | null;
}

export const isLoginConfigured = DISCORD_CLIENT_ID.trim().length > 0;

const b64url = (bytes: Uint8Array): string => {
  let s = '';
  bytes.forEach((b) => {
    s += String.fromCharCode(b);
  });
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const randomVerifier = (): string => {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);
  return b64url(bytes);
};

const codeChallenge = async (verifier: string): Promise<string> => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return b64url(new Uint8Array(digest));
};

export type LoginErrorCode =
  | 'unconfigured'
  | 'popup-blocked'
  | 'cancelled'
  | 'denied'
  | 'timeout'
  | 'exchange-failed'
  | 'profile-failed';

export class LoginError extends Error {
  code: LoginErrorCode;
  constructor(code: LoginErrorCode) {
    super(code);
    this.code = code;
  }
}

export async function loginWithDiscord(): Promise<DiscordUser> {
  if (!isLoginConfigured) throw new LoginError('unconfigured');

  const verifier = randomVerifier();
  const challenge = await codeChallenge(verifier);
  const redirectUri = `${window.location.origin}/`;
  const authUrl =
    'https://discord.com/oauth2/authorize' +
    `?client_id=${encodeURIComponent(DISCORD_CLIENT_ID)}` +
    '&response_type=code' +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent('identify email')}` +
    `&code_challenge=${challenge}` +
    '&code_challenge_method=S256' +
    '&prompt=consent';

  const popup = window.open(authUrl, 'discord-login', 'width=520,height=720');
  if (!popup) throw new LoginError('popup-blocked');

  const code = await new Promise<string>((resolve, reject) => {
    const started = Date.now();
    const timer = window.setInterval(() => {
      try {
        if (popup.closed) {
          window.clearInterval(timer);
          reject(new LoginError('cancelled'));
          return;
        }
        const href = popup.location.href;
        if (href.startsWith(redirectUri)) {
          const params = new URL(href).searchParams;
          const c = params.get('code');
          const err = params.get('error');
          window.clearInterval(timer);
          popup.close();
          if (c) resolve(c);
          else reject(new LoginError(err ? 'denied' : 'cancelled'));
        }
      } catch {
        /* cross-origin until Discord redirects back — keep polling */
      }
      if (Date.now() - started > 5 * 60 * 1000) {
        window.clearInterval(timer);
        try {
          popup.close();
        } catch {
          /* already closed */
        }
        reject(new LoginError('timeout'));
      }
    }, 400);
  });

  let accessToken = '';
  let tokenType = 'Bearer';

  if (TOKEN_EXCHANGE_URL.trim()) {
    const res = await fetch(TOKEN_EXCHANGE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirect_uri: redirectUri, code_verifier: verifier }),
    });
    if (!res.ok) throw new LoginError('exchange-failed');
    const data = await res.json();
    accessToken = data.access_token;
    tokenType = data.token_type ?? 'Bearer';
  } else {
    const res = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: verifier,
      }),
    });
    if (!res.ok) throw new LoginError('exchange-failed');
    const data = await res.json();
    accessToken = data.access_token;
    tokenType = data.token_type ?? 'Bearer';
  }

  const me = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `${tokenType} ${accessToken}` },
  });
  if (!me.ok) throw new LoginError('profile-failed');
  const profile = await me.json();
  return {
    id: profile.id,
    username: profile.username,
    email: profile.email ?? null,
  };
}

/** Posts a new-member alert to Discord, pinging the member. Throws on failure. */
export async function postToDiscord(user: DiscordUser): Promise<void> {
  if (!DISCORD_WEBHOOK_URL.trim()) throw new Error('webhook-missing');
  const res = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `<@${ADMIN_PING_ID}> New member alert — <@${user.id}> (@${user.username}) just joined the club!`,
      allowed_mentions: { parse: ['users'] },
      embeds: [
        {
          title: `New member: @${user.username}`,
          color: 15548997,
          fields: [
            { name: 'Discord', value: `@${user.username} (${user.id})`, inline: false },
            { name: 'Email', value: user.email ?? 'not shared', inline: false },
          ],
          footer: { text: 'Hack Club Nagpur · join form' },
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });
  if (!res.ok) throw new Error('discord-failed');
}
export async function submitJoinEmail(user: DiscordUser): Promise<boolean> {
  const res = await fetch(`https://formsubmit.co/ajax/${INBOX_EMAIL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: user.username,
      email: user.email ?? '',
      subject: `New member: ${user.username} (Hack Club Nagpur)`,
      message: `Discord login: ${user.username} (${user.id}) — email: ${user.email ?? 'not shared'}`,
    }),
  });
  if (!res.ok) throw new Error('submit-failed');
  return true;
}
