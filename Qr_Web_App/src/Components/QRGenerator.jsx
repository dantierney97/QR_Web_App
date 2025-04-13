// Module Imports
import React, { useEffect, useRef, useState } from 'react';
import { errorCorrectionLevels, QrCodeStyling } from 'qr-code-styling';
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
    const [input, setInput] = useState('This is a QR Code');
    const [errorCorrection, setErrorCorrection] = useState('M');
    const [eyestyle, setEyeStyle] = useState('square');   // Eye Shape (Square or Circle)
    const [dotStyle, setDotStyle] = useState('square');  // Dot Shape (Square or Circle)
    const [dotColor, setDotColor] = useState('#000000');  // Foreground Color
    const [bgColor, setBgColor] = useState('#ffffff');    // Background Color
    const [logoImage, setLogoImage] = useState(null);     // Logo Image

    // Create the QR Code Instance
    const qrCode = useRef(
        new QRCodeStyling({
            width: 256,
            height: 256,
            data: input,
            qrOptions: {
                errorCorrectionLevels: errorCorrection,
            },
            dotsOptions: {
                type: dotStyle,
                color: dotColor,
            },
            cornersSquareStyle: {
                type: eyestyle,
            },
            backgroundOptions: {
                color: bgColor,
            },
            image: '',
            imageOptions: {
                crossOrigin: 'anonymous',
                margin: 10,
            },
        })
    );

    // Update the QR Code every time an option has been changed
    useEffect(() => {
        qrCode.current.update({
            data,
            qrOptions: { errorCorrectionLevels: errorCorrection },
            dotsOptions: { type: dotstyle, color: dotColor },
            cornersSquareOptions: { type: eyeStyle },
            backgroundOptions: { color: bgColor },
            image: logoFile ? URL.createObjectURL(logoFile) : '',
        });

        // Append to DOM if not already done
        if (qrRef.current) {
            qrRef.current.innerHTML = ''; // Clear previous
            qrCode.current.append(qrRef.current);
        }
    }, [input, dotStyle, dotColor, eyeStyle, bgColor, image, errorCorrection]);

    return (
        <div style={{ padding: '1rem', maxWidth: '400px', margin: 'auto' }}>
            <h2>Custom QR Code Generator</h2>

            {/* Input Field */}
            <input
                type="text"
                value={data}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter URL or text"
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            />

            {/* Dot Shape Selector */}
            <label>Dot Shape: </label>
            <select value={dotStyle} onChange={(e) => setDotStyle(e.target.value)}>
                <option value="square">Square</option>
                <option value="dots">Dots</option>
            </select>

            {/* Eye Shape Selector */}
            <label style={{ marginLeft: '1rem' }}>Eye Shape: </label>
            <select value={eyeStyle} onChange={(e) => setEyeStyle(e.target.value)}>
                <option value="square">Square</option>
                <option value="circle">Circle</option>
            </select>

            {/* Error Correction Level */}
            <div style={{ marginTop: '1rem' }}>
                <label>Error Correction: </label>
                <select value={level} onChange={(e) => setErrorCorrection(e.target.value)}>
                    <option value="L">L (Low)</option>
                    <option value="M">M (Medium)</option>
                    <option value="Q">Q (Quartile)</option>
                    <option value="H">H (High)</option>
                </select>
            </div>

            {/* Color Pickers */}
            <div style={{ marginTop: '1rem' }}>
                <label>Dot Color: </label>
                <input
                    type="color"
                    value={dotColor}
                    onChange={(e) => setDotColor(e.target.value)}
                />
                <label style={{ marginLeft: '1rem' }}>Background: </label>
                <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                />
            </div>

            {/* Logo Upload */}
            <div style={{ marginTop: '1rem' }}>
                <label>Upload Logo (optional): </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoImage(e.target.files[0])}
                />
            </div>

            {/* Rendered QR Code */}
            <div ref={qrRef} style={{ marginTop: '1.5rem' }}></div>

            {/* Download Buttons */}
            <div style={{ marginTop: '1rem' }}>
                <button onClick={() => handleDownload('png')}>Download PNG</button>
                <button onClick={() => handleDownload('svg')} style={{ marginLeft: '1rem' }}>
                    Download SVG
                </button>
            </div>
        </div>
    );

    // return (
    //     <div style={{padding: '1rem'}}>
    //         <h2>QR Generator</h2>

    //         {/* User input for QR Generator Component */}
    //         <input
    //         type="text"
    //         placeholder="Enter text or URL"
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         style={{ width: '100%', padding: '0.5rem', fontSize: '1rem'}}
    //         />

    //         {/* Dropdown menu for error correction */}
    //         <div style={{margin: '1rem 0'}}>
    //             <label>
    //                 Error Correction Label:&nbsp;
    //                 <select
    //                 value={errorCorrection}
    //                 onChange={(e) => setErrorCorrection(e.target.value)}
    //                 >
    //                     <option value="L">L (Low)       </option>
    //                     <option value="M">M (Medium)    </option>
    //                     <option value="Q">Q (Quartile)  </option>
    //                     <option value="H">H (High)      </option>
    //                 </select>
    //             </label>
    //         </div>

    //         {/* QR Code SVG Rendering */}
    //         { input && (
    //             <div style={{margin:"1rem 0"}}>
    //                 <QRCodeSVG
    //                 value={input}
    //                 size={256}
    //                 level={errorCorrection}
    //                 includeMargin={true}
    //                 />
    //             </div>
    //         )}
    //     </div>
    // )
}

export default QRGenerator;