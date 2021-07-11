'use strict';


const MAX_ENEMY = 7,
    HEIGHT_ELEM = 100,
    bg = document.querySelector('.bg'),
    content = document.querySelector('.content'),
    game = document.querySelector('.game'),  
    score = document.querySelector('.score'),
    stc = document.querySelector('.stc'),
    start = document.querySelector('.start'),
    gameSettings = document.querySelector('.settings'),
    exit = document.querySelector('.exit'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div'),
    music = new Audio('./src/audio/main-theme.mp3');

    music.volume = 0.5;

car.classList.add('car');
score.classList.add('hide');
stc.classList.add('hide');
gameArea.classList.add('hide');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3,
    record: localStorage.getItem('best-record'),
};

let startSpeed = 2;

const changeLevel = (lvl) => {
    switch (lvl) {
        case 'easy':
            setting.traffic = 4;
            setting.speed = 3;
            break;
        case 'normal':
            setting.traffic = 3;
            setting.speed = 6;
            break;
        case 'hard':
            setting.traffic = 3;
            setting.speed = 8;
            break;
    }
    startSpeed = setting.speed;
};

music.play();

const getQuantityElements = (heightElement) => 
(gameArea.offsetHeight / heightElement) + 1;

const getRandomEnemy = (max) => Math.floor((Math.random() * max) + 1);


const moveRoad = () => {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if(line.y >= gameArea.offsetHeight) {
            line.y = -HEIGHT_ELEM;
        }
    });
};

const moveEnemy = () => {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach((item) => {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
                setting.start = false;
                if (setting.score > setting.record) {
                    localStorage.setItem('best-record', setting.score);
                    alert(`Ура новый рекорд вы набрали на ${setting.score - setting.record} очков больше!`);
                    setting.record = setting.score;
                }
            }

        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= gameArea.offsetHeight) {
            item.y = -HEIGHT_ELEM * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-HEIGHT_ELEM)) + 'px'; 
        }
    });
};

const playGame = () => {
    if (setting.start){
    setting.score+= setting.speed;
    score.innerHTML = `
            <p>SCORE: ${setting.score}</p>
            ${setting.record ? `<p>Best record: ${setting.record}</p>` : ''}`;

            stc.innerHTML = `<p>SPEED: ${setting.speed}</p>`;

		setting.speed = startSpeed + Math.floor(setting.score / 5000);
    
    
    moveRoad();
    moveEnemy();
    
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x-=setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x+=setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y+=setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y-=setting.speed;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
};

const startGame = (event) => {
    const target = event.target;
    const levelGame = target.dataset.levelGame;
    changeLevel(levelGame);
    music.pause();
    stc.classList.remove('hide');
    score.classList.remove('hide');
    bg.style.background = 'rgba(57, 143, 0, 0.8)';
    bg.style.filter = 'blur(0px)';
    content.style.background = 'rgba(0, 0, 0, 0.1)';
    start.classList.add('hide');
    gameSettings.classList.add('hide');
    exit.classList.add('hide');
    gameArea.classList.remove('hide');
    gameArea.style.minHeight = 850 + 'px';
    gameArea.innerHTML = '';

    for (let i = 0; i < getQuantityElements(HEIGHT_ELEM); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.y = i * HEIGHT_ELEM;
        line.style.top = (i * HEIGHT_ELEM);
        line.style.height = (HEIGHT_ELEM / 2);
        gameArea.append(line);
        
    }

    for (let i = 0; i < getQuantityElements(HEIGHT_ELEM * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -HEIGHT_ELEM * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-HEIGHT_ELEM)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `
        transparent 
        url('./src/images/enemy${getRandomEnemy(MAX_ENEMY)}.png') 
        center / cover 
        no-repeat`;
        gameArea.append(enemy);
    }

    setting.score = 0;
    setting.start = true;
    gameArea.append(car);
    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    car.style.top = 'auto';
    car.style.bottom = '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

const exitGame = () => window.close();

const setSettings = () => {
    start.classList.add('hide');
    gameSettings.classList.add('hide');
    exit.classList.add('hide');
    const easy = document.createElement('div');
    easy.classList.add('easy');
    easy.setAttribute('data-level-game', 'easy');
    easy.textContent = 'EASY';
    const normal = document.createElement('div');
    normal.classList.add('normal');
    normal.setAttribute('data-level-game', 'normal');
    normal.textContent = 'NORMAL';
    const hard = document.createElement('div');
    hard.classList.add('hard');
    hard.setAttribute('data-level-game', 'hard');
    hard.textContent = 'HARD';
    game.append(easy);
    game.append(normal);
    game.append(hard);
};


const startRun = (event) => {
    if (keys.hasOwnProperty(event.key)) {
		event.preventDefault();
		keys[event.key] = true;
	}
};

const stopRun = (event) => {
	if (keys.hasOwnProperty(event.key)) {
		event.preventDefault();
		keys[event.key] = false;
	}
};

start.addEventListener('click', startGame);
gameSettings.addEventListener('click', setSettings);
exit.addEventListener('click', exitGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);