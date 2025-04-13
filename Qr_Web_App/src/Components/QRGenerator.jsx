// Module Imports
import React, { useEffect , useRef , useState } from 'react';
import {QrCodeStyling} from 'qr-code-styling';
/**
 * 
 *  QR Code Generation
 * 
 * This module renders UI components that will allow users to generate a QR code based on their input
 * 
 * @returns {JSX.Element} React component
 * 
 */

const QRGenerator = () => {
    const qrRef = useRef(null);
    const [ input , setInput ] = useState('This is a QR Code');
    const [ errorCorrection, setErrorCorrection ] = useState('M');
    const [ eyestyle, setEyeStyle ] = useState('square');   // Eye Shape (Square or Circle)
    const [ dotStyle , setDotStyle ] = useState('square');  // Dot Shape (Square or Circle)
    const [ dotColor, setDotColor ] = useState('#000000');  // Foreground Color
    const [ bgColor, setBGColor ] = useState('#ffffff');    // Background Color
    const [ logoImage, setLogoImage ] = useState(null);     // Logo Image


    return (
        <div style={{padding: '1rem'}}>
            <h2>QR Generator</h2>

            {/* User input for QR Generator Component */}
            <input
            type="text"
            placeholder="Enter text or URL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem'}}
            />

            {/* Dropdown menu for error correction */}
            <div style={{margin: '1rem 0'}}>
                <label>
                    Error Correction Label:&nbsp;
                    <select
                    value={errorCorrection}
                    onChange={(e) => setErrorCorrection(e.target.value)}
                    >
                        <option value="L">L (Low)       </option>
                        <option value="M">M (Medium)    </option>
                        <option value="Q">Q (Quartile)  </option>
                        <option value="H">H (High)      </option>
                    </select>
                </label>
            </div>

            {/* QR Code SVG Rendering */}
            { input && (
                <div style={{margin:"1rem 0"}}>
                    <QRCodeSVG
                    value={input}
                    size={256}
                    level={errorCorrection}
                    includeMargin={true}
                    />
                </div>
            )}
        </div>
    )
}

export default QRGenerator;