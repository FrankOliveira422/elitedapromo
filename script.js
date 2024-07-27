async function buscarPromocao() {
    const produto = document.getElementById('produto').value;
    const resultado = document.getElementById('resultado');
    
    if (produto === '') {
        resultado.innerHTML = '<p>Por favor, digite o nome de um produto.</p>';
        return;
    }

    resultado.innerHTML = '<p>Buscando promoções...</p>';
    
    try {
        const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`);
        const data = await response.json();
        
        if (data.results.length === 0) {
            resultado.innerHTML = '<p>Nenhuma promoção encontrada para este produto.</p>';
            return;
        }

        let promocoes = '<h2>Resultados:</h2>';
        data.results.slice(0, 5).forEach(item => {
            promocoes += `
                <div class="promocao">
                    <h3>${item.title}</h3>
                    <p>Preço: R$ ${item.price}</p>
                    <a href="${item.permalink}" target="_blank">Ver na Loja</a>
                </div>
            `;
        });

        resultado.innerHTML = promocoes;
    } catch (error) {
        resultado.innerHTML = '<p>Ocorreu um erro ao buscar promoções. Tente novamente mais tarde.</p>';
        console.error('Erro ao buscar promoções:', error);
    }
}
