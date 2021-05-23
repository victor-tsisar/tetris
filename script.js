const newGame = document.querySelector('.new-game');
const controlGame = document.querySelector('.control-game');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
let speed = 0;

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('hard')) {
        speed = 150;
    } else if (e.target.classList.contains('normal')) {
        speed = 250;
    } else if (e.target.classList.contains('easy')) {
        speed = 400;
    }

    if (e.target.classList.contains('button')) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        startGame();
    }
});

controlGame.addEventListener('click', () => {
    if (controlGame.classList.contains('pause')) {
        controlGame.classList.remove('pause');
        controlGame.classList.add('go');
        controlGame.textContent = 'PAUSE';
    } else {
        controlGame.classList.add('pause');
        controlGame.classList.remove('go');
        controlGame.textContent = 'GO';
    }
});

newGame.addEventListener('click', () => {
    location.reload();
});

function startGame() {
    // створення поля тетріс і присвоєння класу
    let tetris = document.createElement('div');
    tetris.classList.add('tetris');

    // Поділ поля тетріс на ячейки, присвоєння їм класу
    for (let i = 0; i < 181; i++) {
        let excel = document.createElement('div');
        excel.classList.add('excel');
        tetris.appendChild(excel);
    }

    // тетріс введено як дочірній до елементу main
    let main = document.getElementsByClassName('main')[0];
    main.append(tetris);

    // присвоєння атрибутів ячейкам 
    let excel = document.getElementsByClassName('excel');
    let i = 0;

    for (let y = 18; y > 0; y--) {
        for (let x = 1; x < 11; x++) {
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y);
            i++;
        }
    }

    let x = 5, y = 15;  // стартова позиція фігур
    // побудова координат фігур
    let mainArr = [
        // line
        [
            [0, 1],
            [0, 2],
            [0, 3],
            // при повороті нижня ячейка фігури є 0, і рухається зліва направо
            // rotate 90deg
            [
                [-1, 1],
                [0, 0],
                [1, -1],
                [2, -2],
            ],
            // rotate 180deg
            [
                [1, -1],
                [0, 0],
                [-1, 1],
                [-2, 2],
            ],
            // rotate 270deg
            [
                [-1, 1],
                [0, 0],
                [1, -1],
                [2, -2],
            ],
            // rotate 360deg
            [
                [1, -1],
                [0, 0],
                [-1, 1],
                [-2, 2],
            ],
        ],
        // square
        [
            [1, 0],
            [0, 1],
            [1, 1],
            // rotate 90deg
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            // rotate 180deg
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            // rotate 270deg
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            // rotate 360deg
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
        ],
        // letter L
        [
            [1, 0],
            [0, 1],
            [0, 2],
            // rotate 90deg
            [
                [0, 0],
                [-1, 1],
                [1, 0],
                [2, -1],
            ],
            // rotate 180deg
            [
                [1, -1],
                [1, -1],
                [-1, 0],
                [-1, 0],
            ],
            // rotate 270deg
            [
                [-1, 0],
                [0, -1],
                [2, -2],
                [1, -1],
            ],
            // rotate 360deg
            [
                [0, -1],
                [0, -1],
                [-2, 0],
                [-2, 0],
            ],
        ],
        // letter reverse-L
        [
            [1, 0],
            [1, 1],
            [1, 2],
            // rotate 90deg
            [
                [0, 0],
                [0, 0],
                [1, -1],
                [-1, -1],
            ],
            // rotate 180deg
            [
                [0, -1],
                [-1, 0],
                [-2, 1],
                [1, 0],
            ],
            // rotate 270deg
            [
                [2, 0],
                [0, 0],
                [1, -1],
                [1, -1],
            ],
            // rotate 360deg
            [
                [-2, 0],
                [1, -1],
                [0, 0],
                [-1, 1],
            ],
        ],
        // lightning right
        [
            [1, 0],
            [-1, 1],
            [0, 1],
            // rotate 90deg
            [
                [0, -1],
                [-1, 0],
                [2, -1],
                [1, 0],
            ],
            // rotate 180deg
            [
                [0, 0],
                [1, -1],
                [-2, 0],
                [-1, -1],
            ],
            // rotate 270deg
            [
                [0, -1],
                [-1, 0],
                [2, -1],
                [1, 0],
            ],
            // rotate 360deg
            [
                [0, 0],
                [1, -1],
                [-2, 0],
                [-1, -1],
            ],
        ],
        // lightning left
        [
            [1, 0],
            [1, 1],
            [2, 1],
            // rotate 90deg
            [
                [2, -1],
                [0, 0],
                [1, -1],
                [-1, 0],
            ],
            // rotate 180deg
            [
                [-2, 0],
                [0, -1],
                [-1, 0],
                [1, -1],
            ],
            // rotate 270deg
            [
                [2, -1],
                [0, 0],
                [1, -1],
                [-1, 0],
            ],
            // rotate 360deg
            [
                [-2, 0],
                [0, -1],
                [-1, 0],
                [1, -1],
            ],
        ],
        // lego
        [
            [1, 0],
            [2, 0],
            [1, 1],
            // rotate 90deg
            [
                [1, -1],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            // rotate 180deg
            [
                [0, 0],
                [-1, 0],
                [-1, 0],
                [1, -1],
            ],
            // rotate 270deg
            [
                [1, -1],
                [1, -1],
                [1, -1],
                [0, 0],
            ],
            // rotate 360deg
            [
                [-2, 0],
                [0, -1],
                [0, -1],
                [-1, -1],
            ],
        ],
    ]

    let currentFigure = 0;
    let figureBody = 0;
    let rotate = 1;

    function create() {
        function getRandom() {
            return Math.round(Math.random() * (mainArr.length - 1))
        }

        rotate = 1;  // скидання повороту фігури
        currentFigure = getRandom(); // рандомний вибір актуальної фігури

        //прописуємо координати 4-ьох частин фігури
        figureBody = [
            document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
        ];

        // задаємо клас кожній частині фігури (для відображення по стилях)
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }
    }

    create();

    // Підрахунок балів
    let score = 0;
    let input = document.getElementsByTagName('input')[0];
    input.value = `Your Score: ${score}`;

    function move() {
        let moveFlag = true;

        // отримання стартових координат частин фігури
        let coordinates = [
            [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
            [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
            [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
            [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
        ];
        // перевірка розташування КОЖНОЇ частини фігури
        for (let i = 0; i < coordinates.length; i++) {
            // якщо координати хоча б однієї частини фігури по У є 1, тобто найнижчим рядом, або перевірка на наявність класу set нижче - забороняємо рух і зупиняємо цикл
            if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
                moveFlag = false;
                break;
            }
        }

        if (moveFlag) {
            // Якщо рух вниз можливий, то знімаємо клас figure
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }

            // ... задаємо нові координати, і зменшуємо по У на 1
            figureBody = [
                document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
            ];

            // ... переприсвоюємо клас figure новому положенню фігури
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        } else {
            // Якщо рух вниз неможливий, то замінюємо клас на set, і створюємо новий елемент
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
                figureBody[i].classList.add('set');
            }

            // Перебираємо стовпці і ряди поля, щоб визначити які ячейки мають клас set 
            for (let i = 1; i < 15; i++) {
                let count = 0;

                for (let k = 1; k < 11; k++) {
                    if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                        count++;

                        if (count == 10) {

                            score += 10;  // зароблення 10 очок за зібраний ряд
                            input.value = `Your Score: ${score}`;

                            // якщо всі ячейки одного ряду count == 10 заповнені, то знімаємо клас set
                            for (let m = 1; m < 11; m++) {
                                document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
                            }

                            let set = document.querySelectorAll('.set');  // вибір ячейок ряду з класом set
                            let newSet = [];
                            // отримуємо коо-ти кожної ячейки posX і posY
                            for (let s = 0; s < set.length; s++) {
                                let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];

                                // перевіряємо ряди і забираємо заповнений ряд
                                if (setCoordinates[1] > i) {
                                    set[s].classList.remove('set');
                                    // Ячейці, що під заповненим рядом додаємо нові коо-ти, щоб знизити вісь У на 1
                                    newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`));
                                }
                            }

                            // повертаємо видимість елементам (клас set)
                            for (let a = 0; a < newSet.length; a++) {
                                newSet[a].classList.add('set');
                            }

                            i--;  // знижуємо індекс, бо ряди змістилися
                        }
                    }
                }
            }

            // якщо будь-яка фігура досягне 15 ряду, то зупинити гру
            for (let n = 1; n < 11; n++) {
                if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
                    clearInterval(interval);
                    alert(`
                    Game over!
                    Your Score: ${score}`
                    );
                    break;
                }
            }

            create();
        }
    }

    // задаємо швидкість падіння фігури (функція move змінює координати)
    let interval = setInterval(() => {
        move();
        setPause(speed);
    }, speed);

    // кнопка пауза/гра
    let setPause = (speed) => {
        const oldSpeed = speed;

        controlGame.addEventListener('click', () => {
            if (controlGame.classList.contains('pause')) {
                speed = 1000000000;
                tetris.style.opacity = '0.3';

                clearInterval(interval);
                interval = setInterval(() => {
                    move();
                }, speed);
            }

            if (controlGame.classList.contains('go')) {
                speed = oldSpeed;
                tetris.style.opacity = '1';

                clearInterval(interval);
                interval = setInterval(() => {
                    move();
                }, speed);
            }
        });

        return speed;
    }

    let flag = true;

    window.addEventListener('keydown', function (e) {
        // одержання координат частин фігури figureBody
        let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
        let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
        let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
        let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

        // ф-ція визначення нового положення фігури
        function getNewState(a) {
            flag = true;

            // с-ння абстрактної фігури для відображення переміщення (відповідає параметр а)
            let figureNew = [
                document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
                document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
                document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
                document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
            ];

            for (let i = 0; i < figureNew.length; i++) {
                // перевіряємо чи можна рухатися вправо/вліво (figureNew не існує) і чи не містить елемент класу set
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }

            // якщо рух дозволено, перезаписуємо к-ти руху через figureNew, і міняємо класи
            if (flag == true) {
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }

                figureBody = figureNew;

                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }
            }

        }

        // Дії при натисненні клавіш змінюють параметр а і рухають елементи
        if (e.keyCode == 37) {
            getNewState(-1);
        } else if (e.keyCode == 39) {
            getNewState(1);
        } else if (e.keyCode == 40) {
            move();
        } else if (e.keyCode == 38) {
            flag = true;

            // с-ння фігури для відображення повороту
            let figureNew = [
                document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
                document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
                document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
                document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
            ];

            for (let i = 0; i < figureNew.length; i++) {
                // перевіряємо чи можна рухатися вправо/вліво (figureNew не існує) і чи не містить елемент класу set
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }

            // якщо рух дозволено, перезаписуємо к-ти руху через figureNew, і міняємо класи
            if (flag == true) {
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }

                figureBody = figureNew;  // змінюємо коо-ти

                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }

                if (rotate < 4) {
                    rotate++;
                } else {
                    rotate = 1;
                }
            }
        }
    });
}
