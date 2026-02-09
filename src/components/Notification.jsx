import React, { useEffect } from 'react';
const Notification = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            const t = setTimeout(onClose, 3000);
            return () => clearTimeout(t);
        }
    }, [message, onClose]);
    if (!message) return null;
    return (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
            <div className="bg-white text-black px-6 py-3 rounded-lg font-black text-xs tracking-tighter shadow-2xl">
                SYSTEM: {message.toUpperCase()}
            </div>
        </div>
    );
};
export default Notification;