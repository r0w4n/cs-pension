import { BETA_ANNOUNCEMENT_COOKIE_NAME, createBetaAnnouncementDismissalCookie, hasDismissedBetaAnnouncement } from "./betaAnnouncementCookie";

test("recognises a previous beta announcement dismissal", () => {
    const cookies = `analytics-consent=true; ${BETA_ANNOUNCEMENT_COOKIE_NAME}=dismissed`;

    expect(hasDismissedBetaAnnouncement(cookies)).toBe(true);
});

test("does not confuse a similarly named cookie with the dismissal cookie", () => {
    expect(hasDismissedBetaAnnouncement(`${BETA_ANNOUNCEMENT_COOKIE_NAME}-old=dismissed`)).toBe(false);
});

test("creates a secure, year-long dismissal cookie on HTTPS", () => {
    expect(createBetaAnnouncementDismissalCookie(true)).toBe(`${BETA_ANNOUNCEMENT_COOKIE_NAME}=dismissed; Max-Age=31536000; Path=/; SameSite=Lax; Secure`);
});
