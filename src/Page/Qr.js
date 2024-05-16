import React, { useState } from 'react';
import '../Page/Style.css';
import image from '../Page/Assest/Image1 (1).png';

const Qr = () => {
    const [img, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState('https://www.youtube.com/watch?v=KqrWo525VUU&list=PL4unWLKFsZffVNM7JwUkNwmcLDMx3fivO&index=6');
    const [qrSize, setQrSize] = useState('300');

    async function generateQr() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            console.log("Generated URL:", url);
            setImage(url);
        } catch (error) {
            console.error("Error Generating QR Code", error);
        } finally {
            setLoading(false);
        }
    }

    function downloadQr() {
        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Error downloading QR Code", error);
            });
    }

    return (
        <div className='qr-app-container'>
            <h1>QR CODE GENERATOR</h1>
            {img && <img src={image} alt="stand-img" />}
            {loading && <p>Please wait...</p>}
            <div>
                <label htmlFor="data-input" className='data-input-label'> Data For QR Code:</label>
                <input type='text' value={qrData} id='data-input' placeholder='Enter QR Code Data' onChange={(e) => setQrData(e.target.value)} />

                <label htmlFor="Size-input" className='data-input-label'> Data Your Image Size:</label>
                <input type='text' value={qrSize} id='size-input' placeholder='Enter Image Size' onChange={(e) => setQrSize(e.target.value)} />

                <button className='button-generate' disabled={loading} onClick={generateQr}>Generate QR Code</button>
                <button className='button-download' onClick={downloadQr}>Download QR Code</button>
            </div>
        </div>
    );
}

export default Qr;
