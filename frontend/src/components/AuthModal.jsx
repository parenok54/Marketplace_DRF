import React, { useState } from 'react';
import { X, Lock, User, AlertCircle } from 'lucide-react';
import { loginUser, registerUser } from '../api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          setError('Пароли не совпадают!');
          setLoading(false);
          return;
        }
        await registerUser(username, password, confirmPassword);
        const tokenData = await loginUser(username, password);
        localStorage.setItem('access_token', tokenData.access);
        localStorage.setItem('refresh_token', tokenData.refresh);
        localStorage.setItem('user', JSON.stringify({ username }));
        onAuthSuccess({ username });
        onClose();
      } else {
        const tokenData = await loginUser(username, password);
        localStorage.setItem('access_token', tokenData.access);
        localStorage.setItem('refresh_token', tokenData.refresh);
        localStorage.setItem('user', JSON.stringify({ username }));
        onAuthSuccess({ username });
        onClose();
      }
    } catch (err) {
      const msg = err.response?.data?.detail ||
                  err.response?.data?.password?.[0] ||
                  err.response?.data?.username?.[0] ||
                  'Неверный логин или пароль';
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100 dark:border-slate-800">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {isRegister ? 'Регистрация' : 'Авторизация'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {isRegister
              ? 'Создайте аккаунт для покупок и объявлений'
              : 'Войдите со своим логином и паролем'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Логин
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ваш логин"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Пароль
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition font-medium"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Подтверждение пароля
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition font-medium"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-blue-500/20 active:scale-98 transition disabled:opacity-50"
          >
            {loading
              ? 'Загрузка...'
              : isRegister
              ? 'Зарегистрироваться'
              : 'Войти'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {isRegister
              ? 'Уже есть аккаунт? Войти'
              : 'Нет аккаунта? Зарегистрироваться'}
          </button>
        </div>

      </div>
    </div>
  );
}
