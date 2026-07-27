import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Thiệp cưới Luxury</title>
        <meta name="description" content="Giao diện Next.js cho thiệp cưới Luxury lấy cảm hứng Graceful 03." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="home-shell">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyelash">Thiệp cưới phong cách Graceful</p>
            <h1>Luxury Invitation</h1>
            <p>
              Trang web đã được nâng cấp sang Next.js. Mẫu Luxury mang đến hiệu ứng mở
              thiệp, nền chuyển động và cánh hoa rơi như thiết kế Graceful 03.
            </p>
            <div className="hero-actions">
              <Link href="/luxury" className="hero-button">
                Xem mẫu Luxury
              </Link>
              <a href="/temp1.html" className="hero-button secondary" target="_blank" rel="noreferrer">
                Xem Classic Grace
              </a>
            </div>
          </div>
          <div className="hero-preview">
            <div className="preview-card">
              <span className="preview-label">Luxury</span>
              <h2>Hiệu ứng thiệp động</h2>
              <p>Chuyển đổi sang Next.js để UI mượt mà và dễ mở rộng hơn trên Vercel.</p>
            </div>
          </div>
        </section>
      </main>
      <style jsx>{`
        .home-shell {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 28px 24px;
        }

        .hero-panel {
          width: min(1200px, 100%);
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 32px;
          align-items: center;
          padding: 40px;
          border-radius: 36px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.32);
          backdrop-filter: blur(18px);
        }

        .hero-copy {
          max-width: 620px;
        }

        .eyelash {
          display: inline-flex;
          margin-bottom: 18px;
          color: #e9d3b5;
          font-size: 0.86rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        h1 {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 5vw, 4.5rem);
          line-height: 0.95;
        }

        p {
          color: #dbc9b7;
          line-height: 1.8;
          margin-top: 20px;
          max-width: 580px;
        }

        .hero-actions {
          margin-top: 32px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .hero-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          padding: 14px 26px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: linear-gradient(135deg, rgba(255, 238, 201, 0.95), rgba(226, 154, 92, 0.95));
          color: #1f0900;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .hero-button:hover {
          transform: translateY(-2px);
          filter: brightness(1.02);
        }

        .hero-button.secondary {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.14);
        }

        .hero-preview {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .preview-card {
          width: 100%;
          min-height: 380px;
          border-radius: 34px;
          padding: 30px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 22px 52px rgba(0, 0, 0, 0.18);
          display: grid;
          gap: 18px;
        }

        .preview-label {
          display: inline-flex;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: #f4dfc5;
          font-size: 0.86rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .preview-card h2 {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.1rem, 4vw, 2.8rem);
        }

        @media (max-width: 900px) {
          .hero-panel {
            grid-template-columns: 1fr;
            padding: 30px 22px;
          }
        }

        @media (max-width: 640px) {
          .hero-panel {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}
