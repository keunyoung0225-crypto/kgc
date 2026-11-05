import React, { useState, useEffect, useRef } from 'react';

import { Sparkles, Trophy, Heart, Users, RefreshCw, Volume2, Plus, Minus, UserCheck } from 'lucide-react';



export default function App() {

  const [activeTab, setActiveTab] = useState('boss'); // 'boss', 'seoku', 'game'



  // 실장님 롤링페이퍼 데이터

  const [bossMessages, setBossMessages] = useState([

    { id: 1, author: "이영서", text: "경기도주식회사의 꽃 중의 꽃! 전략사업실은 정말 따뜻하면서도 모두가 열정 넘치는 최고의 실이라고 생각합니다. 전략사업실에서 특히 주임님, 대리님, 과장님, 실장님 모두 편안하고 즐겁게 얘기할 수 있는 분위기가 있다는 것이 저희 실의 최고의 장점이라고 생각이 듭니다. 전략사업실 분위기를 항상 긍정적으로 이끌어주시고 한 명 한 명 챙겨서 살펴주시는 실장님께 정말 감사하다고 느낍니다. 모두들 남은 연말 무사히, 그리고 행복하게 보내셨으면 좋겠습니다. 2027년에는 더더욱 활기차고 즐거운 일들이 가득한 전략사업실이 될수 있도록 저도 노력하겠습니다! 부족했던 저에게 도움을 많이 주셔서 전략사업실 모든분들께 감사드립니다!", date: "2026.12" },

    { id: 2, author: "이빛나", text: "인사발령으로 전략사업실에 오게 되었는데, 함께 일하는 분들이 좋아 즐겁고 편안한 마음으로 일할 수 있었습니다. 실장님과 다시 함께 일하게 되어 더욱 반가웠고요! 늘 편안한 분위기를 만들어주시고, 업무를 추진할 때도 직원들의 입장을 먼저 생각해 주셔서 진심으로 감사드립니다. 😊", date: "2026.12" },

    { id: 3, author: "임수아", text: "한 해 동안 정말 수고 많으셨습니다! 조언해 주시고, 업무를 어떻게 해나가야 하는지, 상황을 어떻게 풀어나가야 하는지 옆에서 많이 배우고 느낄 수 있었습니다. 덕분에 한층 더 성장할 수 있었던 것 같습니다. 늘 건강 유의하시고, 앞으로도 좋은 일 가득하시길 바랍니다! 😊", date: "2026.12" },

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



      // 배경 감성 배경선

      ctx.strokeStyle = '#e2e8f0';

      ctx.lineWidth = 1;



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

        // 바닥 칸 구분선

        ctx.beginPath();

        ctx.moveTo(xPos, bottomY);

        ctx.lineTo(xPos, height);

        ctx.strokeStyle = '#cbd5e1';

        ctx.stroke();



        // 번호 및 이름 표시

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

        // 물리 이동

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

            // 바운스 연산

            const angle = Math.atan2(dy, dx);

            const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy) * 0.75;

            // 약간의 무작위 좌우 튕김 추가

            const randomJitter = (Math.random() - 0.5) * 0.5;

            ball.vx = Math.cos(angle + randomJitter) * (speed + 1.5);

            ball.vy = Math.sin(angle + randomJitter) * (speed + 1.5);

            

            // 위치 밀어내기

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



          // 승자 슬롯 확인

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



    // 중앙 상단 부근에서 무작위 위치로 공 생성

    const randomStartX = (canvas.width / 2) + (Math.random() - 0.5) * 60;

    gameStateRef.current.ball = {

      x: randomStartX,

      y: 20,

      vx: (Math.random() - 0.5) * 2,

      vy: 1,

      r: 8,

      gravity: 0.18

    };

    gameStateRef.current.isFinished = false;

  };



  return (

    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans pb-10">

      {/* 헤더 */}

      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 sticky top-0 z-40 px-4 py-4 text-center">

        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 bg-clip-text text-transparent flex items-center justify-center gap-2">

          <Sparkles className="w-5 h-5 text-amber-400" />

          전략사업실 2026 송년회

          <Sparkles className="w-5 h-5 text-amber-400" />

        </h1>

        <p className="text-xs text-slate-400 mt-1">한 해 동안 고생 많으셨습니다!</p>

      </header>



      {/* 탭 네비게이션 */}

      <div className="max-w-md w-full mx-auto px-4 mt-4">

        <div className="grid grid-cols-3 gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">

          <button

            onClick={() => setActiveTab('boss')}

            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${

              activeTab === 'boss' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'

            }`}

          >

            <Heart className="w-3.5 h-3.5" /> 실장님께

          </button>

          <button

            onClick={() => setActiveTab('seoku')}

            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${

              activeTab === 'seoku' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'

            }`}

          >

            <Users className="w-3.5 h-3.5" /> 석우대리에게

          </button>

          <button

            onClick={() => setActiveTab('game')}

            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${

              activeTab === 'game' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'

            }`}

          >

            <Trophy className="w-3.5 h-3.5" /> 핀볼 자리뽑기

          </button>

        </div>

      </div>



      {/* 메인 콘텐츠 영역 */}

      <main className="max-w-md w-full mx-auto px-4 mt-6 flex-1">

        

        {/* 1. 실장님 탭 */}

        {activeTab === 'boss' && (

          <div className="space-y-4">

            <div className="bg-gradient-to-r from-amber-900/40 to-slate-800 p-4 rounded-xl border border-amber-500/30">

              <h2 className="text-base font-bold text-amber-300 flex items-center gap-2">

                👑 실장님께 남긴 마음들

              </h2>

              <p className="text-xs text-slate-300 mt-1">

                전략사업실 든든한 리더, 실장님을 향한 직원들의 감사 메시지입니다.

              </p>

            </div>



            {/* 카드 작성 입력창 */}

            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-2">

              <input

                type="text"

                placeholder="작성자 이름 (미입력시 익명)"

                value={newAuthor}

                onChange={(e) => setNewAuthor(e.target.value)}

                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"

              />

              <textarea

                placeholder="실장님께 응원의 한마디를 적어보세요..."

                value={newText}

                onChange={(e) => setNewText(e.target.value)}

                rows={2}

                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 resize-none"

              />

              <button

                onClick={() => handleAddMessage('boss')}

                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-1.5 rounded-lg text-xs transition"

              >

                메시지 추가하기

              </button>

            </div>



            {/* 롤링페이퍼 카드 리스트 */}

            <div className="space-y-3">

              {bossMessages.map((msg) => (

                <div key={msg.id} className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl shadow-sm relative">

                  <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                  <div className="mt-3 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-700/60 pt-2">

                    <span className="font-semibold text-amber-400">— {msg.author}</span>

                    <span>{msg.date}</span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}



        {/* 2. 석우대리 탭 */}

        {activeTab === 'seoku' && (

          <div className="space-y-4">

            <div className="bg-gradient-to-r from-sky-900/40 to-slate-800 p-4 rounded-xl border border-sky-500/30">

              <h2 className="text-base font-bold text-sky-300 flex items-center gap-2">

                ⚡ 석우 대리에게 하고 싶은 말

              </h2>

              <p className="text-xs text-slate-300 mt-1">

                분위기 메이커 석우 대리를 향한 유쾌하고 따뜻한 메시지!

              </p>

            </div>



            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-2">

              <input

                type="text"

                placeholder="작성자 이름"

                value={newAuthor}

                onChange={(e) => setNewAuthor(e.target.value)}

                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"

              />

              <textarea

                placeholder="석우 대리님에게 칼퇴 기원 메시지를 작성해보세요!"

                value={newText}

                onChange={(e) => setNewText(e.target.value)}

                rows={2}

                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 resize-none"

              />

              <button

                onClick={() => handleAddMessage('seoku')}

                className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-1.5 rounded-lg text-xs transition"

              >

                응원 메시지 등록

              </button>

            </div>



            <div className="space-y-3">

              {seokuMessages.map((msg) => (

                <div key={msg.id} className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl shadow-sm">

                  <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                  <div className="mt-3 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-700/60 pt-2">

                    <span className="font-semibold text-sky-400">— {msg.author}</span>

                    <span>{msg.date}</span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}



        {/* 3. 핀볼 게임 탭 */}

        {activeTab === 'game' && (

          <div className="space-y-4">

            {/* 상단 참가자 설정 카드 */}

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">

              <div className="flex justify-between items-center mb-3">

                <span className="text-xs font-bold text-slate-200 flex items-center gap-1">

                  <UserCheck className="w-4 h-4 text-indigo-400" /> 참석자 명단 ({participantCount}명)

                </span>

                <div className="flex items-center gap-2">

                  <button

                    onClick={() => handleCountChange(-1)}

                    className="p-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200"

                  >

                    <Minus className="w-3.5 h-3.5" />

                  </button>

                  <span className="text-xs font-bold text-amber-400 min-w-[20px] text-center">

                    {participantCount}

                  </span>

                  <button

                    onClick={() => handleCountChange(1)}

                    className="p-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200"

                  >

                    <Plus className="w-3.5 h-3.5" />

                  </button>

                </div>

              </div>



              {/* 이름 수정 그리드 */}

              <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-900/50 rounded-lg">

                {participants.map((name, idx) => (

                  <div key={idx} className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded border border-slate-700">

                    <span className="text-[10px] text-slate-400 font-mono">{idx + 1}.</span>

                    <input

                      type="text"

                      value={name}

                      onChange={(e) => handleNameChange(idx, e.target.value)}

                      className="w-full bg-transparent text-[11px] text-slate-200 focus:outline-none"

                    />

                  </div>

                ))}

              </div>

            </div>



            {/* Canvas 핀볼 게임판 */}

            <div className="bg-slate-800 p-3 rounded-xl border border-indigo-500/30 flex flex-col items-center">

              <div className="relative border border-slate-700 rounded-lg overflow-hidden bg-slate-950">

                <canvas

                  ref={canvasRef}

                  width={340}

                  height={420}

                  className="block mx-auto"

                />

              </div>



              <button

                onClick={dropBall}

                disabled={isBallDropping}

                className={`w-full mt-3 py-3 rounded-xl font-bold text-sm shadow-lg transition flex items-center justify-center gap-2 ${

                  isBallDropping

                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'

                    : 'bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-400 hover:to-rose-400 text-white shadow-indigo-500/20'

                }`}

              >

                <RefreshCw className={`w-4 h-4 ${isBallDropping ? 'animate-spin' : ''}`} />

                {isBallDropping ? '핀볼 진행 중...' : '🎰 핀볼 공 떨어뜨리기 (자리뽑기)'}

              </button>

            </div>

          </div>

        )}

      </main>



      {/* 당첨 경품 축하 팝업 모달 */}

      {winnerModal.show && (

        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">

          <div className="bg-slate-800 border-2 border-amber-400 rounded-2xl p-6 text-center max-w-xs w-full shadow-2xl animate-bounce-once">

            <div className="text-4xl mb-2">🥩🎉</div>

            <h3 className="text-lg font-bold text-amber-300">축하합니다!</h3>

            <p className="text-slate-300 text-xs mt-1">

              <span className="text-amber-400 font-bold">{winnerModal.slot}번 Slot</span>에 안착했습니다!

            </p>

            

            <div className="my-4 p-3 bg-slate-900 rounded-xl border border-slate-700">

              <p className="text-xs text-slate-400">당첨자</p>

              <p className="text-base font-bold text-white mt-0.5">{winnerModal.name}</p>

              <div className="mt-2 pt-2 border-t border-slate-800 text-rose-400 font-extrabold text-sm">

                🎁 경품: 소고기 선물세트

              </div>

            </div>



            <button

              onClick={() => setWinnerModal({ show: false, slot: 0, name: '' })}

              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition"

            >

              확인

            </button>

          </div>

        </div>

      )}

    </div>

  );

}
