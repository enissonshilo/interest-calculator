import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [valorConsulta, setValorConsulta] = useState<number | string>('');
  const [resultado, setResultado] = useState<number | string>(0);
  const [cartao, setCartao] = useState<string>('VISA/MASTER');
  const [formaPagamento, setFormaPagamento] = useState<string>('Débito');
  const [taxaJuros, setTaxaJuros] = useState<number>(0);

  const taxasVISA_MASTER = [1.39, 2.91, 4.49, 5.22, 5.94, 6.68, 7.36, 8.11, 8.81, 9.49, 10.18, 10.85, 11.51, 12.18, 12.83, 13.48, 14.12, 14.76, 15.39];
  const taxasOUTROS = [1.79, 3.24, 4.64, 5.37, 6.09, 6.81, 7.51, 8.31, 9.01, 9.69, 10.38, 11.05, 11.71, 12.38, 13.03, 13.68, 14.32, 14.96, 15.59];
  const opcoesPagamento = [
    'Débito',
    ...Array.from({ length: 18 }, (_, i) => `Crédito ${i + 1}x`)
  ];

  const handleCalculadora = () => {
    const valorFormatado = (valorConsulta as string).replace(',', '.');
    const valor = parseFloat(valorFormatado);

    if (isNaN(valor) || isNaN(taxaJuros)) {
      setResultado('Por favor, insira valores válidos');
      return;
    }

    const valorConsultaVz100 = valor * 100;
    const valorTaxaMenos100 = 100 - taxaJuros;

    const valorComTaxa = valorConsultaVz100 / valorTaxaMenos100;
    setResultado(valorComTaxa.toFixed(2));
  };

  useEffect(() => {
    const tipoIndex = opcoesPagamento.indexOf(formaPagamento);

    if (cartao === 'VISA/MASTER') {
      setTaxaJuros(taxasVISA_MASTER[tipoIndex] || 0);
    } else {
      setTaxaJuros(taxasOUTROS[tipoIndex] || 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartao, formaPagamento]);

  useEffect(() => {
    setResultado(0);
  }, [valorConsulta, cartao, formaPagamento]);

  return (
    <div className="container">
      <div className="box">
        <h1>Calculadora de Taxas</h1>

        <div className="row-selects">
          <select
            value={cartao}
            onChange={(e) => setCartao(e.target.value)}
            className="select-half"
          >
            <option value="VISA/MASTER">Visa/Master</option>
            <option value="OUTROS">Outros</option>
          </select>

          <select
            value={formaPagamento}
            onChange={(e) => setFormaPagamento(e.target.value)}
            className="select-half"
          >
            <option value="Débito">Débito</option>
            {[...Array(18)].map((_, i) => (
              <option key={i} value={`Crédito ${i + 1}x`}>Crédito {i + 1}x</option>
            ))}
          </select>
        </div>

        <div className="row-selects">
          <input
            value={valorConsulta}
            onChange={(e) => {
              const apenasNumerosEVirgula = e.target.value.replace(/[^0-9,]/g, '');
              setValorConsulta(apenasNumerosEVirgula);
            }}
            placeholder="Valor (R$)"
            className="select-half"
          />

          <input
            value={taxaJuros}
            className="select-half"
            disabled
          />
        </div>

        <button onClick={handleCalculadora} className="full-width">
          Calcular
        </button>

        <div className="resultado">{`R$ ${resultado}`}</div>
      </div>
    </div>
  );
}

export default App;
