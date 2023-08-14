import { NextResponse } from "next/server";
import { Aquiles, Player } from "../../mongo/schemas";

export async function POST(request: Request) {
  try {
    const { cpf, name, vipType, playerType, discordId } = await request.json();

    let value;

    if (vipType === "basic") {
      value = "3.00";
    }
    if (vipType === "pro") {
      value = "5.00";
    }

    const data = {
      cpf,
      name,
      value,
    };

    const pixApiUrl = process.env.NEXT_PUBLIC_PIX_URL || "";
    const fomatedPixApiUrl = pixApiUrl + "/payment";
    console.log(fomatedPixApiUrl);

    const response = await fetch(fomatedPixApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response: any) {
        return response.json();
      })
      .catch(function (error: any) {
        console.log("Erro" + error);
        return null;
      });

    if (response === null) {
      return NextResponse.json({ response: null });
    }

    let user;
    if (playerType === "player") {
      user = await Player.findOne({ discordId });
    }
    if (playerType === "aquiles") {
      user = await Aquiles.findOne({ discordId });
    }

    const transactionID = response.location.split("v2/").pop();

    const qrCodeUrl =
      "https://pix.gerencianet.com.br/cob/pagar/" + transactionID;

    const vip = {
      status: false,
      lastTxid: response.txid,
      lastQrCodeUrl: qrCodeUrl,
      lastTxidStatus: "ATIVA",
    };

    await user.updateOne({ vip });

    return NextResponse.json({ qrCodeUrl, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ response: null });
  }
}
