import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function VoiceChat() {
    const [messages, setMessages] = useState([]);
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/chatbot/history`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setMessages(data.messages || []));
    }, [token]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();
        setRecording(true);

        const audioChunks = [];
        recorder.ondataavailable = e => audioChunks.push(e.data);

        recorder.onstop = async () => {
            setRecording(false);
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('audio', audioBlob, 'voice.wav');

            const res = await fetch(`${process.env.REACT_APP_API_URL}/chatbot/voice`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            const blob = await res.blob();
            const text = res.headers.get('X-Text-Response');

            if (text) {
                setMessages(prev => [
                    ...prev,
                    { sender: 'user', message: '[Audio enviado]', timestamp: new Date() },
                    { sender: 'bot', message: text, timestamp: new Date() }
                ]);

                const audioURL = URL.createObjectURL(blob);
                const audio = new Audio(audioURL);
                audio.play();
            }
        };
    };

    const stopRecording = () => {
        if (mediaRecorder) mediaRecorder.stop();
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h4 className="text-center">Chatbot de Voz</h4>
                <div className="border p-3 mb-3 rounded" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {messages.map((m, i) => (
                        <div key={i} className={`mb-2 text-${m.sender === 'user' ? 'end' : 'start'}`}>
                            <strong>{m.sender === 'user' ? 'Tú' : 'Asesor'}:</strong> {m.message}
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    {recording ? (
                        <button className="btn btn-danger" onClick={stopRecording}>Detener Grabación</button>
                    ) : (
                        <button className="btn btn-success" onClick={startRecording}>Grabar Mensaje</button>
                    )}
                </div>
            </div>
        </>
    );
}
