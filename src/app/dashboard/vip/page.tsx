"use client";

import { useState } from "react";

export default function Vip() {
  const [cpf, setCpf] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitButtonText, setSubmitButtonText] =
    useState("Realizar Pagamento");

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d]/g, "");
    let maskedValue = "";

    for (let i = 0; i < rawValue.length && i < 11; i++) {
      if (i === 3 || i === 6) {
        maskedValue += ".";
      } else if (i === 9) {
        maskedValue += "-";
      }
      maskedValue += rawValue[i];
    }

    setCpf(maskedValue);
  };

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const cpf = event.currentTarget.cpf.value;
    const name = event.currentTarget.nome.value;
    const vipType = event.currentTarget.vipType.value;
    const userInfo = JSON.parse(sessionStorage.getItem("user") || "{}");
    const playerType = userInfo.data.playerType;
    const discordId = userInfo.data.user[0].discordId;

    //remove os caracteres especiais do cpf
    const cpfNumber = cpf.replace(/[^\d]/g, "");

    const data = {
      cpf: cpfNumber,
      name,
      vipType,
      playerType,
      discordId,
    };

    const fetchUrl = new URL(window.location.href);
    const formattedUrl = `${fetchUrl.origin}/api/vip/generatePaymentLink`;

    const fetchPaymentLink = async () => {
      const response = await fetch(formattedUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const paymentLinkData = await response.json();
        setPaymentLink(paymentLinkData.qrCodeUrl);
        setLoading(false);
        setSubmitButtonText("Gerar novo link de pagamento");
      } else {
        setLoading(false);
        console.log("Error fetching payment link: ", response.statusText);
      }
    };

    fetchPaymentLink();
  }

  return (
    <div className="dashboard__main">
      <div className="dashboard__main__vip">
        <h1 className="dashboard__main__vip__title">Torne-se um membro Vip</h1>
        <p className="dashboard__main__vip__desc">
          Tenha acesso a recursos exclusivos e ajude a manter o servidor no ar
        </p>
      </div>
      <form className="dashboard__main__vip__form" onSubmit={handleFormSubmit}>
        <h2 className="dashboard__main__vip__form__title">
          Preencha as informações para continuar
        </h2>
        <input
          type="text"
          placeholder="CPF"
          name="cpf"
          value={cpf}
          minLength={14}
          maxLength={14}
          onChange={handleCpfChange}
          required
        />
        <input type="text" placeholder="Seu Nome" name="nome" required />
        <select name="vipType" required>
          <option value="basic">Basic R$ 3,00</option>
          <option value="pro">Pro R$ 5,00</option>
        </select>

        {!loading && (
          <button type="submit" className="dashboard__main__vip__button">
            {submitButtonText}
          </button>
        )}
        {loading && (
          <button type="submit" className="dashboard__main__vip__button">
            Gerando link de pagamento <span className="loading-dots"></span>
          </button>
        )}
      </form>
      {paymentLink && (
        <div className="dashboard__main__vip__link">
          <p>Acesse o link para realizar o seu pagamento:</p>
          <a href={paymentLink} target="_blank">
            {paymentLink}
          </a>
        </div>
      )}
    </div>
  );
}
