"use client";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const ResetPassword = () => {
    const params = useParams();
    const { uidb64, token } = params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!uidb64 || !token) {
            setError('Invalid reset link');
        }
    }, [uidb64, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords must match');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/password-reset-confirm/${uidb64}/${token}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    password2: confirmPassword,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess('Password has been reset successfully');
                setError('');
            } else {
                setError('Failed to reset password');
                setSuccess('');
            }
        } catch (err) {
            setError('An error occurred while resetting the password');
            setSuccess('');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: '#fff', cursor: 'pointer' }}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
