"use client";

export default function RippleTheme({
  profile,
  appearance,
  socialLinks,
  buildSocialUrl
}) {

  const header = appearance?.header || {};

  const defaultImage =
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1200";

  return (
    <div
      style={{
        background: "#d8c9be",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif"
      }}
    >

      {/* HEADER (TOP BEIGE + PERFECT CURVE) */}

      <div
        style={{
          position: "relative",
          background: "#d8c9be",
          textAlign: "center",
          padding: "55px 20px 95px",
          color: "#8b5e5e"
        }}
      >
        <div style={{ fontSize: 42 }}>🦷</div>

        <h1
          style={{
            margin: 0,
            letterSpacing: 2,
            fontSize: 36,
            fontWeight: 700
          }}
        >
          {profile.display_name || profile.username}
        </h1>

        {header.subtitle && (
          <p style={{ marginTop: 8 }}>{header.subtitle}</p>
        )}

        {/* EXACT CURVE (REFERENCE MATCH) */}
        <svg
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: -1,
            left: 0,
            width: "100%",
            height: 140,
            zIndex: 5
          }}
        >
          <path
            fill="#d8c9be"
            d="M0,100 
               C250,200 400,40 650,80 
               C900,120 1100,40 1440,70 
               L1440,260 
               L0,260 
               Z"
          />
        </svg>

        {/* WHITE EDGE (THIN + SMOOTH) */}
        <svg
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: -1,
            left: 0,
            width: "100%",
            height: 140,
            zIndex: 6,
            pointerEvents: "none"
          }}
        >
          <path
            d="M0,100 
               C250,200 400,40 650,80 
               C900,120 1100,40 1440,70"
            fill="none"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* HERO IMAGE */}

      <div
        style={{
          position: "relative",
          height: 300,
          overflow: "hidden"
        }}
      >
        <img
          src={appearance?.hero?.image || defaultImage}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />

        {/* BOTTOM WAVE (DEEP + SHADOW LIKE REF) */}
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: -1,
            left: 0,
            width: "100%",
            zIndex: 4,
            filter: "drop-shadow(0px -10px 20px rgba(0,0,0,0.35))"
          }}
        >
          <path
            fill="#7a4c4c"
            d="M0,140 
               C250,260 420,90 720,140 
               C980,190 1180,80 1440,120 
               L1440,220 
               L0,220 
               Z"
          />
        </svg>
      </div>

      {/* CONTENT */}

      <div
        style={{
          background: "#7a4c4c",
          color: "#fff",
          padding: "140px 20px 70px",
          position: "relative"
        }}
      >

        {/* AVATAR (PERFECT OVERLAP POSITION) */}

        <div
          style={{
            position: "absolute",
            top: -85,
            left: 25,
            zIndex: 10
          }}
        >
          {/* OUTER RING */}
          <div
            style={{
              position: "absolute",
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.25)",
              top: -12,
              left: -12
            }}
          />

          {/* INNER IMAGE */}
          <img
            src={profile.avatar}
            style={{
              width: 135,
              height: 135,
              borderRadius: "50%",
              border: "7px solid rgba(255,255,255,0.65)",
              objectFit: "cover"
            }}
          />
        </div>

        {/* TEXT BLOCK (MATCH SPACING) */}

        <div
          style={{
            marginLeft: 190,
            marginTop: 10
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 600
            }}
          >
            {profile.display_name || profile.username}
          </h2>

          {header.showBio && profile.bio && (
            <p
              style={{
                opacity: 0.8,
                lineHeight: 1.5,
                marginTop: 8
              }}
            >
              {profile.bio}
            </p>
          )}
        </div>

        {/* ICON GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 32,
            marginTop: 50,
            textAlign: "center"
          }}
        >
          {Object.entries(socialLinks || {}).slice(0, 6).map(([platform, usernames]) =>
            usernames?.map((username, i) => {

              const icon =
                platform === "whatsapp" ? "💬" :
                platform === "phone" ? "📞" :
                platform === "email" ? "✉️" :
                platform === "facebook" ? "f" :
                platform === "instagram" ? "📷" :
                "📍";

              return (
                <a
                  key={platform + i}
                  href={buildSocialUrl(platform, username)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#fff"
                  }}
                >
                  <div
                    style={{
                      width: 85,
                      height: 85,
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.45)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "auto",
                      fontSize: 24
                    }}
                  >
                    {icon}
                  </div>

                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 14,
                      opacity: 0.85
                    }}
                  >
                    {platform}
                  </div>
                </a>
              );
            })
          )}
        </div>

        {/* FOOTER */}

        <div
          style={{
            textAlign: "center",
            marginTop: 45,
            opacity: 0.6,
            fontSize: 14
          }}
        >
          👆 TOQUE NOS ÍCONES
        </div>

      </div>
    </div>
  );
}
