let modoAtual = 'dinheiro';

const MEDIAS = {
    gasolina: { cidade: 10.1, estrada: 11.5 },
    etanol: { cidade: 7.1, estrada: 8.1 }
};

function setModo(modo) {
    modoAtual = modo;
    document.getElementById('btnDinheiro').classList.toggle('active', modo === 'dinheiro');
    document.getElementById('btnLitros').classList.toggle('active', modo === 'litros');
    document.getElementById('btnDistancia').classList.toggle('active', modo === 'distancia');

    document.getElementById('campoDinheiro').style.display = modo === 'dinheiro' ? 'block' : 'none';
    document.getElementById('campoLitros').style.display = modo === 'litros' ? 'block' : 'none';
    document.getElementById('campoDistancia').style.display = modo === 'distancia' ? 'block' : 'none';
    
    limparResultado();
}

function limparResultado() {
    document.getElementById('resultado').style.display = 'none';
}

function limparTudo() {
    document.querySelectorAll('input').forEach(input => input.value = '');
    limparResultado();
}

function calcular() {
    const preco = parseFloat(document.getElementById('precoLitro').value);
    const combustivel = document.getElementById('tipoCombustivel').value;
    const mediaAtiva = MEDIAS[combustivel];
    
    let litros = 0;
    let gastoTotal = 0;
    let mostrarAutonomia = true;

    if (!preco || preco <= 0) {
        alert("Informe o preço do litro.");
        return;
    }

    if (modoAtual === 'dinheiro') {
        const reais = parseFloat(document.getElementById('valorReais').value);
        if (reais > 0) {
            litros = reais / preco;
            gastoTotal = reais;
        }
    } else if (modoAtual === 'litros') {
        const litrosIn = parseFloat(document.getElementById('valorLitrosInput').value);
        if (litrosIn > 0) {
            litros = litrosIn;
            gastoTotal = litros * preco;
        }
    } else if (modoAtual === 'distancia') {
        const kmAlvo = parseFloat(document.getElementById('valorKmInput').value);
        const trajeto = document.getElementById('tipoTrajeto').value;
        const consumoKm = mediaAtiva[trajeto];
        
        if (kmAlvo > 0) {
            litros = kmAlvo / consumoKm;
            gastoTotal = litros * preco;
            mostrarAutonomia = false;
        }
    }

    if (litros > 0) {
        document.getElementById('resGasto').innerText = `R$ ${gastoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        document.getElementById('resLitros').innerText = `${litros.toFixed(2).replace('.', ',')} L`;
        
        const areaAuton = document.getElementById('areaAutonomia');
        if (mostrarAutonomia) {
            areaAuton.style.display = 'block';
            document.getElementById('resCidade').innerText = `${(litros * mediaAtiva.cidade).toFixed(1).replace('.', ',')} km`;
            document.getElementById('resEstrada').innerText = `${(litros * mediaAtiva.estrada).toFixed(1).replace('.', ',')} km`;
        } else {
            areaAuton.style.display = 'none';
        }

        document.getElementById('resultado').style.display = 'block';
    } else {
        alert("Preencha os campos obrigatórios.");
    }
}