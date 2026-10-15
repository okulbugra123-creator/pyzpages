/**
 * Kozmik Kaçış - 3 Aşamalı Hayatta Kalma ve Taktik Oyunu
 * Derleme gerektirmeyen, doğrudan HTML5 Canvas ve Web Audio API ile çalışan tam oyun motoru.
 */

// --- 1. SES SİSTEMİ (Web Audio API - Bağımsız & Sentetik) ---
class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTone(freq, type, duration, gainStart = 0.2, gainEnd = 0.001) {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainStart, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainEnd, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }

  shoot() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }

  crystal() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [660, 880, 1320].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.1, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.15);
      });
    } catch {}
  }

  hit() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.22);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }

  shield() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(680, now + 0.25);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  bossLaser() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.4);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch {}
  }

  stageWin() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, C
      const now = this.ctx.currentTime;
      notes.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.12);
        gain.gain.setValueAtTime(0.2, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.35);
      });
    } catch {}
  }

  gameOver() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [440, 392, 349.2, 293.7];
      const now = this.ctx.currentTime;
      notes.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now + i * 0.18);
        gain.gain.setValueAtTime(0.2, now + i * 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.18 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.18);
        osc.stop(now + i * 0.18 + 0.3);
      });
    } catch {}
  }
}

// --- 2. ANA OYUN MOTORU & DURUM YÖNETİMİ ---
class GameApp {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.audio = new SoundController();

    // Boyutlandırma
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.setupCanvas();

    // Oyun Durumu
    this.state = 'MENU'; // 'MENU' | 'PLAYING' | 'PAUSED' | 'STAGE_CLEAR' | 'GAME_OVER' | 'VICTORY'
    this.currentStage = 1;
    this.campaignMode = true; // Aşama 1 -> 2 -> 3 otomatik geçiş
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('kozmik_highscore') || '0', 10);
    this.stageStartTime = 0;
    this.totalPlayTime = 0;

    // Oyuncu Gemisi
    this.player = {
      x: this.width / 2,
      y: this.height - 120,
      radius: 18,
      speed: 6.5,
      hp: 100,
      maxHp: 100,
      shield: 100,
      maxShield: 100,
      shieldActive: false,
      shieldTimer: 0,
      shieldCooldown: 0,
      invulnerableTimer: 0,
      energy: 0, // Aşama 1 için hedef: 1000
      energyGoal: 1000,
      terminalsHacked: 0, // Aşama 2 için hedef: 4
      targetX: this.width / 2,
      targetY: this.height - 120,
      trailTimer: 0
    };

    // Varlık Havuzları
    this.stars = [];
    this.bullets = [];
    this.enemyBullets = [];
    this.asteroids = [];
    this.crystals = [];
    this.particles = [];
    this.floatingTexts = [];
    this.lasers = [];
    this.drones = [];
    this.terminals = [];
    this.boss = null;

    // Giriş Kontrolleri
    this.keys = {};
    this.pointer = { x: this.width / 2, y: this.height - 120, isDown: false };
    this.usingPointer = false;
    this.screenShake = 0;

    // Geri sayım / Zamanlayıcılar
    this.lastFrameTime = performance.now();
    this.shootTimer = 0;

    // DOM Elementleri
    this.dom = {
      hud: document.getElementById('hud'),
      hudStageNum: document.getElementById('hud-stage-num'),
      hudStageTitle: document.getElementById('hud-stage-title'),
      hudHpFill: document.getElementById('hud-hp-fill'),
      hudShieldFill: document.getElementById('hud-shield-fill'),
      hudScore: document.getElementById('hud-score'),
      hudObjectiveVal: document.getElementById('hud-objective-val'),
      hudObjectiveLabel: document.getElementById('hud-objective-label'),
      bossHud: document.getElementById('boss-hud'),
      bossHpFill: document.getElementById('boss-hp-fill'),
      bossPhase: document.getElementById('boss-phase'),
      toast: document.getElementById('game-toast'),
      menuScreen: document.getElementById('menu-screen'),
      stageClearScreen: document.getElementById('stage-clear-screen'),
      gameOverScreen: document.getElementById('game-over-screen'),
      victoryScreen: document.getElementById('victory-screen'),
      btnMute: document.getElementById('btn-mute'),
      btnPause: document.getElementById('btn-pause'),
      stageCards: document.querySelectorAll('.stage-card')
    };

    this.initStars();
    this.bindEvents();
    this.updateHUDDisplay();

    // Oyun Döngüsü Başlat
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  setupCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.resetTransform?.();
    this.ctx.scale(dpr, dpr);
  }

  initStars() {
    this.stars = [];
    const count = Math.floor((this.width * this.height) / 4500);
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() < 0.2 ? 2.2 : (Math.random() < 0.6 ? 1.4 : 0.8),
        speed: 0.3 + Math.random() * 1.5,
        alpha: 0.2 + Math.random() * 0.8,
        twinkleSpeed: 0.02 + Math.random() * 0.05
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.setupCanvas();
      this.initStars();
    });

    // Klavye
    window.addEventListener('keydown', (e) => {
      this.audio.init();
      this.keys[e.key.toLowerCase()] = true;
      this.usingPointer = false;

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        this.triggerShield();
      }
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        this.togglePause();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Fare / Pointer
    this.canvas.addEventListener('pointerdown', (e) => {
      this.audio.init();
      this.usingPointer = true;
      this.pointer.isDown = true;
      this.pointer.x = e.clientX;
      this.pointer.y = e.clientY;
    });

    this.canvas.addEventListener('pointermove', (e) => {
      if (this.pointer.isDown || this.usingPointer) {
        this.pointer.x = e.clientX;
        this.pointer.y = e.clientY;
      }
    });

    window.addEventListener('pointerup', () => {
      this.pointer.isDown = false;
    });

    // Mobil Kalkan Butonu
    const touchShieldBtn = document.getElementById('touch-shield-btn');
    if (touchShieldBtn) {
      touchShieldBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        this.audio.init();
        this.triggerShield();
      });
    }

    // Mobil Ateş Butonu
    const touchFireBtn = document.getElementById('touch-fire-btn');
    if (touchFireBtn) {
      touchFireBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        this.audio.init();
        this.firePlayerBullet();
      });
    }

    // UI Düğmeleri
    if (this.dom.btnMute) {
      this.dom.btnMute.addEventListener('click', () => {
        const isMuted = this.audio.toggleMute();
        this.dom.btnMute.innerHTML = isMuted
          ? `<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`
          : `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
      });
    }

    if (this.dom.btnPause) {
      this.dom.btnPause.addEventListener('click', () => this.togglePause());
    }

    // Menü Başlat Butonu
    const startBtn = document.getElementById('btn-start-game');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.audio.init();
        this.startStage(this.currentStage);
      });
    }

    // Aşama Seçici Kartları
    this.dom.stageCards.forEach((card) => {
      card.addEventListener('click', () => {
        this.audio.init();
        this.dom.stageCards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
        this.currentStage = parseInt(card.dataset.stage, 10);
      });
    });

    // Aşama Tamamlandı -> Sonraki Aşama
    const nextStageBtn = document.getElementById('btn-next-stage');
    if (nextStageBtn) {
      nextStageBtn.addEventListener('click', () => {
        this.audio.init();
        this.startStage(this.currentStage + 1);
      });
    }

    // Yeniden Başlat Butonları
    const restartBtns = document.querySelectorAll('.btn-restart');
    restartBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.audio.init();
        this.startStage(this.currentStage);
      });
    });

    // Ana Menü Butonları
    const homeBtns = document.querySelectorAll('.btn-home');
    homeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.showMenu();
      });
    });
  }

  showToast(text) {
    if (!this.dom.toast) return;
    this.dom.toast.textContent = text;
    this.dom.toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.toast.classList.remove('show');
    }, 2200);
  }

  togglePause() {
    if (this.state === 'PLAYING') {
      this.state = 'PAUSED';
      this.showToast('OYUN DURAKLATILDI (Devam etmek için ESC/P)');
    } else if (this.state === 'PAUSED') {
      this.state = 'PLAYING';
      this.showToast('DEVAM EDİLİYOR');
    }
  }

  showMenu() {
    this.state = 'MENU';
    this.dom.hud.classList.add('hidden');
    this.dom.bossHud.classList.add('hidden');
    this.hideAllModals();
    this.dom.menuScreen.classList.remove('hidden');
  }

  hideAllModals() {
    this.dom.menuScreen?.classList.add('hidden');
    this.dom.stageClearScreen?.classList.add('hidden');
    this.dom.gameOverScreen?.classList.add('hidden');
    this.dom.victoryScreen?.classList.add('hidden');
  }

  // --- AŞAMA BAŞLATMA ---
  startStage(stageNum) {
    this.currentStage = Math.min(Math.max(stageNum, 1), 3);
    this.state = 'PLAYING';
    this.stageStartTime = performance.now();
    this.hideAllModals();
    this.dom.hud.classList.remove('hidden');

    // Oyuncu Sıfırlama
    this.player.x = this.width / 2;
    this.player.y = this.height - 130;
    this.player.targetX = this.player.x;
    this.player.targetY = this.player.y;
    this.player.hp = this.player.maxHp;
    this.player.shield = this.player.maxShield;
    this.player.shieldActive = false;
    this.player.shieldTimer = 0;
    this.player.shieldCooldown = 0;
    this.player.invulnerableTimer = 0;
    this.player.energy = 0;
    this.player.terminalsHacked = 0;

    // Varlık Havuzlarını Temizle
    this.bullets = [];
    this.enemyBullets = [];
    this.asteroids = [];
    this.crystals = [];
    this.particles = [];
    this.floatingTexts = [];
    this.lasers = [];
    this.drones = [];
    this.terminals = [];
    this.boss = null;
    this.dom.bossHud.classList.add('hidden');

    // Aşamaya Göre Başlangıç Yapılandırması
    if (this.currentStage === 1) {
      this.dom.hudStageNum.textContent = 'Aşama 1/3 (Kolay)';
      this.dom.hudStageTitle.textContent = 'Meteor Tarlası';
      this.dom.hudObjectiveLabel.textContent = 'Enerji Kristali';
      this.showToast('AŞAMA 1: 1000 Enerji Topla ve Asteroitlerden Kaç!');
    } else if (this.currentStage === 2) {
      this.dom.hudStageNum.textContent = 'Aşama 2/3 (Orta)';
      this.dom.hudStageTitle.textContent = 'Lazer Labirenti';
      this.dom.hudObjectiveLabel.textContent = 'Hacklenen Terminal';
      this.setupStage2();
      this.showToast('AŞAMA 2: 4 Güvenlik Terminalini Hackle! (BOŞLUK = Kalkan)');
    } else if (this.currentStage === 3) {
      this.dom.hudStageNum.textContent = 'Aşama 3/3 (Zor)';
      this.dom.hudStageTitle.textContent = 'Kuantum Muhafızı';
      this.dom.hudObjectiveLabel.textContent = 'Boss Canı';
      this.setupStage3();
      this.showToast('AŞAMA 3: Kuantum Boss ile Nihai Savaş!');
    }

    this.updateHUDDisplay();
  }

  // --- AŞAMA 2 KURULUMU: LAZERLER, DRONLAR VE TERMİNALLER ---
  setupStage2() {
    // 4 Adet Terminal (farklı stratejik konumlarda)
    const pad = 90;
    const terminalPositions = [
      { x: pad + 40, y: pad + 60 },
      { x: this.width - pad - 40, y: pad + 60 },
      { x: pad + 40, y: this.height - pad - 120 },
      { x: this.width - pad - 40, y: this.height - pad - 120 }
    ];

    this.terminals = terminalPositions.map((pos, idx) => ({
      id: idx + 1,
      x: pos.x,
      y: pos.y,
      radius: 28,
      hacked: false,
      progress: 0,
      active: idx === 0 // Sırayla veya aynı anda hacklenebilir (aktif olanlar parlar)
    }));

    // Lazer Bariyerleri
    this.lasers = [
      {
        type: 'horizontal',
        y: this.height * 0.35,
        speed: 1.2,
        direction: 1,
        active: true,
        cycleTime: 0,
        period: 240, // 4 saniye döngü (2s açık, 2s kapalı)
        x1: 40,
        x2: this.width - 40
      },
      {
        type: 'rotating',
        cx: this.width / 2,
        cy: this.height * 0.45,
        length: Math.min(this.width * 0.35, 220),
        angle: 0,
        rotSpeed: 0.015,
        active: true
      }
    ];

    // 2 Adet Güvenlik Dronu
    this.drones = [
      {
        x: this.width * 0.25,
        y: 120,
        targetX: this.width * 0.25,
        targetY: 120,
        radius: 16,
        hp: 120,
        maxHp: 120,
        shootTimer: 0,
        shootInterval: 140
      },
      {
        x: this.width * 0.75,
        y: 120,
        targetX: this.width * 0.75,
        targetY: 120,
        radius: 16,
        hp: 120,
        maxHp: 120,
        shootTimer: 70,
        shootInterval: 140
      }
    ];
  }

  // --- AŞAMA 3 KURULUMU: BOSS MOTORU ---
  setupStage3() {
    this.dom.bossHud.classList.remove('hidden');
    this.boss = {
      x: this.width / 2,
      y: 140,
      targetX: this.width / 2,
      targetY: 140,
      width: 140,
      height: 90,
      radius: 55,
      hp: 1500,
      maxHp: 1500,
      phase: 1,
      angle: 0,
      attackTimer: 0,
      specialTimer: 0,
      laserCharging: false,
      laserChargeProgress: 0,
      laserActive: false,
      laserAngle: 0,
      vortexActive: false,
      satellites: [
        { angle: 0, radius: 85, hp: 120, maxHp: 120, active: false },
        { angle: Math.PI, radius: 85, hp: 120, maxHp: 120, active: false }
      ]
    };
  }

  // --- KALKAN AKTİVASYONU ---
  triggerShield() {
    if (this.state !== 'PLAYING') return;
    if (this.player.shield >= 35 && !this.player.shieldActive && this.player.shieldCooldown <= 0) {
      this.player.shieldActive = true;
      this.player.shieldTimer = 150; // 2.5 saniye
      this.player.shield -= 35;
      this.audio.shield();
      this.spawnParticles(this.player.x, this.player.y, '#38bdf8', 18);
      this.addFloatingText(this.player.x, this.player.y - 25, 'KALKAN AKTİF!', '#38bdf8');
    }
  }

  // --- ATEŞ ETME (Aşama 2 ve Aşama 3) ---
  firePlayerBullet() {
    if (this.state !== 'PLAYING') return;
    this.audio.shoot();

    // Aşama 1: Tek plazma, Aşama 2: Çift plazma, Aşama 3: Üçlü yaylım
    if (this.currentStage === 1) {
      this.bullets.push({
        x: this.player.x,
        y: this.player.y - 18,
        vx: 0,
        vy: -13,
        radius: 4,
        color: '#38bdf8',
        damage: 30
      });
    } else if (this.currentStage === 2) {
      this.bullets.push(
        { x: this.player.x - 10, y: this.player.y - 14, vx: 0, vy: -14, radius: 4, color: '#38bdf8', damage: 32 },
        { x: this.player.x + 10, y: this.player.y - 14, vx: 0, vy: -14, radius: 4, color: '#38bdf8', damage: 32 }
      );
    } else {
      this.bullets.push(
        { x: this.player.x - 12, y: this.player.y - 12, vx: -1.2, vy: -15, radius: 5, color: '#a855f7', damage: 35 },
        { x: this.player.x, y: this.player.y - 20, vx: 0, vy: -16, radius: 5, color: '#06b6d4', damage: 45 },
        { x: this.player.x + 12, y: this.player.y - 12, vx: 1.2, vy: -15, radius: 5, color: '#a855f7', damage: 35 }
      );
    }
  }

  // --- GÜNCELLEME DÖNGÜSÜ (TÜM MANTIK) ---
  update(dt) {
    if (this.state !== 'PLAYING') return;

    this.totalPlayTime += dt;

    // 1. Oyuncu Hareketi (Klavye veya Pointer)
    if (this.usingPointer) {
      const dx = this.pointer.x - this.player.x;
      const dy = this.pointer.y - this.player.y;
      this.player.x += dx * 0.18;
      this.player.y += dy * 0.18;
    } else {
      let vx = 0;
      let vy = 0;
      if (this.keys['arrowleft'] || this.keys['a']) vx -= this.player.speed;
      if (this.keys['arrowright'] || this.keys['d']) vx += this.player.speed;
      if (this.keys['arrowup'] || this.keys['w']) vy -= this.player.speed;
      if (this.keys['arrowdown'] || this.keys['s']) vy += this.player.speed;

      this.player.x += vx;
      this.player.y += vy;
    }

    // Ekran Sınırları
    const pad = 24;
    this.player.x = Math.max(pad, Math.min(this.width - pad, this.player.x));
    this.player.y = Math.max(pad, Math.min(this.height - pad, this.player.y));

    // Kalkan & Dokunulmazlık Yönetimi
    if (this.player.shieldActive) {
      this.player.shieldTimer--;
      if (this.player.shieldTimer <= 0) {
        this.player.shieldActive = false;
        this.player.shieldCooldown = 120; // 2 saniye bekleme
      }
    } else {
      if (this.player.shieldCooldown > 0) this.player.shieldCooldown--;
      // Kalkan yavaşça şarj olur
      if (this.player.shield < this.player.maxShield) {
        this.player.shield = Math.min(this.player.maxShield, this.player.shield + 0.12);
      }
    }

    if (this.player.invulnerableTimer > 0) {
      this.player.invulnerableTimer--;
    }

    // İtici Parçacıkları
    this.player.trailTimer++;
    if (this.player.trailTimer % 2 === 0) {
      this.particles.push({
        x: this.player.x + (Math.random() - 0.5) * 8,
        y: this.player.y + 16,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 3 + Math.random() * 3,
        size: 3.5,
        color: this.player.shieldActive ? '#38bdf8' : (Math.random() > 0.4 ? '#06b6d4' : '#f97316'),
        alpha: 0.8,
        life: 20
      });
    }

    // Otomatik / Basılı Ateş (Aşama 2 & 3'te veya Sol Tık'ta)
    this.shootTimer++;
    if (this.shootTimer >= (this.currentStage === 3 ? 10 : 14)) {
      if (this.currentStage >= 2 || this.pointer.isDown || this.keys[' ']) {
        this.firePlayerBullet();
        this.shootTimer = 0;
      }
    }

    // Mermileri Güncelle
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.x += b.vx;
      b.y += b.vy;
      if (b.y < -20 || b.x < -20 || b.x > this.width + 20) {
        this.bullets.splice(i, 1);
      }
    }

    // Düşman Mermilerini Güncelle
    for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      const eb = this.enemyBullets[i];
      eb.x += eb.vx;
      eb.y += eb.vy;

      // Oyuncu ile Çarpışma
      const dist = Math.hypot(eb.x - this.player.x, eb.y - this.player.y);
      if (dist < eb.radius + this.player.radius) {
        if (this.player.shieldActive) {
          // Kalkan mermiyi saptırır
          this.audio.shield();
          this.spawnParticles(eb.x, eb.y, '#38bdf8', 8);
          this.addFloatingText(eb.x, eb.y, 'ENGELENDİ', '#38bdf8');
          this.enemyBullets.splice(i, 1);
        } else {
          this.damagePlayer(eb.damage || 18);
          this.spawnParticles(eb.x, eb.y, '#ef4444', 12);
          this.enemyBullets.splice(i, 1);
        }
        continue;
      }

      if (eb.y > this.height + 40 || eb.y < -40 || eb.x < -40 || eb.x > this.width + 40) {
        this.enemyBullets.splice(i, 1);
      }
    }

    // Aşamaya Özel Mantık
    if (this.currentStage === 1) {
      this.updateStage1();
    } else if (this.currentStage === 2) {
      this.updateStage2();
    } else if (this.currentStage === 3) {
      this.updateStage3();
    }

    // Parçacıkları ve Kayan Metinleri Güncelle
    this.updateParticles();
    this.updateHUDDisplay();

    if (this.screenShake > 0) this.screenShake *= 0.88;
  }

  // --- AŞAMA 1: ASTEROİT VE ENERJİ KRİSTALİ MOTORU ---
  updateStage1() {
    // Kristal Üretimi
    if (Math.random() < 0.04 && this.crystals.length < 8) {
      const isGold = Math.random() < 0.25;
      this.crystals.push({
        x: 30 + Math.random() * (this.width - 60),
        y: -30,
        vy: 2.2 + Math.random() * 2,
        radius: isGold ? 14 : 11,
        isGold,
        points: isGold ? 120 : 40,
        color: isGold ? '#fbbf24' : '#38bdf8',
        angle: 0
      });
    }

    // Asteroit Üretimi (Zorluk puana göre artar)
    const baseSpawnRate = 0.035 + (this.player.energy / 1000) * 0.04;
    if (Math.random() < baseSpawnRate && this.asteroids.length < 14) {
      const sizeType = Math.random();
      const radius = sizeType < 0.5 ? 18 : (sizeType < 0.85 ? 32 : 48);
      this.asteroids.push({
        x: Math.random() * this.width,
        y: -60,
        vx: (Math.random() - 0.5) * 2.2,
        vy: 2.5 + Math.random() * 3.5 + (this.player.energy / 1000) * 2,
        radius,
        hp: radius > 30 ? 60 : 30,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.06
      });
    }

    // Kristalleri Güncelle
    for (let i = this.crystals.length - 1; i >= 0; i--) {
      const c = this.crystals[i];
      c.y += c.vy;
      c.angle += 0.04;

      // Mıknatıs Etkisi (Oyuncuya Yaklaşınca)
      const dist = Math.hypot(c.x - this.player.x, c.y - this.player.y);
      if (dist < 110) {
        c.x += (this.player.x - c.x) * 0.12;
        c.y += (this.player.y - c.y) * 0.12;
      }

      // Toplama Kontrolü
      if (dist < c.radius + this.player.radius) {
        this.audio.crystal();
        this.player.energy += c.points;
        this.score += c.points;
        this.addFloatingText(c.x, c.y, `+${c.points}`, c.color);
        this.spawnParticles(c.x, c.y, c.color, 14);
        this.crystals.splice(i, 1);

        // Hedefe Ulaşıldı mı?
        if (this.player.energy >= this.player.energyGoal) {
          this.completeStage();
          return;
        }
        continue;
      }

      if (c.y > this.height + 40) {
        this.crystals.splice(i, 1);
      }
    }

    // Asteroitleri Güncelle
    for (let i = this.asteroids.length - 1; i >= 0; i--) {
      const a = this.asteroids[i];
      a.x += a.vx;
      a.y += a.vy;
      a.angle += a.rotSpeed;

      // Oyuncu ile Çarpışma
      const dist = Math.hypot(a.x - this.player.x, a.y - this.player.y);
      if (dist < a.radius + this.player.radius) {
        if (this.player.shieldActive) {
          this.audio.hit();
          this.spawnParticles(a.x, a.y, '#94a3b8', 16);
          this.addFloatingText(a.x, a.y, 'SAVURULDU!', '#38bdf8');
          this.asteroids.splice(i, 1);
        } else {
          this.damagePlayer(25);
          this.spawnParticles(a.x, a.y, '#f97316', 20);
          this.asteroids.splice(i, 1);
        }
        continue;
      }

      // Mermiler ile Çarpışma
      for (let j = this.bullets.length - 1; j >= 0; j--) {
        const b = this.bullets[j];
        if (Math.hypot(a.x - b.x, a.y - b.y) < a.radius + b.radius) {
          a.hp -= b.damage;
          this.spawnParticles(b.x, b.y, '#38bdf8', 6);
          this.bullets.splice(j, 1);

          if (a.hp <= 0) {
            this.audio.hit();
            this.score += a.radius > 30 ? 50 : 25;
            this.spawnParticles(a.x, a.y, '#cbd5e1', 18);
            this.asteroids.splice(i, 1);
            break;
          }
        }
      }

      if (a.y > this.height + 60) {
        this.asteroids.splice(i, 1);
      }
    }
  }

  // --- AŞAMA 2: LAZER LABİRENTİ VE TERMİNAL MOTORU ---
  updateStage2() {
    // 1. Terminal İlerlemesi
    let standingOnAny = false;
    this.terminals.forEach((term) => {
      if (term.hacked) return;
      const dist = Math.hypot(term.x - this.player.x, term.y - this.player.y);
      if (dist < term.radius + 14) {
        standingOnAny = true;
        term.progress += 0.85; // ~2 saniyede hackler
        if (Math.random() < 0.3) {
          this.spawnParticles(term.x + (Math.random() - 0.5) * 30, term.y + (Math.random() - 0.5) * 30, '#10b981', 2);
        }

        if (term.progress >= 100) {
          term.hacked = true;
          this.player.terminalsHacked++;
          this.score += 300;
          this.audio.stageWin();
          this.addFloatingText(term.x, term.y - 30, 'TERMİNAL HACKLENDİ!', '#10b981');
          this.spawnParticles(term.x, term.y, '#10b981', 30);
          this.showToast(`GÜVENLİK AĞI: ${this.player.terminalsHacked}/4 Tamamlandı!`);

          if (this.player.terminalsHacked >= 4) {
            this.completeStage();
            return;
          }
        }
      } else {
        // İlerlemeyi yavaşça kaybetme (oyuncu ayrılırsa)
        if (term.progress > 0 && !term.hacked) {
          term.progress = Math.max(0, term.progress - 0.4);
        }
      }
    });

    // 2. Lazer Bariyerlerini Güncelle
    this.lasers.forEach((l) => {
      if (l.type === 'horizontal') {
        l.cycleTime = (l.cycleTime + 1) % l.period;
        l.active = l.cycleTime < l.period * 0.6; // %60 süre aktif
        l.y += l.speed * l.direction;
        if (l.y < this.height * 0.25 || l.y > this.height * 0.65) {
          l.direction *= -1;
        }

        // Çarpışma Kontrolü
        if (l.active && Math.abs(this.player.y - l.y) < 14) {
          if (this.player.shieldActive) {
            this.addFloatingText(this.player.x, this.player.y, 'LAZER SAVURULDU', '#38bdf8');
          } else {
            this.damagePlayer(20);
            this.spawnParticles(this.player.x, l.y, '#ef4444', 15);
          }
        }
      } else if (l.type === 'rotating') {
        l.angle += l.rotSpeed;
        const x2 = l.cx + Math.cos(l.angle) * l.length;
        const y2 = l.cy + Math.sin(l.angle) * l.length;

        // Nokta-Çizgi Mesafesi
        const dist = this.distToSegment({ x: this.player.x, y: this.player.y }, { x: l.cx, y: l.cy }, { x: x2, y: y2 });
        if (dist < this.player.radius + 6) {
          if (this.player.shieldActive) {
            this.addFloatingText(this.player.x, this.player.y, 'DÖNER LAZER SAVURULDU', '#38bdf8');
          } else {
            this.damagePlayer(22);
            this.spawnParticles(this.player.x, this.player.y, '#ef4444', 15);
          }
        }
      }
    });

    // 3. Dronları Güncelle
    this.drones.forEach((d) => {
      // Dron Hareketi (Yavaşça oyuncuya yaklaşır veya devriye atar)
      d.x += Math.sin(performance.now() * 0.002 + d.y) * 1.6;
      d.shootTimer++;

      if (d.shootTimer >= d.shootInterval) {
        d.shootTimer = 0;
        this.audio.shoot();
        const angle = Math.atan2(this.player.y - d.y, this.player.x - d.x);
        this.enemyBullets.push({
          x: d.x,
          y: d.y + 12,
          vx: Math.cos(angle) * 4.2,
          vy: Math.sin(angle) * 4.2,
          radius: 5,
          color: '#f43f5e',
          damage: 18
        });
      }

      // Mermiler ile Dron Vurulması
      for (let j = this.bullets.length - 1; j >= 0; j--) {
        const b = this.bullets[j];
        if (Math.hypot(d.x - b.x, d.y - b.y) < d.radius + b.radius) {
          d.hp -= b.damage;
          this.bullets.splice(j, 1);
          this.spawnParticles(b.x, b.y, '#f43f5e', 8);

          if (d.hp <= 0) {
            this.audio.hit();
            this.score += 150;
            this.spawnParticles(d.x, d.y, '#f59e0b', 24);
            // Yeniden doğma hazırlığı
            d.hp = d.maxHp;
            d.x = Math.random() * (this.width - 100) + 50;
            d.y = 80;
            this.addFloatingText(d.x, d.y, 'DRON İMHA EDİLDİ!', '#f59e0b');
          }
          break;
        }
      }
    });
  }

  // --- AŞAMA 3: KUANTUM MUHAFIZI BOSS MOTORU ---
  updateStage3() {
    if (!this.boss) return;
    const b = this.boss;

    // Faz Geçişleri (1500 HP üzerinden)
    if (b.hp <= b.maxHp * 0.35 && b.phase !== 3) {
      b.phase = 3;
      this.audio.bossLaser();
      this.showToast('UYARI: BOSS ÇILGIN OVERDRIVE MODUNDA!');
      this.screenShake = 16;
      b.satellites.forEach((s) => (s.active = true));
    } else if (b.hp <= b.maxHp * 0.7 && b.phase === 1) {
      b.phase = 2;
      this.showToast('FAZ 2: KUANTUM GİRDABI & LAZER TARAMASI!');
      this.screenShake = 10;
    }

    // Boss Hareketi (Sallanarak ve oyuncunun üstünde kalarak)
    b.x = this.width / 2 + Math.sin(performance.now() * 0.0015) * (this.width * 0.32);
    b.y = 120 + Math.cos(performance.now() * 0.002) * 25;

    // Faz 3 Uyduları Güncelle
    if (b.phase === 3) {
      b.satellites.forEach((s) => {
        if (!s.active) return;
        s.angle += 0.035;
        const satX = b.x + Math.cos(s.angle) * s.radius;
        const satY = b.y + Math.sin(s.angle) * s.radius;

        // Uydu ateş eder
        if (Math.random() < 0.02) {
          const angle = Math.atan2(this.player.y - satY, this.player.x - satX);
          this.enemyBullets.push({
            x: satX,
            y: satY,
            vx: Math.cos(angle) * 4.5,
            vy: Math.sin(angle) * 4.5,
            radius: 4,
            color: '#ec4899',
            damage: 15
          });
        }
      });
    }

    // Boss Saldırı Döngüsü
    b.attackTimer++;

    // 1. Spiral Mermi Yağmuru (Her 40 tickte bir)
    if (b.attackTimer % (b.phase === 3 ? 24 : 36) === 0) {
      const bulletCount = b.phase === 3 ? 12 : (b.phase === 2 ? 8 : 6);
      const baseAngle = performance.now() * 0.003;
      for (let i = 0; i < bulletCount; i++) {
        const angle = baseAngle + (i * (Math.PI * 2)) / bulletCount;
        this.enemyBullets.push({
          x: b.x,
          y: b.y + 30,
          vx: Math.cos(angle) * (b.phase === 3 ? 4.8 : 3.8),
          vy: Math.sin(angle) * (b.phase === 3 ? 4.8 : 3.8),
          radius: 5,
          color: b.phase === 3 ? '#ec4899' : '#a855f7',
          damage: 16
        });
      }
    }

    // 2. Faz 2 & 3: Kuantum Girdabı (Oyuncuyu yavaşça merkeze çeker)
    if (b.phase >= 2) {
      const centerDist = Math.hypot(b.x - this.player.x, b.y + 150 - this.player.y);
      if (centerDist < 300) {
        this.player.x += ((b.x - this.player.x) / centerDist) * 0.8;
        this.player.y += ((b.y + 150 - this.player.y) / centerDist) * 0.8;
      }
    }

    // 3. Büyük Lazer Taraması (Her 240 tickte bir)
    b.specialTimer++;
    if (b.specialTimer > 220) {
      b.laserCharging = true;
      b.laserChargeProgress = Math.min(1, (b.specialTimer - 220) / 40);

      if (b.specialTimer > 260) {
        b.laserActive = true;
        this.audio.bossLaser();

        // Lazer Süpürmesi
        const laserSweep = Math.sin((b.specialTimer - 260) * 0.08) * 0.7;
        const targetAngle = Math.PI / 2 + laserSweep;
        const lx2 = b.x + Math.cos(targetAngle) * this.height;
        const ly2 = b.y + Math.sin(targetAngle) * this.height;

        const dist = this.distToSegment({ x: this.player.x, y: this.player.y }, { x: b.x, y: b.y + 20 }, { x: lx2, y: ly2 });
        if (dist < this.player.radius + 16) {
          if (this.player.shieldActive) {
            this.addFloatingText(this.player.x, this.player.y, 'MEGA LAZER SAVURULDU!', '#38bdf8');
          } else {
            this.damagePlayer(28);
            this.screenShake = 8;
          }
        }

        if (b.specialTimer > 320) {
          b.specialTimer = 0;
          b.laserCharging = false;
          b.laserActive = false;
        }
      }
    }

    // Mermiler ile Boss'a Vuruş Kontrolü
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      if (Math.hypot(bullet.x - b.x, bullet.y - b.y) < b.radius + bullet.radius) {
        b.hp -= bullet.damage;
        this.score += 20;
        this.bullets.splice(i, 1);
        this.spawnParticles(bullet.x, bullet.y, '#ec4899', 8);

        // Can Düştükçe Boss Tepkisi
        if (b.hp <= 0) {
          this.destroyBoss();
          return;
        }
      }
    }
  }

  destroyBoss() {
    this.audio.stageWin();
    this.score += 2500;
    this.screenShake = 35;
    this.spawnParticles(this.boss.x, this.boss.y, '#ec4899', 80);
    this.spawnParticles(this.boss.x, this.boss.y, '#fbbf24', 60);
    this.boss = null;
    this.completeStage();
  }

  // --- HASAR ALMA ---
  damagePlayer(amount) {
    if (this.player.invulnerableTimer > 0) return;

    this.player.hp -= amount;
    this.player.invulnerableTimer = 55; // ~1 saniye dokunulmazlık
    this.screenShake = 12;
    this.audio.hit();
    this.addFloatingText(this.player.x, this.player.y - 30, `-${amount} CAN`, '#ef4444');

    if (this.player.hp <= 0) {
      this.player.hp = 0;
      this.gameOver();
    }
  }

  // --- AŞAMA TAMAMLAMA & ZAFER ---
  completeStage() {
    this.audio.stageWin();

    if (this.currentStage < 3) {
      this.state = 'STAGE_CLEAR';
      this.dom.hud.classList.add('hidden');
      this.dom.bossHud.classList.add('hidden');

      const titleEl = document.getElementById('clear-stage-title');
      const statsEl = document.getElementById('clear-stage-stats');
      if (titleEl) titleEl.textContent = `AŞAMA ${this.currentStage} TAMAMLANDI!`;
      if (statsEl) {
        statsEl.innerHTML = `
          <div class="stat-cell"><div class="stat-title">Aşama Skoru</div><div class="stat-val font-mono">${this.score}</div></div>
          <div class="stat-cell"><div class="stat-title">Kalan Can</div><div class="stat-val font-mono">${Math.round(this.player.hp)}%</div></div>
          <div class="stat-cell"><div class="stat-title">Sonraki Aşama</div><div class="stat-val font-mono">Aşama ${this.currentStage + 1}</div></div>
        `;
      }
      this.dom.stageClearScreen.classList.remove('hidden');
    } else {
      // Grand Victory
      this.state = 'VICTORY';
      this.dom.hud.classList.add('hidden');
      this.dom.bossHud.classList.add('hidden');

      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('kozmik_highscore', this.highScore.toString());
      }

      const vicScoreEl = document.getElementById('victory-score');
      const vicStatsEl = document.getElementById('victory-stats');
      if (vicScoreEl) vicScoreEl.textContent = this.score;
      if (vicStatsEl) {
        vicStatsEl.innerHTML = `
          <div class="stat-cell"><div class="stat-title">Toplam Skor</div><div class="stat-val">${this.score}</div></div>
          <div class="stat-cell"><div class="stat-title">En Yüksek Skor</div><div class="stat-val">${this.highScore}</div></div>
          <div class="stat-cell"><div class="stat-title">Derece</div><div class="stat-val text-emerald-400">S+ MASTER</div></div>
        `;
      }
      this.dom.victoryScreen.classList.remove('hidden');
    }
  }

  gameOver() {
    this.state = 'GAME_OVER';
    this.audio.gameOver();
    this.dom.hud.classList.add('hidden');
    this.dom.bossHud.classList.add('hidden');

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('kozmik_highscore', this.highScore.toString());
    }

    const goScoreEl = document.getElementById('game-over-score');
    if (goScoreEl) goScoreEl.textContent = this.score;
    this.dom.gameOverScreen.classList.remove('hidden');
  }

  // --- PARÇACIK VE GÖRSEL EFEKTLER ---
  spawnParticles(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3,
        color,
        alpha: 1,
        life: 25 + Math.random() * 20
      });
    }
  }

  addFloatingText(x, y, text, color = '#fff') {
    this.floatingTexts.push({
      x,
      y,
      text,
      color,
      alpha: 1,
      vy: -1.2,
      life: 40
    });
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.life--;
      p.alpha = Math.max(0, p.life / 35);
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy;
      ft.life--;
      ft.alpha = Math.max(0, ft.life / 40);
      if (ft.life <= 0) this.floatingTexts.splice(i, 1);
    }
  }

  updateHUDDisplay() {
    if (!this.dom.hudHpFill) return;

    // HP & Kalkan
    const hpPct = Math.max(0, (this.player.hp / this.player.maxHp) * 100);
    const shieldPct = Math.max(0, (this.player.shield / this.player.maxShield) * 100);
    this.dom.hudHpFill.style.width = `${hpPct}%`;
    this.dom.hudShieldFill.style.width = `${shieldPct}%`;
    this.dom.hudScore.textContent = this.score;

    // Aşamaya Göre Hedef Göstergesi
    if (this.currentStage === 1) {
      this.dom.hudObjectiveVal.textContent = `${this.player.energy}/${this.player.energyGoal}`;
    } else if (this.currentStage === 2) {
      this.dom.hudObjectiveVal.textContent = `${this.player.terminalsHacked}/4`;
    } else if (this.currentStage === 3 && this.boss) {
      this.dom.hudObjectiveVal.textContent = `${Math.max(0, Math.round(this.boss.hp))}`;
      const bossHpPct = Math.max(0, (this.boss.hp / this.boss.maxHp) * 100);
      this.dom.bossHpFill.style.width = `${bossHpPct}%`;
      this.dom.bossPhase.textContent = `FAZ ${this.boss.phase}/3`;
    }
  }

  distToSegment(p, v, w) {
    const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
    if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
  }

  // --- ÇİZİM DÖNGÜSÜ (CANVAS RENDER) ---
  render() {
    this.ctx.save();

    // Ekran Sarsıntısı
    if (this.screenShake > 0.5) {
      const shakeX = (Math.random() - 0.5) * this.screenShake;
      const shakeY = (Math.random() - 0.5) * this.screenShake;
      this.ctx.translate(shakeX, shakeY);
    }

    // Arka Plan Temizleme
    this.ctx.fillStyle = '#070a13';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 1. Yıldız Katmanı (Paralaks)
    this.renderStars();

    if (this.state === 'PLAYING' || this.state === 'PAUSED') {
      // 2. Aşamaya Özel Zemin Çizimleri (Aşama 2 Terminals vb.)
      if (this.currentStage === 2) this.renderStage2Entities();
      if (this.currentStage === 3) this.renderStage3Entities();

      // 3. Kristalleri Çiz (Aşama 1)
      this.renderCrystals();

      // 4. Asteroitleri Çiz (Aşama 1)
      this.renderAsteroids();

      // 5. Mermileri Çiz
      this.renderBullets();

      // 6. Oyuncu Gemisini Çiz
      this.renderPlayer();

      // 7. Parçacıklar ve Metinler
      this.renderParticles();
    }

    this.ctx.restore();
  }

  renderStars() {
    this.stars.forEach((s) => {
      s.y += s.speed * (this.currentStage === 1 ? 1.5 : 1.0);
      if (s.y > this.height) s.y = 0;

      s.alpha += Math.sin(performance.now() * s.twinkleSpeed) * 0.05;
      const alpha = Math.max(0.1, Math.min(0.9, s.alpha));

      this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  renderPlayer() {
    const p = this.player;

    // Dokunulmazlıkta Yanıp Sönme
    if (p.invulnerableTimer > 0 && Math.floor(p.invulnerableTimer / 4) % 2 === 0) {
      return;
    }

    this.ctx.save();
    this.ctx.translate(p.x, p.y);

    // Kalkan Küresi (Aktifse)
    if (p.shieldActive) {
      this.ctx.strokeStyle = '#38bdf8';
      this.ctx.lineWidth = 2.5;
      this.ctx.shadowColor = '#38bdf8';
      this.ctx.shadowBlur = 16;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, p.radius + 12, 0, Math.PI * 2);
      this.ctx.stroke();

      this.ctx.fillStyle = 'rgba(56, 189, 248, 0.14)';
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    // Gemi Gövdesi (Modern Taktik Avcı Gemisi)
    this.ctx.fillStyle = '#1e293b';
    this.ctx.strokeStyle = '#06b6d4';
    this.ctx.lineWidth = 2;

    this.ctx.beginPath();
    this.ctx.moveTo(0, -20); // Burun
    this.ctx.lineTo(16, 14);  // Sağ kanat ucu
    this.ctx.lineTo(6, 10);   // Sağ gövde girintisi
    this.ctx.lineTo(0, 16);   // İtici merkezi
    this.ctx.lineTo(-6, 10);  // Sol gövde girintisi
    this.ctx.lineTo(-16, 14); // Sol kanat ucu
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // Kokpit Camı
    this.ctx.fillStyle = '#38bdf8';
    this.ctx.beginPath();
    this.ctx.ellipse(0, -4, 4, 8, 0, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }

  renderCrystals() {
    this.crystals.forEach((c) => {
      this.ctx.save();
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate(c.angle);

      this.ctx.fillStyle = c.color;
      this.ctx.shadowColor = c.color;
      this.ctx.shadowBlur = 12;

      // Sekizgen Kristal Şekli
      this.ctx.beginPath();
      this.ctx.moveTo(0, -c.radius);
      this.ctx.lineTo(c.radius * 0.7, 0);
      this.ctx.lineTo(0, c.radius);
      this.ctx.lineTo(-c.radius * 0.7, 0);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.restore();
    });
  }

  renderAsteroids() {
    this.asteroids.forEach((a) => {
      this.ctx.save();
      this.ctx.translate(a.x, a.y);
      this.ctx.rotate(a.angle);

      this.ctx.fillStyle = '#334155';
      this.ctx.strokeStyle = '#64748b';
      this.ctx.lineWidth = 2;

      // Pürüzlü Kaya Çizimi
      this.ctx.beginPath();
      const points = 7;
      for (let i = 0; i < points; i++) {
        const rad = a.radius * (0.8 + ((i % 2) * 0.3));
        const theta = (i * Math.PI * 2) / points;
        const px = Math.cos(theta) * rad;
        const py = Math.sin(theta) * rad;
        if (i === 0) this.ctx.moveTo(px, py);
        else this.ctx.lineTo(px, py);
      }
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // Krater Detayı
      this.ctx.fillStyle = '#1e293b';
      this.ctx.beginPath();
      this.ctx.arc(a.radius * 0.25, a.radius * 0.2, a.radius * 0.22, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    });
  }

  renderStage2Entities() {
    // 1. Güvenlik Terminalleri
    this.terminals.forEach((t) => {
      this.ctx.save();
      this.ctx.translate(t.x, t.y);

      // Dış Halka
      this.ctx.strokeStyle = t.hacked ? '#10b981' : (t.progress > 0 ? '#fbbf24' : '#475569');
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, t.radius, 0, Math.PI * 2);
      this.ctx.stroke();

      // İlerleme Yayı
      if (t.progress > 0 && !t.hacked) {
        this.ctx.strokeStyle = '#10b981';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, t.radius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * (t.progress / 100)));
        this.ctx.stroke();
      }

      // İç Çekirdek
      this.ctx.fillStyle = t.hacked ? 'rgba(16, 185, 129, 0.4)' : 'rgba(30, 41, 59, 0.7)';
      this.ctx.beginPath();
      this.ctx.arc(0, 0, t.radius * 0.6, 0, Math.PI * 2);
      this.ctx.fill();

      // Terminal Numarası
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '700 12px var(--font-mono)';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(t.hacked ? '✓' : `T${t.id}`, 0, 0);

      this.ctx.restore();
    });

    // 2. Lazer Bariyerleri
    this.lasers.forEach((l) => {
      this.ctx.save();
      if (l.type === 'horizontal') {
        if (l.active) {
          this.ctx.strokeStyle = '#ef4444';
          this.ctx.lineWidth = 4;
          this.ctx.shadowColor = '#ef4444';
          this.ctx.shadowBlur = 14;
          this.ctx.beginPath();
          this.ctx.moveTo(l.x1, l.y);
          this.ctx.lineTo(l.x2, l.y);
          this.ctx.stroke();
        } else {
          // Kesik çizgi uyarı fazı
          this.ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
          this.ctx.setLineDash([8, 8]);
          this.ctx.lineWidth = 2;
          this.ctx.beginPath();
          this.ctx.moveTo(l.x1, l.y);
          this.ctx.lineTo(l.x2, l.y);
          this.ctx.stroke();
        }
      } else if (l.type === 'rotating') {
        const x2 = l.cx + Math.cos(l.angle) * l.length;
        const y2 = l.cy + Math.sin(l.angle) * l.length;

        this.ctx.strokeStyle = '#06b6d4';
        this.ctx.lineWidth = 3.5;
        this.ctx.shadowColor = '#06b6d4';
        this.ctx.shadowBlur = 14;
        this.ctx.beginPath();
        this.ctx.moveTo(l.cx, l.cy);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();

        // Merkez Düğümü
        this.ctx.fillStyle = '#38bdf8';
        this.ctx.beginPath();
        this.ctx.arc(l.cx, l.cy, 9, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    });

    // 3. Güvenlik Dronları
    this.drones.forEach((d) => {
      this.ctx.save();
      this.ctx.translate(d.x, d.y);

      this.ctx.fillStyle = '#1e1b4b';
      this.ctx.strokeStyle = '#ec4899';
      this.ctx.lineWidth = 2;

      this.ctx.beginPath();
      this.ctx.arc(0, 0, d.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      // Dron Gözü
      this.ctx.fillStyle = '#f43f5e';
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 5, 0, Math.PI * 2);
      this.ctx.fill();

      // Can Çubuğu
      this.ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
      this.ctx.fillRect(-14, -d.radius - 8, (d.hp / d.maxHp) * 28, 4);

      this.ctx.restore();
    });
  }

  renderStage3Entities() {
    if (!this.boss) return;
    const b = this.boss;

    this.ctx.save();
    this.ctx.translate(b.x, b.y);

    // Kuantum Girdabı Efekti (Faz 2+)
    if (b.phase >= 2) {
      this.ctx.save();
      this.ctx.rotate(performance.now() * 0.002);
      this.ctx.strokeStyle = 'rgba(147, 51, 234, 0.25)';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(0, 150, 120, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Mega Lazer Işını (Aktifse)
    if (b.laserActive) {
      this.ctx.save();
      this.ctx.strokeStyle = '#f43f5e';
      this.ctx.lineWidth = 28;
      this.ctx.shadowColor = '#f43f5e';
      this.ctx.shadowBlur = 25;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 20);
      this.ctx.lineTo(0, this.height);
      this.ctx.stroke();
      this.ctx.restore();
    } else if (b.laserCharging) {
      // Şarj Uyarısı
      this.ctx.strokeStyle = `rgba(244, 63, 94, ${b.laserChargeProgress})`;
      this.ctx.setLineDash([6, 6]);
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 20);
      this.ctx.lineTo(0, this.height);
      this.ctx.stroke();
    }

    // Boss Gövdesi
    this.ctx.fillStyle = '#0f172a';
    this.ctx.strokeStyle = b.phase === 3 ? '#ec4899' : '#9333ea';
    this.ctx.lineWidth = 3.5;
    this.ctx.shadowColor = this.ctx.strokeStyle;
    this.ctx.shadowBlur = 20;

    this.ctx.beginPath();
    this.ctx.moveTo(-60, -30);
    this.ctx.lineTo(60, -30);
    this.ctx.lineTo(75, 10);
    this.ctx.lineTo(35, 45);
    this.ctx.lineTo(0, 55);
    this.ctx.lineTo(-35, 45);
    this.ctx.lineTo(-75, 10);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // Çekirdek Kristali
    this.ctx.fillStyle = b.phase === 3 ? '#f43f5e' : '#38bdf8';
    this.ctx.beginPath();
    this.ctx.arc(0, 10, 16, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();

    // Faz 3 Savunma Uyduları
    if (b.phase === 3) {
      b.satellites.forEach((s) => {
        if (!s.active) return;
        const satX = b.x + Math.cos(s.angle) * s.radius;
        const satY = b.y + Math.sin(s.angle) * s.radius;

        this.ctx.save();
        this.ctx.translate(satX, satY);
        this.ctx.fillStyle = '#ec4899';
        this.ctx.shadowColor = '#ec4899';
        this.ctx.shadowBlur = 10;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      });
    }
  }

  renderBullets() {
    // Oyuncu Mermileri
    this.bullets.forEach((b) => {
      this.ctx.save();
      this.ctx.fillStyle = b.color;
      this.ctx.shadowColor = b.color;
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Düşman Mermileri
    this.enemyBullets.forEach((eb) => {
      this.ctx.save();
      this.ctx.fillStyle = eb.color;
      this.ctx.shadowColor = eb.color;
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.arc(eb.x, eb.y, eb.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  renderParticles() {
    this.particles.forEach((p) => {
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    this.floatingTexts.forEach((ft) => {
      this.ctx.save();
      this.ctx.globalAlpha = ft.alpha;
      this.ctx.fillStyle = ft.color;
      this.ctx.font = '700 13px var(--font-mono)';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(ft.text, ft.x, ft.y);
      this.ctx.restore();
    });
  }

  // --- ANA OYUN DÖNGÜSÜ (60 FPS) ---
  gameLoop(currentTime) {
    const dt = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;

    this.update(dt);
    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }
}

// Oyunu Sayfa Yüklendiğinde Başlat
window.addEventListener('DOMContentLoaded', () => {
  window.gameApp = new GameApp();
});
