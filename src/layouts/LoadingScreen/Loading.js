import React from 'react'

const Loading = () => {
    return (
        <div style={{ height: '100vh' }}>
            <section className="justify-content-center h-100 d-flex align-items-center">
                <div className="loader">
                    <svg viewBox="0 0 80 80">
                        <circle id="test" cx={40} cy={40} r={32} />
                    </svg>
                </div>
                <div className="loader triangle">
                    <svg viewBox="0 0 86 80">
                        <polygon points="43 8 79 72 7 72" />
                    </svg>
                </div>
                <div className="loader">
                    <svg viewBox="0 0 80 80">
                        <rect x={8} y={8} width={64} height={64} />
                    </svg>
                </div>
            </section>

        </div>

    )
}

export default Loading
