import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../components/UI';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded demo credentials
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-100 rounded-full text-red-600">
                <Lock size={32} />
            </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Admin Access</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            label="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <Input 
            label="Password" 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          
          <Button type="submit" fullWidth>Login</Button>
          
          <p className="text-center text-xs text-gray-400 mt-4">
            Demo: admin / admin
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;