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

        </div>
    )
}