export const BETA_ANNOUNCEMENT_COOKIE_NAME = "cs-pension-beta-announcement-v1";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const hasDismissedBetaAnnouncement = (cookies) => cookies.split(";").some((cookie) => cookie.trim().startsWith(`${BETA_ANNOUNCEMENT_COOKIE_NAME}=`));

export const createBetaAnnouncementDismissalCookie = (isSecure) =>
    `${BETA_ANNOUNCEMENT_COOKIE_NAME}=dismissed; Max-Age=${ONE_YEAR_IN_SECONDS}; Path=/; SameSite=Lax${isSecure ? "; Secure" : ""}`;
