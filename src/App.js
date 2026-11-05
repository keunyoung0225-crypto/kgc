import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, Heart, Users, RefreshCw, Volume2, Plus, Minus, UserCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('boss'); // 'boss', 'seoku', 'game'

  // 실장님 롤링페이퍼 데이터
  const [bossMessages, setBossMessages] = useState([
    { id: 1, author: "이영서", text: "경기도주식회사의 꽃 중의 꽃! 전략사업실은 정말 따뜻하면서도 모두가 열정 넘치는 최고의 실이라고 생각합니다. 전략사업실에서 특히 주임님, 대리님, 과장님, 실장님 모두 편안하고 즐겁게 얘기할 수 있는 분위기...", date: "2026.12" },
    { id: 2, author: "이빛나", text: "인사발령으로 전략사업실에 오게 되었는데, 함께 일하는 분들이 좋아 즐겁고 편안한 마음으로 일할 수 있었습니다. 실장님과 다시 함께 일하게 되어 더욱 반가웠고요! 늘 편안한 분위기를 만들어주셔서 감사드립니다. 😊", date: "2026.12" },
    { id: 3, author: "임수아", text: "한 해 동안 정말 수고 많으셨습니다! 조언해 주시고, 업무를 어떻게 해나가야 하는지 옆에서 많이 배우고 느낄 수 있었습니다. 덕분에 한층 더 성장할 수 있었던 것 같습니다.", date: "2026.12" },
    { id: 4, author: "김채은", text: "실장님 새로 하신 머리가 정말 잘 어울리십니다 30대처럼 보이세요", date: "2026.12" },
    { id: 5, author: "장선아", text: "실장님 1년 동안 많이 배웠습니다.", date: "2026.12" },
    { id: 6, author: "김진현", text: "올 한해를 쭉 함께하진 못했지만 절 잊지 말아주세요.. 곧 돌아갑니다!", date: "2026.12" },
    { id: 7, author: "이근영", text: "건강하소서..", date: "2026.12" },
    { id: 8, author: "이주영", text: "내년에도 잘 부탁드립니다...", date: "2026.12" },
    { id: 9, author: "박용수", text: "최고였습니다", date: "2026.12" },
    { id: 10, author: "이석우", text: "수고하셨습니다", date: "2026.12" },
    { id: 11, author: "본인", text: "나도 나를 잘 몰라~", date: "2026.12" }
  ]);

  // 석우대리 롤링페이퍼 데이터
  const [seokuMessages, setSeokuMessages] = useState([
    { id: 1, author: "이영서", text: "석우대리님 올 한 해 전사실의 분위기 메이커 역할을 톡톡히 해주셔서 감사해요! 내년엔 칼퇴 길만 걸으시길 빕니다 ⚡", date: "2026.12" },
    { id: 2, author: "이빛나", text: "늘 긍정적인 에너지로 팀원들 챙겨주셔서 감사해요. 석우 대리님 화이팅!", date: "2026.12" },
    { id: 3, author: "임수아", text: "어려운 업무 있을 때마다 친절하게 가르쳐 주셔서 큰 도움 되었습니다. 수고 많으셨어요!", date: "2026.12" },
    { id: 4, author: "김채은", text: "석우 대리님 센스 있는 입담 덕분에 올 한해 진짜 많이 웃었습니다 ㅋㅋ 최고!", date: "2026.12" }
  ]);

  // 새 메시지 입력 State
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');

  // 핀볼 게임 설정
  const [participantCount, setParticipantCount] = useState(11);
  const [participants, setParticipants] = useState([
    "이영서", "이빛나", "임수아", "김채은", "장선아", "김진현", "이근영", "이주영", "박용수", "이석우", "본인"
  ]);
  const [winnerModal, setWinnerModal] = useState({ show: false, slot: 0, name: '' });
  const [isBallDropping, setIsBallDropping] = useState(false);

  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const gameStateRef = useRef({
    ball: null,
    pegs: [],
    slots: [],
    isFinished: false
  });

  // 인원수 변경 시 배열 조절
  const handleCountChange = (delta) => {
    const newCount = Math.max(3, Math.min(20, participantCount + delta));
    setParticipantCount(newCount);
    
    setParticipants(prev => {
      if (newCount > prev.length) {
        const added = Array.from({ length: newCount - prev.length }, (_, i) => `참석자 ${prev.length + i + 1}`);
        return [...prev, ...added];
      } else {
        return prev.slice(0, newCount);
      }
    });
  };

  const handleNameChange = (index, value) => {
    const updated = [...participants];
    updated[index] = value;
    setParticipants(updated);
  };

  // 롤링페이퍼 등록
  const handleAddMessage = (type) => {
    if (!newText.trim()) return;
    const author = newAuthor.trim() || '익명';
    const newEntry = { id: Date.now(), author, text: newText, date: "2026.12" };
    
    if (type === 'boss') {
      setBossMessages([newEntry, ...bossMessages]);
    } else {
      setSeokuMessages([newEntry, ...seokuMessages]);
    }
    setNewAuthor('');
    setNewText('');
  };

  // Canvas 핀볼 물리엔진 세팅 & 루프
  useEffect(() => {
    if (activeTab !== 'game') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    // 핀(Pegs) 배치 생성
    const rows = 7;
    const pegs = [];
    const startY = 80;
    const rowSpacing = 45;

    for (let r = 0; r < rows; r++) {
      const isEven = r % 2 === 0;
      const cols = isEven ? 7 : 8;
      const spacing = width / (cols + 1);
      for (let c = 0; c < cols; c++) {
        pegs.push({
          x: spacing * (c + 1),
          y: startY + r * rowSpacing,
          r: 5
        });
      }
    }

    // 하단 슬롯 구획
    const slotCount = participantCount;
    const slotWidth = width / slotCount;
    const slots = [];
    for (let i = 0; i < slotCount; i++) {
      slots.push({
        x: i * slotWidth,
        width: slotWidth,
        index: i + 1,
        name: participants[i] || `${i + 1}번`
      });
    }

    gameStateRef.current.pegs = pegs;
    gameStateRef.current.slots = slots;

    // 렌더 함수
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 핀 그리기
      pegs.forEach(peg => {
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, peg.r, 0, Math.PI * 2);
        ctx.fillStyle = '#6366f1';
        ctx.fill();
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(99, 102, 241, 0.4)';
        ctx.closePath();
      });
      ctx.shadowBlur = 0;

      // 슬롯 바닥 구분선 및 텍스트
      const bottomY = height - 60;
      ctx.beginPath();
      ctx.moveTo(0, bottomY);
      ctx.lineTo(width, bottomY);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.stroke();

      slots.forEach((s, idx) => {
        const xPos = s.x;
        ctx.beginPath();
        ctx.moveTo(xPos, bottomY);
        ctx.lineTo(xPos, height);
        ctx.strokeStyle = '#cbd5e1';
        ctx.stroke();

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${idx + 1}`, xPos + s.width / 2, bottomY + 20);

        ctx.fillStyle = '#64748b';
        ctx.font = '10px sans-serif';
        const displayName = (participants[idx] || '').slice(0, 4);
        ctx.fillText(displayName, xPos + s.width / 2, bottomY + 38);
      });

      // 공 업데이트 및 그리기
      const ball = gameStateRef.current.ball;
      if (ball) {
        ball.vy += ball.gravity;
        ball.x += ball.vx;
        ball.y += ball.vy;

        // 벽 충돌
        if (ball.x - ball.r < 0) {
          ball.x = ball.r;
          ball.vx *= -0.7;
        } else if (ball.x + ball.r > width) {
          ball.x = width - ball.r;
          ball.vx *= -0.7;
        }

        // 핀 충돌
        pegs.forEach(p => {
          const dx = ball.x - p.x;
          const dy = ball.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < ball.r + p.r) {
            const angle = Math.atan2(dy, dx);
            const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy) * 0.75;
            const randomJitter = (Math.random() - 0.5) * 0.5;
            ball.vx = Math.cos(angle + randomJitter) * (speed + 1.5);
            ball.vy = Math.sin(angle + randomJitter) * (speed + 1.5);
            
            ball.x = p.x + Math.cos(angle) * (ball.r + p.r + 1);
            ball.y = p.y + Math.sin(angle) * (ball.r + p.r + 1);
          }
        });

        // 공 그리기
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;

        // 도착 감지
        if (ball.y >= bottomY - ball.r && !gameStateRef.current.isFinished) {
          gameStateRef.current.isFinished = true;
          setIsBallDropping(false);

          const hitIndex = Math.min(
            slotCount - 1,
            Math.max(0, Math.floor(ball.x / slotWidth))
          );
          const winnerName = participants[hitIndex] || `${hitIndex + 1}번 참석자`;

          setTimeout(() => {
            setWinnerModal({
              show: true,
              slot: hitIndex + 1,
              name: winnerName
            });
          }, 300);
        }
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activeTab, participantCount, participants]);

  // 공 떨어뜨리기 실행
  const dropBall = () => {
    if (isBallDropping) return;
    setIsBallDropping(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const randomStartX = (canvas.width / 2) + (Math.random() - 0.5) * 60;
    gameStateRef.current.ball = {
      x: randomStartX,
      y: 20,
      vx: (Math.random() - 0.5) * 2,
      vy: 1,
      r: 8,
