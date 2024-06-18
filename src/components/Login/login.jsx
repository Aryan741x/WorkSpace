'use client'
import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/login.module.css';
import Cookies from 'js-cookie';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (data.message === 'Login successful') {
        const userToken = username; 
        Cookies.set('userToken', userToken, { expires: 7 });
        Cookies.set('role', role, { expires: 7 });
        window.location.href="/workspace";
      } else {
        alert('Unauthorized');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles['body']}>
      <div className={styles['main-container']}>
        <Image
          src="/background.jpg"
          alt="LoginImg"
          width={500}
          height={500}
          className={styles.image}
          priority={false} />
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.title}>Login</h1>
            <div className={styles['form-group']}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                className={styles.input}
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles['form-group']}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.input}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles['form-group']}>
              <label className={styles.label} htmlFor="role">
                Role
              </label>
              <select
                className={styles.select}
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="senior_manager">Senior Manager</option>
              </select>
            </div>
            <button className={styles.button} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
