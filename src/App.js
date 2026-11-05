import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, Heart, Users, RefreshCw, Volume2, Plus, Minus, UserCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('boss');
  const [messages, setMessages] = useState([
    { id: 1, author: '김철수', text: '실장님 올해도 고생 많으셨습니다! 새해 복 많이 받으세요!', heart: 5 },
    { id: 2, author: '영희', text: '최고의 실장님! 항상 이끌어주셔서 감사합니다.', heart: 3 }
  ]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');

  const addMessage = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;
    setMessages([{ id: Date.now(), author: newAuthor, text: newText, heart: 0 }, ...messages]);
    setNewAuthor('');
    setNewText('');
  };

  const addHeart = (id) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, heart: msg.heart + 1 } : msg));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '24px' }}>
        <h1 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '8px' }}>🎉 경기도주식회사 송년회 🎉</h1>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '24px' }}>롤링페이퍼 & 핀볼 게임</p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button 
            onClick={() => setActiveTab('boss')} 
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: activeTab === 'boss' ? '#2563eb' : '#e2e8f0', color: activeTab === 'boss' ? 'white' : '#334155', fontWeight: 'bold', cursor: 'pointer' }}
          >
            실장님께
          </button>
          <button 
            onClick={() => setActiveTab('seoku')} 
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: activeTab === 'seoku' ? '#2563eb' : '#e2e8f0', color: activeTab === 'seoku' ? 'white' : '#334155', fontWeight: 'bold', cursor: 'pointer' }}
          >
            석우대리에게
          </button>
          <button 
            onClick={() => setActiveTab('game')} 
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: activeTab === 'game' ? '#2563eb' : '#e2e8f0', color: activeTab === 'game' ? 'white' : '#334155', fontWeight: 'bold', cursor: 'pointer' }}
          >
            핀볼 게임
          </button>
        </div>

        {activeTab === 'boss' && (
          <div>
            <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '16px' }}>💌 실장님을 향한 롤링페이퍼</h2>
            <form onSubmit={addMessage} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="작성자 이름" 
                value={newAuthor} 
                onChange={(e) => setNewAuthor(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
              <textarea 
                placeholder="따뜻한 한마디를 남겨주세요!" 
                value={newText} 
                onChange={(e) => setNewText(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', height: '80px' }}
              />
              <button type="submit" style={{ padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                등록하기
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ padding: '16px', borderRadius: '8px', background: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 'bold', color: '#334155' }}>{msg.author}</span>
                    <button onClick={() => addHeart(msg.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e11d48' }}>
                      ❤️ {msg.heart}
                    </button>
                  </div>
                  <p style={{ margin: 0, color: '#475569' }}>{msg.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'seoku' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '12px' }}>👨‍💻 석우대리 응원 공간</h2>
            <p style={{ color: '#64748b' }}>고생하는 석우대리를 위한 응원의 메시지를 남겨주세요!</p>
          </div>
        )}

        {activeTab === 'game' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '12px' %>">🕹️ 미니 핀볼 게임</h2>
            <p style={{ color: '#64748b' }}>준비 중인 미니 게임 영역입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
