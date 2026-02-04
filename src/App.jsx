import { useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

const colorPresets = [
  { name: 'Classique', fg: '#000000', bg: '#FFFFFF' },
  { name: 'Ocean', fg: '#0077B6', bg: '#CAF0F8' },
  { name: 'Sunset', fg: '#D62828', bg: '#FCBF49' },
  { name: 'Forest', fg: '#2D6A4F', bg: '#D8F3DC' },
  { name: 'Purple', fg: '#7B2CBF', bg: '#E0AAFF' },
  { name: 'Dark', fg: '#F8F9FA', bg: '#212529' },
]

function App() {
  const [text, setText] = useState('')
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [size, setSize] = useState(200)
  const qrRef = useRef()

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas')
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = url
    link.click()
  }

  const applyPreset = (preset) => {
    setFgColor(preset.fg)
    setBgColor(preset.bg)
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

        {/* Color Presets */}
        <div style={styles.section}>
          <label style={styles.label}>Themes</label>
          <div style={styles.presets}>
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                style={{
                  ...styles.presetBtn,
                  background: `linear-gradient(135deg, ${preset.fg} 50%, ${preset.bg} 50%)`,
                  border: fgColor === preset.fg && bgColor === preset.bg ? '3px solid #667eea' : '3px solid transparent',
                }}
                title={preset.name}
              />
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div style={styles.section}>
          <label style={styles.label}>Couleurs personnalisees</label>
          <div style={styles.colorRow}>
            <div style={styles.colorPicker}>
              <span style={styles.colorLabel}>QR Code</span>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                style={styles.colorInput}
              />
            </div>
            <div style={styles.colorPicker}>
              <span style={styles.colorLabel}>Fond</span>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={styles.colorInput}
              />
            </div>
          </div>
        </div>

        {/* Size Slider */}
        <div style={styles.section}>
          <label style={styles.label}>Taille: {size}px</label>
          <input
            type="range"
            min="100"
            max="300"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div ref={qrRef} style={{ ...styles.qrContainer, background: bgColor }}>
          <QRCodeCanvas
            value={text || 'https://example.com'}
            size={size}
            level="H"
            includeMargin={true}
            fgColor={fgColor}
            bgColor={bgColor}
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
    padding: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '450px',
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
    marginBottom: '25px',
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
    marginBottom: '20px',
    boxSizing: 'border-box',
  },
  section: {
    width: '100%',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '10px',
  },
  presets: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  presetBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  colorRow: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
  },
  colorPicker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  colorLabel: {
    fontSize: '12px',
    color: '#777',
  },
  colorInput: {
    width: '50px',
    height: '50px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  slider: {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    appearance: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    outline: 'none',
    cursor: 'pointer',
  },
  qrContainer: {
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '25px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'background 0.3s',
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
