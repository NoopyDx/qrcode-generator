import { useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

function App() {
  const [text, setText] = useState('')
  const qrRef = useRef()

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas')
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = url
    link.click()
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src="/logo-seul-couleur-1.webp" alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>QR Code Generator</h1>

        <input
          type="text"
          placeholder="Entrez votre texte ou URL..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />

        <div ref={qrRef} style={styles.qrContainer}>
          <QRCodeCanvas
            value={text || 'https://example.com'}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>

        <button
          onClick={downloadQR}
          style={styles.button}
          disabled={!text}
        >
          Telecharger QR Code
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  logo: {
    width: '80px',
    height: '80px',
    marginBottom: '20px',
    objectFit: 'contain',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '15px 20px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.3s',
    marginBottom: '30px',
  },
  qrContainer: {
    padding: '20px',
    background: '#f5f5f5',
    borderRadius: '15px',
    marginBottom: '30px',
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 40px',
    fontSize: '16px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'transform 0.2s, opacity 0.2s',
  },
}

export default App
