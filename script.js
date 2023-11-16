document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#campo_busca').value;

    if(input !== ''){
        limparAviso();
        mostrarAviso('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`;
        let resultado = await fetch(url);
        let json = await resultado.json();

        if(json.cod === 200){
            mostrarInfo({
                nome_cidade: json.name,
                nome_pais: json.sys.country,
                temperatura: json.main.temp,
                temperatura_icone: json.weather[0].icon,
                velocidade_vento: json.wind.speed,
                angulo_vento: json.wind.deg
            });
        } else{
            limparAviso();
            mostrarAviso('Não encontramos esta localização');
        }
    }
});

function mostrarInfo(json){
    mostrarAviso('');    
    
    document.querySelector('.titulo').innerHTML = `${json.nome_cidade}, ${json.nome_pais}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temperatura} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.velocidade_vento} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.temperatura_icone}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.angulo_vento-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function limparAviso(){
    mostrarAviso('');
    document.querySelector('.resultado').style.display = 'none';
}

function mostrarAviso(msg){
    document.querySelector('.aviso').innerHTML = msg;
}