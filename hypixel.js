const fetch = require('node-fetch');

const key = 'db7aa941-ce96-4fc5-a273-cde256fef6e9';
const base = 'https://api.hypixel.net';

async function getPlayer(username) {
    const method = `/player?key=${key}&name=${username}`;
    const json = await fetch(base + method).then(r => r.json());

    if (json.success === true) return json.player;

    return null;
}

async function getLevel(username) {
    const base = 10000;
    const growth = 2500;
    const reversePqPrefix = -(base - 0.5 * growth) / growth;
    const reverseConst = reversePqPrefix ** 2;

    const player = await getPlayer(username);

    if (player === null) return null;

    const exp = player.networkExp;

    return exp < 0 ? 1 : Math.floor(1 + reversePqPrefix + Math.sqrt(reverseConst + (2 / growth) * exp));
}

module.exports = {
    getPlayer, getLevel
};