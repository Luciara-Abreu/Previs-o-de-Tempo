"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#search-form > form');
const input = document.querySelector('#input-localization');
const sectionTempInfo = document.querySelector('#temp-info');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const sectionTempInfo = document.querySelector('#temp-info');
    if (!input || !sectionTempInfo)
        return;
    const localization = input.value;
    if (localization.length < 3) {
        alert("O local precisa ter pelo menos 3 letras");
        return;
    }
    try {
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localization}&APPID=a2caf503d32038ed536854d8803a717a&lang=pt-br&units=metric`);
        const dados = yield resposta.json();
        const infos = {
            temperatura: Math.round(dados.main.temp),
            local: dados.name,
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
        };
        sectionTempInfo.innerHTML = `
    <div class="temp-data">
    <h2>${infos.local}</h2>
    <span>${infos.temperatura}ºC</span>
  </div>
  
  <img src="${infos.icone}" alt="img-temp">
    `;
    }
    catch (err) {
        console.log("Deu erro ao trazer os dados da API openweathermap", err);
    }
}));
