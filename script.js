const accountValue = document.getElementById('getMoney');

const recive = document.getElementsByClassName('btn')[0];
const transfer = document.getElementsByClassName('btn')[1];
const submit = document.getElementsByClassName('btn')[2];

const pixBtn = document.getElementById("pix");
const transCard = document.getElementById("transf-card");

const getKey = document.getElementById('getKey');
const getMoney = document.getElementById('getNewMoney');

const InValue = document.getElementById("In");
const OutValue = document.getElementById("Out");

const errorHandle = document.getElementById("error");

const motherOfAll = document.getElementById("mother");

let userValue = 0;
let userChoice = 0;

let In = 0;
let Out = 0;

let idArray = [];

pixBtn.addEventListener('click', (event) => {
    event.preventDefault();

    recive.classList.add('clicked');
    transCard.style.visibility = 'visible';

    userChoice = 1;
});

recive.addEventListener('click', () => {
    recive.classList.add('clicked');
    transfer.classList.remove('clicked');

    userChoice = 1;
});

transfer.addEventListener('click', () => {
    transfer.classList.add('clicked');
    recive.classList.remove('clicked');

    userChoice = 2;
});

submit.addEventListener('click', (event) => {
    event.preventDefault();

    if (getKey.value.length >= 33 || parseFloat(getMoney.value) <= -1) {
        errorHandle.innerHTML = "Valores inválidos detectados";
        setTimeout(() => {
            errorHandle.style.transition = "0.5s";
            errorHandle.innerHTML = "";
        }, 2000);
    } else {
        console.log(getMoney.value);
        result = userChoice == 1 ? userValue += parseFloat(getMoney.value) : userValue -= parseFloat(getMoney.value);
        plus = userChoice == 1 ? In += parseFloat(getMoney.value) : Out += parseFloat(getMoney.value);

        let card;
        if (userChoice == 1) {
            card = CreateCard("Entrada", "Transferência recebida", getMoney.value);
        } else if (userChoice == 2) {
            card = CreateCard("Saída", "Transferência enviada", getMoney.value);
        } else {
            alert("Um erro no registro foi reportado, pedimos desculpa!");
            return;
        }

        if (motherOfAll) {
            motherOfAll.appendChild(card);
        } else {
            console.error("Contêiner 'motherOfAll' não encontrado!");
        }

        accountValue.innerHTML = `R$ ${result}`;
        InValue.innerHTML = `R$ ${In}`;
        OutValue.innerHTML = `R$ ${Out}`;

        transCard.style.visibility = 'hidden';
        closeTab();
        getKey.value = '';
        getMoney.value = '';
    }
});

const closeTab = () => {
    transCard.style.visibility = 'hidden';
    transfer.style.transition = '0.0s';
    recive.style.transition = '0.0s';
    submit.style.transition = '0.0s';

    getKey.value = '';
    getMoney.value = '';
};

const CreateCard = (InOrOut, Type, Value) => {
    let mainCard = document.createElement("div");
    mainCard.setAttribute("id", "card-cont");

    let infoCard = document.createElement("div");
    infoCard.setAttribute("id", "card-for-info");
    mainCard.appendChild(infoCard);

    let entry = document.createElement("p");
    entry.setAttribute("class", "minus")
    infoCard.appendChild(entry);
    entry.innerHTML = InOrOut;

    let date = new Date();
    let formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    let dateElement = document.createElement("p");
    dateElement.setAttribute("class", "minus")
    dateElement.innerHTML = formattedDate;
    infoCard.appendChild(dateElement);

    let fromCard = document.createElement("div");
    mainCard.appendChild(fromCard);

    let type = document.createElement("p");
    type.setAttribute("class", "minus")
    type.innerHTML = `Tipo: ${Type}`;
    fromCard.appendChild(type);

    let from = document.createElement("p");
    from.setAttribute("class", "minus")
    from.innerHTML = 'De: 432-834-103-90';
    fromCard.appendChild(from);

    let valueCard = document.createElement("div");
    mainCard.appendChild(valueCard);

    let id = document.createElement("p");
    id.setAttribute("class", "minus")
    valueCard.appendChild(id);

    let idrng = Math.floor(Math.random() * 99999999999999);
    while (idArray.includes(idrng)) {
        idrng = Math.floor(Math.random() * 99999999999999);
    }
    idArray.push(idrng);
    id.innerHTML = `ID ${idrng}`;

    let value = document.createElement("p");
    value.setAttribute("class", "minus")
    valueCard.appendChild(value);
    value.innerHTML = `R$ ${Value}`;

    return mainCard; 
};
