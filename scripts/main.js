let money = 0, totalProfit = 0, rp = 0, streak = 0, streakMoney = 0;
let baseValue = 1, luck = 0.5, multiplier = 1, critChance = 0.05, critMult = 2, autoLevel = 0;
let pBase = 0, pMult = 1.0, pLuck = 0, discount = 1.0;
let costs = { value: 10, luck: 50, mult: 100, auto: 500, crit: 250 };
let autoInterval = null;
const MILESTONE = 10000;

function showShop(type) {
    document.getElementById('coinShop').classList.toggle('hidden', type !== 'coin');
    document.getElementById('rpShop').classList.toggle('hidden', type !== 'rp');
    document.getElementById('tabCoinBtn').className = 'tab-btn' + (type === 'coin' ? ' active-coin' : '');
    document.getElementById('tabRpBtn').className = 'tab-btn' + (type === 'rp' ? ' active-rp' : '');
}

function calculateGain() {
    let sBonus = streak <= 1 ? 1 : (streak === 2 ? 1.5 : streak - 1);
    return (baseValue + pBase) * multiplier * pMult * sBonus;
}

function updateUI() {
    document.getElementById('money').innerText = Math.floor(money).toLocaleString();
    document.getElementById('rpDisplay').innerText = Math.floor(rp) + " RP";
    document.getElementById('streak').innerText = streak;
    document.getElementById('nextGainVal').innerText = Math.floor(calculateGain()).toLocaleString();
    
    document.getElementById('totalMultDisplay').innerText = (multiplier * pMult).toFixed(1);
    document.getElementById('critMultDisplay').innerText = critMult.toFixed(1);
    document.getElementById('critLvlDisplay').innerText = critMult;

    if (autoLevel > 0) {
        let seconds = (2000 / Math.pow(1.3, autoLevel - 1)) / 1000;
        document.getElementById('autoTimeDisplay').innerText = seconds.toFixed(2) + "s";
    } else {
        document.getElementById('autoTimeDisplay').innerText = "OFF";
    }

    document.getElementById('valLvl').innerText = baseValue + pBase;
    document.getElementById('costVal').innerText = Math.floor(costs.value * discount).toLocaleString();
    document.getElementById('luckLvl').innerText = Math.round((luck + pLuck) * 100);
    document.getElementById('costLuck').innerText = Math.floor(costs.luck * discount).toLocaleString();
    document.getElementById('multLvl').innerText = multiplier;
    document.getElementById('costMult').innerText = Math.floor(costs.mult * discount).toLocaleString();
    document.getElementById('autoLvl').innerText = autoLevel;
    document.getElementById('costAuto').innerText = Math.floor(costs.auto * discount).toLocaleString();
    document.getElementById('costCrit').innerText = Math.floor(costs.crit * discount).toLocaleString();

    let currentM = Math.floor(totalProfit / MILESTONE) * MILESTONE, nextM = currentM + MILESTONE;
    let diff = nextM - totalProfit;
    document.getElementById('rbBar').style.width = ((totalProfit - currentM) / MILESTONE * 100) + "%";
    document.getElementById('rbProgressText').innerText = `ZBÝVÁ: ${Math.max(0, Math.floor(diff)).toLocaleString()} $`;
    document.getElementById('rebirthBtn').style.display = totalProfit >= MILESTONE ? 'block' : 'none';

    document.getElementById('rbVal').disabled = rp < 5;
    document.getElementById('rbMult').disabled = rp < 10;
    document.getElementById('rbLuck').disabled = rp < 15;
    document.getElementById('rbDisc').disabled = rp < 8;

    document.getElementById('upgValue').disabled = money < (costs.value * discount);
    document.getElementById('upgLuck').disabled = money < (costs.luck * discount) || (luck + pLuck) >= 0.95;
    document.getElementById('upgMult').disabled = money < (costs.mult * discount);
    document.getElementById('upgAuto').disabled = money < (costs.auto * discount);
    document.getElementById('upgCrit').disabled = money < (costs.crit * discount);
    save();
}

function flip() {
    const coin = document.getElementById('coinBtn');
    coin.classList.add('flipping'); setTimeout(() => coin.classList.remove('flipping'), 100);
    const win = Math.random() < (luck + pLuck);
    const list = document.getElementById('historyList');
    
    if (win) {
        streak++;
        let isCrit = Math.random() < critChance;
        let gain = calculateGain();
        if (isCrit) gain *= critMult;
        money += gain; totalProfit += gain; streakMoney += gain;
        let li = document.createElement('li');
        li.innerHTML = `<span class="win">${isCrit ? 'CRIT!' : 'VÝHRA'}</span> <span>+${Math.floor(gain).toLocaleString()} $</span>`;
        list.prepend(li);
        if (streak === 10) document.getElementById('doubleModal').style.display = 'flex';
    } else {
        streak = 0; streakMoney = 0;
        let li = document.createElement('li'); li.innerHTML = `<span class="loss">PROHRA</span> 0 $`; list.prepend(li);
    }
    if (list.children.length > 15) list.removeChild(list.lastChild);
    updateUI();
}

function openRebirthModal() {
    let g = Math.floor(totalProfit / MILESTONE);
    document.getElementById('modalRP').innerText = g;
    document.getElementById('modalPerm').innerText = "+" + (g * 0.1).toFixed(1) + "x";
    document.getElementById('rebirthModal').style.display = 'flex';
}

function confirmRebirth() {
    let g = Math.floor(totalProfit / MILESTONE);
    rp += g; pMult += (g * 0.1);
    money = 0; totalProfit = 0; streak = 0; baseValue = 1; luck = 0.5; multiplier = 1; autoLevel = 0; critChance = 0.05; critMult = 2;
    costs = { value: 10, luck: 50, mult: 100, auto: 500, crit: 250 };
    if (autoInterval) clearInterval(autoInterval); 
    document.getElementById('historyList').innerHTML = "";
    closeModal('rebirthModal'); updateUI();
}

function handleDouble(risk) {
    document.getElementById('doubleModal').style.display = 'none';
    if (risk && Math.random() < 0.5) { money += streakMoney; totalProfit += streakMoney; }
    else if (risk) { money -= streakMoney; if (money < 0) money = 0; }
    streakMoney = 0; updateUI();
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function save() { localStorage.setItem('coinFlipSaveV12', JSON.stringify({ money, totalProfit, rp, pBase, pMult, pLuck, discount, baseValue, luck, multiplier, autoLevel, critChance, critMult, costs })); }
function load() {
    const s = localStorage.getItem('coinFlipSaveV12');
    if (s) { Object.assign(window, JSON.parse(s)); if (autoLevel > 0) {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(flip, 2000 / Math.pow(1.3, autoLevel-1));
    } }
}

document.getElementById('coinBtn').onclick = flip;
document.getElementById('upgValue').onclick = () => { if (money >= costs.value*discount) { money -= costs.value*discount; baseValue++; costs.value *= 1.6; updateUI(); } };

document.getElementById('upgLuck').onclick = () => { if (money >= costs.luck*discount) { money -= costs.luck*discount; luck += 0.02; costs.luck *= 2.8; updateUI(); } };

document.getElementById('upgMult').onclick = () => { if (money >= costs.mult*discount) { money -= costs.mult*discount; multiplier += 1; costs.mult *= 3; updateUI(); } };

document.getElementById('upgCrit').onclick = () => { 
    if (money >= costs.crit*discount) { 
        money -= costs.crit*discount; 
        critChance += 0.01; 
        critMult += 1; 
        costs.crit *= 3.5; 
        updateUI(); 
    } 
};

document.getElementById('upgAuto').onclick = () => { if (money >= costs.auto*discount) { money -= costs.auto*discount; autoLevel++; costs.auto *= 4; if (autoInterval) clearInterval(autoInterval); autoInterval = setInterval(flip, 2000 / Math.pow(1.3, autoLevel-1)); updateUI(); } };

document.getElementById('rbVal').onclick = () => { if (rp >= 5) { rp -= 5; pBase += 1; updateUI(); } };
document.getElementById('rbMult').onclick = () => { if (rp >= 10) { rp -= 10; pMult += 1.0; updateUI(); } };
document.getElementById('rbLuck').onclick = () => { if (rp >= 15) { rp -= 15; pLuck += 0.025; updateUI(); } };
document.getElementById('rbDisc').onclick = () => { if (rp >= 8) { rp -= 8; discount *= 0.95; updateUI(); } };

load(); updateUI();