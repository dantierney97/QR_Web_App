import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

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
    const qrCode = useRef(null); // Initialize qrCode as an empty ref
    const [input, setInput] = useState('This is a QR Code');
    const [errorCorrection, setErrorCorrection] = useState('M');
    const [eyeStyle, setEyeStyle] = useState('square');     // Eye Shape (Square or Circle)
    const [dotStyle, setDotStyle] = useState('square');     // Dot Shape (Square or Circle)
    const [dotColor, setDotColor] = useState('#000000');    // Foreground Color
    const [bgColor, setBgColor] = useState('#ffffff');      // Background Color
    const [logoImage, setLogoImage] = useState(null);       // Logo Image
    const [dotColorMode, setDotColorMode] = useState('solid');
    const [dotGradientType, setDotGradientType] = useState('linear');
    const [dotGradientRotation, setDotGradientRotation] = useState(0);
    const [dotGradientStart, setDotGradientStart] = useState('#000000');
    const [dotGradientEnd, setDotGradientEnd] = useState('#ff0000');
    const [logoMargin, setLogoMargin] = useState(10);       // Logo Margin
    const [pngSize, setPngSize] = useState(1024);

    const sanitizeColor = (color, fallback = '#ffffff') =>
        typeof color === 'string' && /^#([0-9A-F]{3}){1,2}$/i.test(color) ? color : fallback;

    // Initialize qrCode on mount
    useEffect(() => {
        if (!qrRef.current || !input) return;

        qrCode.current = new QRCodeStyling({
            width: 1024,
            height: 1024,
            data: input,
            qrOptions: {
                errorCorrectionLevel: errorCorrection,
            },
            dotsOptions: {
                type: dotStyle,
                ...(dotColorMode === 'solid'
                    ? { color: dotColor }
                    : {
                        gradient: {
                            type: dotGradientType,
                            rotation: parseInt(dotGradientRotation),
                            colorStops: [
                                { offset: 0, color: dotGradientStart },
                                { offset: 1, color: dotGradientEnd },
                            ],
                        }
                    }),
            },
            cornersSquareOptions: { type: eyeStyle },
            cornersDotOptions: { type: eyeStyle },
            backgroundOptions: { color: sanitizeColor(bgColor) },
            ...(logoImage ? { image: URL.createObjectURL(logoImage) } : {}),
            imageOptions: {
                crossOrigin: 'anonymous',
                margin: parseInt(logoMargin),
            },
        });

        qrRef.current.innerHTML = '';
        qrCode.current.append(qrRef.current);
    }, []);

    // Update the QR Code every time an option has been changed
    useEffect(() => {
        qrCode.current.update({
            data: input,
            qrOptions: { errorCorrectionLevel: errorCorrection },
            dotsOptions: {
                type: dotStyle,
                ...(dotColorMode === 'solid'
                    ? { color: dotColor }
                    : {
                        gradient: {
                            type: dotGradientType,
                            rotation: parseInt(dotGradientRotation),
                            colorStops: [
                                { offset: 0, color: dotGradientStart },
                                { offset: 1, color: dotGradientEnd },
                            ],
                        }
                    }),
            },
            cornersSquareOptions: { type: eyeStyle },
            cornersDotOptions: { type: eyeStyle },
            backgroundOptions: { color: sanitizeColor(bgColor) },
            ...(logoImage ? { image: URL.createObjectURL(logoImage) } : {}),
            imageOptions: {
                crossOrigin: 'anonymous',
                margin: parseInt(logoMargin),
            },
        });

        // Clear and re-append the QR code every time
        if (qrRef.current) {
            qrRef.current.innerHTML = '';
            qrCode.current.append(qrRef.current);
        }
    }, [
        input,
        dotStyle,
        dotColor,
        eyeStyle,
        bgColor,
        logoImage,
        errorCorrection,
        dotColorMode,
        dotGradientType,
        dotGradientRotation,
        dotGradientStart,
        dotGradientEnd,
        logoMargin,
    ]);

    const handleDownload = (format) => {
        qrCode.current.download({
            extension: format,
            width: pngSize,
            height: pngSize,
        });
    };

    return (
        <div style={{ padding: '1rem', maxWidth: '400px', margin: 'auto' }}>
            <h2>QR Code Generator</h2>

            {/* Input Field */}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter URL or text"
                style={{ width: '90%', padding: '0.5rem', marginBottom: '1rem', fontSize: '16px' }}
            />

            {/* Dot Shape Selector */}
            <label>Dot Shape: </label>
            <select className="dropdown-select" value={dotStyle} onChange={(e) => setDotStyle(e.target.value)}>
                <option value="square">Square</option>
                <option value="dots">Dots</option>
                <option value="rounded">Rounded</option>
                <option value="extra-rounded">Extra Rounded</option>
                <option value="classy">Classy</option>
                <option value="classy-rounded">Classy Rounded</option>
            </select>

            {/* Eye Shape Selector */}
            <label style={{ marginLeft: '1rem' }}>Eye Shape: </label>
            <select className="dropdown-select" value={eyeStyle} onChange={(e) => setEyeStyle(e.target.value)}>
                <option value="square">Square</option>
                <option value="dots">Circle</option>
                <option value="extra-rounded">Round</option>
            </select>

            {/* Error Correction Level */}
            <div style={{ marginTop: '1rem' }}>
                <label>Error Correction: </label>
                <select className="dropdown-select" value={errorCorrection} onChange={(e) => setErrorCorrection(e.target.value)}>
                    <option value="L">L (Low)</option>
                    <option value="M">M (Medium)</option>
                    <option value="Q">Q (Quartile)</option>
                    <option value="H">H (High)</option>
                </select>
            </div>

            {/* Color Pickers */}
            <div style={{ marginTop: '1rem' }}>
                <label>Dot Fill Type: </label>
                <select className="dropdown-select" value={dotColorMode} onChange={(e) => setDotColorMode(e.target.value)}>
                    <option value="solid">Solid</option>
                    <option value="gradient">Gradient</option>
                </select>

                {dotColorMode === 'solid' ? (
                    <>
                        <label style={{ marginLeft: '1rem' }}>Dot Color:</label>
                        <input
                            type="color"
                            value={dotColor}
                            onChange={(e) => setDotColor(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <div style={{ marginTop: '0.5rem' }}>
                            <label>Gradient Type: </label>
                            <select
                                className="dropdown-select"
                                value={dotGradientType}
                                onChange={(e) => setDotGradientType(e.target.value)}
                            >
                                <option value="linear">Linear</option>
                                <option value="radial">Radial</option>
                            </select>

                            <label style={{ marginLeft: '1rem' }}>Rotation: </label>
                            <input
                                type="number"
                                value={dotGradientRotation}
                                onChange={(e) => setDotGradientRotation(e.target.value)}
                                style={{ width: '60px' }}
                            />
                        </div>

                        <div style={{ marginTop: '0.5rem' }}>
                            <label>Start Color: </label>
                            <input
                                type="color"
                                value={dotGradientStart}
                                onChange={(e) => setDotGradientStart(e.target.value)}
                            />
                            <label style={{ marginLeft: '1rem' }}>End Color: </label>
                            <input
                                type="color"
                                value={dotGradientEnd}
                                onChange={(e) => setDotGradientEnd(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <div style={{ marginTop: '1rem' }}>
                    <label>Background: </label>
                    <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                    />
                </div>
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

            {logoImage && (
                <div style={{ marginTop: '1rem' }}>
                    <label>Logo Margin: </label>
                    <select className="dropdown-select" value={logoMargin} onChange={(e) => setLogoMargin(e.target.value)}>
                        <option value={1}>1</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </div>
            )}

            {/* Rendered QR Code */}
            <div ref={qrRef} style={{ marginTop: '1.5rem' }}></div>

            <div style={{ marginTop: '1rem' }}>
                <label>PNG Resolution: </label>
                <select className="dropdown-select" value={pngSize} onChange={(e) => setPngSize(parseInt(e.target.value))}>
                    <option value={512}>512 x 512</option>
                    <option value={1024}>1024 x 1024 (High)</option>
                    <option value={2048}>2048 x 2048 (Ultra)</option>
                </select>
            </div>

            {/* Download Buttons */}
            <div style={{ marginTop: '1rem' }}>
                <button onClick={() => handleDownload('png')}>Download PNG</button>
            </div>

            <p>Copyright © 2025 Daniel J Tierney.</p>
            <p>All Rights Reserved.</p>
        </div>
    );
}

export default QRGenerator;