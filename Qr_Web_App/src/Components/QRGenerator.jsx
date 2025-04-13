// Module Imports
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

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
    const [ input , setInput ] = useState('');
    const [ errorCorrection, setErrorCorrection ] = useState('M');

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