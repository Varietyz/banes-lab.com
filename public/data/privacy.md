## Privacy Policy

### 1. Data Collection and Usage

Banes-Lab collects only the data necessary to provide and improve the platform’s services. When you create an account or log in via a third-party (Discord, Google, or GitHub), i receive unique identifiers (e.g. OAuth user ID), your username, and your email address from that provider. I do _not_ ask for or store any password (all authentication is handled via OAuth). Your IP address is recorded in server logs and is stored in a pseudonymized form (secure hash) when linked to your account for internal reference. I use this data to personalize your experience (e.g. creating a dedicated chat channel for you on my Discord integration) and to secure the platform (preventing duplicate or fraudulent accounts). I **do not** use this information for advertising purposes, nor do i profile you beyond what is needed to operate the service.

### 2. Cookies and Tracking

The platform uses cookies **only for essential authentication**. Specifically, when you log in, i set a `token` cookie containing an encrypted JSON Web Token (JWT) identifying your session. This cookie is **HttpOnly** and **Secure**, meaning it’s inaccessible to client-side scripts and is only sent over encrypted HTTPS connections. It is also set with `SameSite=None` and scoped to `.banes-lab.com` to allow secure use across the main site and subdomains.

I do not use any third-party analytics or advertising cookies. Aside from the single session cookie, i rely on browser storage only for trivial preferences (if any) and do not employ tracking pixels or fingerprinting. Any usage statistics i gather are limited to server-side logs (e.g. aggregate page hits or error logs) and are used solely to monitor and improve the service. No personal browsing profiles are created. The platform’s front-end does make direct requests to third-party APIs (e.g. fetching public repository data from GitHub) which may inherently expose your IP address to those third-parties, but i do not embed any third-party analytics scripts.

### 3. Telemetry and Analytics

Banes-Lab maintains **minimal telemetry**. There is no invasive analytics platform monitoring your clicks or page views. Basic operational metrics (such as API request counts, error rates, or chat message volumes) may be logged by my systems. These metrics contain at most anonymized or aggregated data. For example, i keep system logs that include IP addresses and user agent strings for security auditing, but these logs are protected and only reviewed to debug issues or investigate abuse. I do not use Google Analytics or similar services that track your behavior across sites. Any performance monitoring is done in-house and on an aggregate level (e.g. to measure site speed or uptime) without tracking individual user activity.

### 4. Third-Party Services

I integrate with a few third-party services strictly to provide core functionality, and i limit the data shared with them to the minimum required. When you choose to log in via **Discord**, **Google**, or **GitHub**, you are redirected to those services to authenticate. During that process, those providers may inform me of your basic profile information (such as your email and username) which i use to create or update your account. I request only minimal scopes: for example, Discord authentication requests your Discord username and email (no access to your messages or friends), and GitHub authentication similarly requests your basic profile and email.

The site front-end also connects to external services for content: i load fonts from Google Fonts and icons/scripts from jsDelivr CDN, and the Projects section of the site fetches public data from the GitHub API. These requests may cause your browser to transmit your IP address to those third-party servers (Google, jsDelivr, GitHub), but no additional personal data from your Banes-Lab account is sent. I do not share or sell any of your personal information to advertisers or unrelated third parties. I may, however, disclose information if required by law or lawful request (e.g. responding to a Belgian/EU court order), and i will inform you of such requests when permitted.

### 5. Data Storage and Security

All user information collected (OAuth IDs, usernames, emails, and hashed IPs) is stored in my secure database. Account records do include your email and a placeholder password hash (for OAuth accounts this is just a constant tag like “OAuthAccount” with no real password). I store _no_ sensitive authentication credentials—third-party OAuth tokens are not retained after use, except the necessary short-lived JWT for your session. Any chat messages you send via the Banes-Lab website’s chat interface are relayed through my backend to a private channel on my Discord server. I do not permanently store those messages in my own database (the messages live on Discord’s servers; i only keep transient caches for performance). Uploaded content or media (if any in the future) will be stored with access controls.

I apply industry-standard security practices to protect stored data: user passwords are not applicable (no local passwords), but any sensitive data in my databases is protected by server-level encryption and access control. The database is hosted on secured servers accessible only by the Banes-Lab application and administrator. Regular backups are encrypted and retained to prevent data loss. In the unlikely event of a data breach, i will notify affected users and authorities as required by law.

### 6. Data Subject Rights

If you are an EU resident or otherwise subject to data protection laws (GDPR or similar), you have the right to **access** the personal data i hold about you, to **rectify** inaccuracies, and to **request deletion** of your data. Banes-Lab fully supports these rights. You may contact me at any time at **privacy@banes-lab.com** (or **jay@banes-lab.com**) to request a copy of your data or ask me to delete your account information. Since my user accounts are linked to third-party logins, revoking Banes-Lab’s access from those providers (for example, removing the Banes-Lab OAuth app from your Discord/Google/GitHub account) will also prevent further access to your data. I will delete your account records (including email and any linked identifiers) upon verified request, and can also delete any associated Discord channel or content that was created for you.

Additionally, you have the right to object to or restrict certain processing (though i do not engage in profiling or marketing), and the right to data portability (i can provide your basic account info in a standard format on request). If you have concerns about how i handle your data, please reach out so i can address them. You also have the right to lodge a complaint with a supervisory authority (for example, the Belgian Data Protection Authority) if you believe your data rights are being infringed.

### 7. Security Measures

Banes-Lab is committed to the security of user data. All communications with the platform are **encrypted in transit** using TLS (HTTPS). I enforce high standards such as TLS 1.3 with modern ciphersuites (AES-256 GCM and ChaCha20-Poly1305) and forward-secret key exchanges. This means that data you send to the site (login credentials, API calls, chat messages, etc.) cannot be eavesdropped by attackers on the network.

On the server side, i employ firewalls and regular security updates on my infrastructure. Authentication tokens are short-lived (the JWT cookie expires after 1 hour by design), limiting exposure if a token were intercepted or stolen. The `token` cookie is also flagged HttpOnly and Secure to prevent XSS attacks from stealing it. I sanitize all inputs and chat content on the platform to prevent code injection attacks. Additionally, my content security policy (CSP) strictly limits where scripts and other resources can be loaded from (only trusted sources), mitigating cross-site scripting risks. Internally, access to the server and databases is restricted to the site operator (Jay) and maintained with strong credentials. I also log administrative access and actions. In summary, i use **AES-256 encryption, ECC keys, and other industry-standard cryptography** to protect data, and i design my software to be resilient against common web threats.

### 8. Data Retention

I retain your personal information only as long as necessary for the purposes outlined in this Privacy Policy. As part of my **automatic cleanup policy**, if your account remains **inactive** (meaning you have no chat interactivity or other active sessions) for **two consecutive weeks**, my system will automatically **purge** your account data. This includes removing any related Discord channel or cached information tied to your account. Once purged, no trace of your presence remains on my platform.

- If you actively delete your account or request data deletion, i will erase all personal identifiers from my databases (except information i are required to keep by law for a period of time, such as email records of consent or support communications, which i hold securely and delete as soon as permissible).
- Any server logs that include IP addresses are typically stored for a short period (e.g., 30 days) before being purged or anonymized.
- Backups containing your data are also overwritten on their regular rotation schedule, ensuring full deletion over time.

### 9. Children’s Privacy

The Banes-Lab platform is not directed to children under the age of 13, and i do not knowingly collect personal information from children. If i discover that a child under 13 (or the applicable age of digital consent in your region) has provided me with personal data, i will delete such data promptly. If you are a parent or guardian and you believe your child has used my site and provided personal information, please contact me so i can take appropriate action.

### 10. Changes to this Policy

I may update this Privacy Policy from time to time to reflect changes in my practices or for legal reasons. If i make significant changes, i will notify users via the website or email. The “last updated” date will always be indicated. I encourage you to review this policy periodically. Continued use of the platform after changes constitutes acceptance of the revised policy.

_Last updated: April 7, 2025._

---

_[Terms Of Service](https://banes-lab.com/service)_ | _[Information](https://banes-lab.com/info)_ | _[Homepage](https://banes-lab.com/)_
