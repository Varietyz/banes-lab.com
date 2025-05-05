## Site Information and Security Overview

This section provides a transparent, technical overview of Banes-Lab’s website infrastructure and security measures, including encryption protocols, network configuration, and headers that protect you as a user. My goal is to inform you of exactly how your connection and data are secured when using **banes-lab.com** and its subdomains.

---

### TLS Encryption and Protocols

All traffic to Banes-Lab is protected by **Transport Layer Security (TLS)**. I support **TLS 1.3** and **TLS 1.2** exclusively, and older protocols (TLS 1.1, 1.0 and SSLv3/2) are fully disabled. This ensures that only modern, secure protocols are used for your HTTPS connection. The server is configured with a strong cipher suite preference: in practice, this means the site will negotiate state-of-the-art encryption ciphers. For TLS 1.3, i allow ciphers like AES-GCM and ChaCha20-Poly1305; for TLS 1.2, i restrict to AES-128-GCM, AES-256-GCM, and ChaCha20-Poly1305 with **ECDHE ECDSA** key exchange. There are no legacy ciphers like RC4 or DES, and no cipher suites without forward secrecy. **Forward Secrecy (FS)** is enabled with elliptic-curve Diffie–Hellman (ECDHE) for all supported cipher suites, meaning that even if the server’s long-term key were ever compromised, past session keys remain secure. My SSL/TLS configuration earned an A+ rating in third-party tests, indicating a robust setup (modern protocols, strong key exchange, and cipher strength).

The site’s TLS certificate uses an **ECC (Elliptic Curve Cryptography) 256-bit key** (with ECDSA signature). This provides strong security with a smaller key size than RSA, enabling faster handshakes while maintaining equivalent security (256-bit ECC is roughly comparable to 3072-bit RSA in strength). The certificate covers the primary domain and all intended subdomains via Subject Alternative Names. The current certificate is issued by Let’s Encrypt and chains to the ISRG Root X1 certificate authority, which is trusted by all major browsers. I also enable **OCSP Stapling** on my server. This means the server regularly fetches and caches the Certificate Authority’s revocation status for my cert, and presents it during the TLS handshake — speeding up certificate validation and improving privacy by avoiding your browser having to contact the CA directly. Additionally, my server supports **session resumption** via TLS session caching (but not via session tickets, to avoid long-term ticket keys on the server). This allows returning visitors to resume an encrypted session without a full handshake, improving performance while still requiring fresh ephemeral keys (so security is preserved). I do not support 0-RTT (early data) on TLS 1.3 at this time, to avoid potential replay attacks.

**Summary of TLS Configuration:**

- TLS 1.3 and 1.2 with AES-128/256 GCM and ChaCha20 ciphers (128-256 bit keys).
- ECDHE key exchange using curve X25519 or secp256r1, providing forward secrecy for all clients.
- Certificate uses an ECDSA signature (SHA-384) and a 256-bit EC key.
- The **Key Exchange** and **Cipher Strength** portions of my SSL report are rated as strong (both 90-100), indicating no weak keys or ciphers are in use.
- Tests confirm older clients lacking SNI or modern ciphers are unable to connect, which is by design.
- The server is configured with TLS_FALLBACK_SCSV to prevent protocol downgrade attacks, and all known TLS vulnerabilities (BEAST, POODLE, Heartbleed, etc.) are mitigated or not applicable.

---

### HTTP Strict Transport Security (HSTS) and Certificate Authority Authorization (CAA)

To further solidify my HTTPS implementation, Banes-Lab sends a **Strict-Transport-Security (HSTS)** header on every response. I set `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`. This instructs browsers to remember that my site is HTTPS-only for the next year and to automatically enforce HTTPS on all connections, including subdomains. The `includeSubDomains` flag means any subdomain of banes-lab.com (such as **ws.banes-lab.com**) is also covered by HSTS, ensuring no part of my platform is ever accessed over plaintext HTTP. The `preload` directive indicates i am included in the browser HSTS preload lists. HSTS prevents cookie hijacking or man-in-the-middle attacks via protocol downgrade by telling browsers to refuse any non-HTTPS links or redirects.

In addition to HSTS, i have a **DNS Certification Authority Authorization (CAA)** policy in place for the domain. My DNS CAA records specify which Certificate Authorities are allowed to issue certificates for banes-lab.com. Specifically, i authorize Let’s Encrypt and DigiCert as acceptable CAs, and no others. This reduces the risk of an attacker obtaining a fraudulent certificate from a misbehaving or compromised CA. The CAA record also includes an **iodef** tag with an email contact – this means if any CA were to get a request for an unauthorized certificate for my domain, they could alert me. By combining HSTS and CAA, i ensure that your browser only ever trusts **valid**, intended certificates for my site and only over secure channels.

My certificate is regularly renewed (currently via Let’s Encrypt, ~90-day lifecycle). Issued March 31, 2025, expiring June 29, 2025. The certificate’s fingerprint and chain are logged publicly (Certificate Transparency), and OCSP status is stapled as mentioned. I do not use deprecated mechanisms like HPKP; HSTS and CAA provide the necessary trust safeguards in a safer way.

---

### Subdomains and WebSocket Endpoints

The Banes-Lab platform consists of subdomains, each with a specific role, all covered under my single certificate:

1. **banes-lab.com** – Main website front-end (React) served over HTTPS (Nginx).
2. **ws.banes-lab.com** – WebSocket server endpoint for real-time features (chat).
3. **bot.banes-lab.com** – Internal host name for the Node.js/Discord bot server.
4. **host.banes-lab.com** – Another internal name (not publicly used).
5. **www.banes-lab.com** – Alias for the main site (redirects to `banes-lab.com`).

All are covered by HSTS (via `includeSubDomains`) and share the same TLS certificate. None use plaintext HTTP or are outside my control.

**WebSocket details:**

- Endpoint: `wss://ws.banes-lab.com/socket.io/` using Socket.io.
- Fully encrypted by TLS.
- Origin checks/CORS in place (only my domain or localhost dev can connect).
- Messages route to a private Discord channel for each user, created by my bot.
- All real-time communication is sanitized and secured to mitigate XSS/injection.

---

### Security Headers and Content Policies

Banes-Lab employs several HTTP security headers:

- **Content Security Policy (CSP)**: Strict, whitelisting only my domain/CDN for scripts, Google Fonts, etc. Blocks any other script or frame.
- **X-Frame-Options**: `DENY` to prevent clickjacking in older browsers.
- **X-Content-Type-Options**: `nosniff` to avoid MIME confusion.
- **Referrer-Policy**: `no-referrer` for privacy when clicking external links.
- **Permissions-Policy**: Disables features like geolocation, microphone, camera, etc. (not used).
- **X-XSS-Protection**: `0` to disable legacy XSS filters in favor of modern CSP.
- **CORS**: Only my own domain or localhost dev is allowed for the API/WebSocket.

These measures earned an **A+** on [securityheaders.com](https://securityheaders.com/?q=banes-lab.com&followRedirects=on) and protect against XSS, clickjacking, data injection, etc.

---

### External Resources and Dependencies

- **GitHub API**: To fetch public repo data, client-side calls to `api.github.com`.
- **Discord Integration**: OAuth for login, plus a bot for chat bridging (private channels).
- **Google Fonts**: Loads fonts from `fonts.googleapis.com`/`fonts.gstatic.com`.
- **jsDelivr CDN**: Serves certain front-end libraries (e.g. `socket.io.min.js`).
- **Email (SMTP)**: For user contact (`jay@banes-lab.com`), with SPF/DMARC to prevent spoofing.

No other external trackers or hidden services.

---

### Cookie Usage, Sessions, and Data Retention (Technical Details)

- Single `token` cookie (JWT) to authenticate, `Secure; HttpOnly; SameSite=None; Domain=.banes-lab.com; Path=/`.
- 1-hour lifespan. Renewed if you stay active.
- No analytics or preference cookies.
- Clearing cookies logs you out.
- Session resumption is ephemeral, no “remember me” feature.
- Client caching is minimal (static files only).

---

### Certificate Authority and Transparency

- Issued by Let’s Encrypt Authority X3 (ISRG Root X1).
- Logged in public CT logs; I monitor for unauthorized issuance.
- TLS 1.2 fallback if TLS 1.3 unsupported.
- ALPN supports HTTP/2 for better performance.
- Plans to explore HTTP/3.
- Cipher preference sets strongest encryption first (AES-256-GCM, ChaCha20).
- OCSP Stapling is enabled; no Must-Staple.
- No client certs required.

---

### Conclusion

Banes-Lab is built with a robust security foundation utilizing **modern cryptography**, **strict Content Security Policies (CSP)**, and **limited external integrations** — all routed through HTTPS to ensure secure communication. The implementation of **AES-256 encryption, ECC keys, and forward secrecy** is verified through consistent top scores (A+) in independent security tests.

All protections outlined in the Privacy Policy and Terms of Service are aligned with the server’s technical configuration. Continuous monitoring, patching, and improvements are applied to ensure the platform remains secure and reliable.

Verify Banes-Lab’s security with these independent tests:

1. **[Security Headers Test](https://securityheaders.com/?q=banes-lab.com&followRedirects=on)** — Evaluates protection against XSS, clickjacking, and other header-based attacks.
2. **[SSL Configuration Analysis](https://www.ssllabs.com/ssltest/analyze.html?d=banes-lab.com)** — Assesses TLS protocols, cipher suites, key exchange mechanisms, and certificate validity.
3. **[HTTP Observatory (Mozilla)](https://developer.mozilla.org/en-US/observatory/analyze?host=banes-lab.com)** — Analyzes HTTP headers and compliance with modern security practices.
4. **[Hardenize Report](https://www.hardenize.com/report/banes-lab.com/1743963242)** — Provides a comprehensive overview of TLS, DNS, and HTTP security measures.

For questions or suggestions regarding Banes-Lab’s security, feel free to reach out. Your privacy and safety remain my highest priority.

---

_[Privacy Policy](https://banes-lab.com/privacy)_ | _[Terms Of Service](https://banes-lab.com/service)_ | _[Homepage](https://banes-lab.com/)_
