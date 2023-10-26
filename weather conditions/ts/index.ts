import dotenv from 'dotenv'

dotenv.config();
const apiKey = process.env.API_KEY;

const form = document.querySelector('#search-form > form');
const input: HTMLInputElement | null = document.querySelector('#input-localization');


const sectionTempInfo = document.querySelector('#temp-info')

form?.addEventListener('submit', async (event) => {
  event.preventDefault()

  const sectionTempInfo = document.querySelector('#temp-info')

  if (!input || !sectionTempInfo) return

  const localization = input.value

  if (localization.length < 3) {
    alert("O local precisa ter pelo menos 3 letras");
    return
  }

  try {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localization}&APPID=${apiKey}&lang=pt-br&units=metric`)
    const dados = await resposta.json()

    const infos = {
      temperatura: Math.round(dados.main.temp),
      local: dados.name,
      icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
    }

    sectionTempInfo.innerHTML = `
    <div class="temp-data">
    <h2>${infos.local}</h2>
    <span>${infos.temperatura}ºC</span>
  </div>
  
  <img src="${infos.icone}" alt="img-temp">
    `;
  } catch (err) {
    console.log("Deu erro ao trazer os dados da API openweathermap", err)
  }
})