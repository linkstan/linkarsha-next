export default function Home() {
  return (
    <div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background: #0b0b12;
          color: white;
        }

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
        }

        .headline {
          font-size: 64px;
          font-weight: 900;
          line-height: 1.1;
        }

        .sub {
          margin-top: 20px;
          font-size: 18px;
          color: #bbb;
          max-width: 600px;
        }
      `}</style>

      <section className="hero">
        <h1 className="headline">
          The Creator Economy OS.<br />
          Not just a link.
        </h1>
        <p className="sub">
          Sell. Monetize. Grow. Linkarsha powers your entire creator business from one powerful link.
        </p>
      </section>
    </div>
  );
}
