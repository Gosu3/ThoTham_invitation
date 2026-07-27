import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';

const petalStyles = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: 6 + index * 6,
  size: 10 + (index % 4) * 4,
  delay: (index * 0.56).toFixed(2),
  duration: 7 + (index % 5) * 1.2,
  rotate: index * 34
}));

export default function Luxury() {
  const audioRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.18;
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
      setMusicOn(true);
    } else {
      audioRef.current.pause();
      setMusicOn(false);
    }
  };

  const coverClass = opened ? 'card opened' : 'card';

  return (
    <>
      <Head>
        <title>Luxury Wedding - Next.js</title>
        <meta name="description" content="Thiệp cưới Luxury với hiệu ứng động giống Graceful 03, xây dựng bằng Next.js." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="page-shell">
        <div className="nav-row">
          <a className="page-back" href="/">
            ← Quay lại trang chính
          </a>
        </div>

        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyelash">Thiệp cưới Luxury</p>
            <h1>Luxury Edition</h1>
            <p>
              Thiết kế lấy cảm hứng từ Graceful 03 với chuyển động tinh tế, nền parallax nhẹ và
              trải nghiệm mở thiệp bằng JavaScript.
            </p>
          </div>
        </section>

        <div className="scene">
          <div className="background plane" />
          <div className="background glow" />
          <div className="card-frame">
            <div className={coverClass}>
              <div className="card-cover">
                <div className="cover-content">
                  <span className="intro-label">Thiệp mời tiệc cưới</span>
                  <p className="invite-title">Trân trọng kính mời</p>
                  <p className="couple-names">Hoàng & Hằng</p>
                  <p className="subtitle">Kính mời quý khách cùng chung vui trong một ngày hạnh phúc và ấm áp.</p>
                  <h2>Luxury Wedding</h2>
                  <div className="cover-note">Phong cách Graceful, bài trí Luxury</div>
                  <button className="cover-button" onClick={() => setOpened(true)}>
                    Mở thiệp
                  </button>
                </div>
              </div>
              <div className="card-inner">
                <div className="inner-panel">
                  <div className="panel-label">Lời mời trân trọng</div>
                  <h3>Hoàng & Hằng trân trọng kính mời</h3>
                  <p>
                    Mẫu Luxury mang đến sự sang trọng, mềm mại và ấm cúng. Chúng tôi hy vọng được đón tiếp
                    quý khách tại buổi lễ trọng đại với một không gian lộng lẫy và thân mật.
                  </p>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Thời gian</strong>
                      <span>Thứ Bảy, 12/10/2026 - 18:00</span>
                    </div>
                    <div className="detail-item">
                      <strong>Địa điểm</strong>
                      <span>Nhà hàng Grand Palace, Quận 3, TP. HCM</span>
                    </div>
                    <div className="detail-item">
                      <strong>Dresscode</strong>
                      <span>Elegant White / Champagne</span>
                    </div>
                  </div>
                  <div className="action-row">
                    <button className="music-toggle" onClick={toggleMusic}>
                      {musicOn ? 'Tắt âm nhạc' : 'Bật âm nhạc'}
                    </button>
                    <a className="action-link" href="#details">
                      Xem chi tiết
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="petal-layer">
            {petalStyles.map((petal) => (
              <span
                key={petal.id}
                className="petal"
                style={{
                  left: `${petal.left}%`,
                  width: `${petal.size}px`,
                  height: `${petal.size * 0.88}px`,
                  animationDelay: `${petal.delay}s`,
                  animationDuration: `${petal.duration}s`,
                  transform: `rotate(${petal.rotate}deg)`
                }}
              />
            ))}
          </div>
        </div>

        <audio ref={audioRef} loop src="https://dl.dropboxusercontent.com/scl/fi/qw2r6q7lzmyhivf1ihcra/IDO-C-PH-C.mp3?rlkey=ij2qnbecvput3876ku8q5r2ja&st=918ca195" />
      </div>
      <style jsx>{`
        .page-shell {
          min-height: 100vh;
          padding: 24px 24px 40px;
        }

        .nav-row {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 22px;
        }

        .page-back {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #fff;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .page-back:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.12);
        }

        .hero-section {
          width: min(1200px, 100%);
          margin: 0 auto 40px;
          padding: 32px 30px;
          border-radius: 34px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.24);
          backdrop-filter: blur(20px);
        }

        .hero-copy {
          max-width: 760px;
        }

        .eyelash {
          display: inline-flex;
          font-size: 0.82rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #e8d2b8;
          margin-bottom: 18px;
        }

        h1 {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 5vw, 4.4rem);
          line-height: 0.9;
          max-width: 11ch;
        }

        p {
          margin: 20px 0 0;
          color: rgba(246, 237, 228, 0.88);
          line-height: 1.85;
          max-width: 680px;
        }

        .scene {
          position: relative;
          width: min(1180px, 100%);
          margin: 0 auto;
          min-height: 860px;
          display: grid;
          place-items: center;
        }

        .background {
          position: absolute;
          inset: 0;
          border-radius: 40px;
          pointer-events: none;
        }

        .background.plane {
          background: radial-gradient(circle at 20% 20%, rgba(255, 212, 150, 0.18), transparent 18%),
            radial-gradient(circle at 80% 15%, rgba(255, 242, 214, 0.09), transparent 16%);
          filter: blur(0.5px);
          animation: floating 24s ease-in-out infinite;
        }

        .background.glow {
          background: radial-gradient(circle at 50% 60%, rgba(255, 201, 135, 0.12), transparent 28%),
            radial-gradient(circle at 18% 30%, rgba(255, 255, 255, 0.06), transparent 24%);
          mix-blend-mode: screen;
        }

        .card-frame {
          position: relative;
          width: min(980px, 100%);
          min-height: 780px;
          border-radius: 42px;
          overflow: hidden;
          padding: 32px;
          background: rgba(13, 5, 11, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 34px 90px rgba(0, 0, 0, 0.38);
        }

        .card {
          position: relative;
          width: 100%;
          min-height: 716px;
          border-radius: 36px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(27, 16, 19, 0.98), rgba(12, 4, 10, 0.94));
          transition: transform 0.9s ease;
          transform-style: preserve-3d;
          box-shadow: 0 40px 90px rgba(0, 0, 0, 0.4);
        }

        .card.opened {
          transform: translateY(-12px) scale(1.01);
        }

        .card-cover,
        .card-inner {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 48px;
          transition: transform 1s ease, opacity 1s ease;
        }

        .card-cover {
          z-index: 3;
        }

        .card-inner {
          transform: translateY(30px);
          opacity: 0;
          pointer-events: none;
        }

        .card.opened .card-cover {
          transform: translateY(-108%);
          opacity: 0;
        }

        .card.opened .card-inner {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .cover-content {
          width: min(760px, 100%);
          text-align: center;
          display: grid;
          gap: 20px;
        }

        .intro-label {
          display: inline-flex;
          margin: 0 auto;
          padding: 12px 20px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: #f7e6d5;
          letter-spacing: 0.2em;
          font-size: 0.82rem;
          text-transform: uppercase;
        }

        .invite-title {
          margin: 0;
          color: rgba(255, 245, 234, 0.9);
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.55rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .couple-names {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.7rem, 5vw, 4rem);
          letter-spacing: 0.04em;
          color: #fff;
        }

        .subtitle {
          margin: 0 auto;
          max-width: 640px;
          color: rgba(246, 238, 231, 0.84);
          font-size: 1rem;
          line-height: 1.8;
        }

        h2 {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 5vw, 4.8rem);
          color: #fff;
          line-height: 0.92;
        }

        .cover-note {
          display: inline-flex;
          padding: 14px 22px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #f8e8d2;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .cover-button {
          border: none;
          min-width: 180px;
          padding: 14px 28px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(255, 226, 170, 0.96), rgba(214, 144, 93, 0.92));
          color: #2b0a00;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .cover-button:hover {
          transform: translateY(-2px);
          filter: brightness(1.02);
        }

        .card-inner {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .inner-panel {
          width: min(760px, 100%);
          padding: 40px;
          border-radius: 34px;
          background: rgba(13, 7, 12, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
        }

        .panel-label {
          display: inline-flex;
          margin-bottom: 18px;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 999px;
          color: #f6e1c6;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-size: 0.82rem;
        }

        .inner-panel h3 {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.05rem, 4vw, 3rem);
          letter-spacing: 0.02em;
          color: #f8edde;
        }

        .inner-panel p {
          margin: 20px 0 0;
          color: rgba(242, 232, 221, 0.86);
          line-height: 1.9;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-top: 30px;
        }

        .detail-item {
          padding: 18px 20px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .detail-item strong {
          display: block;
          margin-bottom: 8px;
          color: rgba(255, 237, 216, 0.92);
          font-size: 0.92rem;
        }

        .detail-item span {
          color: rgba(242, 232, 221, 0.84);
          line-height: 1.5;
        }

        .action-row {
          margin-top: 32px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
        }

        .music-toggle,
        .action-link {
          min-width: 170px;
          padding: 14px 24px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
          transition: transform 0.2s ease, background 0.2s ease;
          text-decoration: none;
        }

        .music-toggle:hover,
        .action-link:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.12);
        }

        .petal-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .petal {
          position: absolute;
          top: -8%;
          border-radius: 48% 52% 48% 52%;
          background: rgba(255, 241, 216, 0.8);
          opacity: 0.86;
          box-shadow: 0 0 20px rgba(255, 213, 160, 0.22);
          animation-name: petal-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(-18px) scale(1.02);
          }
        }

        @keyframes petal-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 0.85;
          }
          20% {
            opacity: 0.95;
          }
          100% {
            transform: translateY(860px) rotate(420deg);
            opacity: 0;
          }
        }

        @media (max-width: 980px) {
          .scene {
            min-height: 760px;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {
          .hero-section,
          .card-frame {
            padding: 24px;
          }

          .card {
            min-height: 700px;
          }

          .cover-content {
            padding: 0 8px;
          }

          .inner-panel {
            padding: 28px;
          }
        }
      `}</style>
    </>
  );
}
