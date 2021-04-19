/* eslint-disable */
import fetch from 'node-fetch';

const loadToday = async () => {
    let url = 'https://corona.lmao.ninja/v2/countries/USA?yesterday&strict&query%20';
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log('Request Failed', error);
    }
};

const loadYesterday = async () => {
    let url = 'https://corona.lmao.ninja/v2/countries/USA?yesterday=true&strict&query%20';
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log('Request Failed', error);
    }
};

const loadMonth = async () => {
    let url = 'https://corona.lmao.ninja/v2/historical/USA?lastdays=31';
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log('Request Failed', error);
    }
};

const loadMichigan = async () => {
    let url = 'https://corona.lmao.ninja/v2/states/michigan';
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log('Request Failed', error);
    }
};

const loadStates = async () => {
    let url = 'https://corona.lmao.ninja/v2/states';
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log('Request Failed', error);
    }
};

export { loadToday, loadYesterday, loadMonth, loadMichigan, loadStates };