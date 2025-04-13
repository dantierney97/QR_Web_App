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
        </div>
    )
}