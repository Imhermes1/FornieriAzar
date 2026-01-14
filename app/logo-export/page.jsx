'use client';

export default function LogoExport() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#fff'
        }}>
            <h1 className="hero-logo-text" style={{
                flexDirection: 'column',
                animation: 'none'
            }}>
                <span>FORNIERI</span>
                <span>&</span>
                <span>AZAR</span>
            </h1>
        </div>
    );
}
