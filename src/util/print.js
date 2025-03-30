import {formatPhone} from "./formatting";

export const printRepairDoc = async (htmlStringFn, repair) => {
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);
  const doc = iframe.contentWindow.document;
  doc.open();
  let htmlString = htmlStringFn(repair, "");
  try {
    const response = await fetch(`${window.location.origin}/print.css`);
    const style = await response.text();
    htmlString = htmlStringFn(repair, style);
  } catch (error) {
    console.error("Failed to load CSS:", error);
  }
  doc.write(htmlString);
  doc.close();

  iframe.contentWindow.focus();
  iframe.contentWindow.print();
  document.body.removeChild(iframe);
};

export const generateRepairNewDoc = (repair, style) => {
  return `
<html>
  <head>
    <!-- link rel="stylesheet" href="${window.location.origin}/print.css" /-->
    <style>${style}</style>
  </head>
  <body>
    <main>
      <section class="underline">
        <img src='${window.location.origin}/logo.jpg' alt='Logo firmy, public/logo.jpg' />
        <h3>ZGŁOSZENIE SERWISOWE #${repair.repairId}</h3>
        <div class="pad-children">
          <div>
            <b>Data zgłoszenia:</b>
            <span>${new Date(repair.arrivalDate).toLocaleDateString("pl-PL")}</span>
          </div>
          <div>
            <b>Tel. kontaktowy:</b>
            <span>${formatPhone(repair.phoneNumber)}</span>
          </div>
          <div>
            <b>Model roweru:</b>
            <span>${repair.bikeName}</span>
          </div>
          <div>
            <b>Zakres czynności:</b>
            <span>${repair.issue}</span>
          </div>
        </div>
        <div class="signature">
          <span>Podpis pracownika</span>
        </div>
      </section>
      <section>
        <img src='${window.location.origin}/logo.jpg' alt='Logo firmy, public/logo.jpg' />
        <h3>ZGŁOSZENIE SERWISOWE #${repair.repairId}</h3>
        <div class="pad-children">
          <div>
            <b>Data zgłoszenia:</b>
            <span>${new Date(repair.arrivalDate).toLocaleDateString("pl-PL")}</span>
          </div>
          <div>
            <b>Tel. kontaktowy:</b>
            <span>${formatPhone(repair.phoneNumber)}</span>
          </div>
          <div>
            <b>Model roweru:</b>
            <span>${repair.bikeName}</span>
          </div>
          <div>
            <b>Zakres czynności:</b>
            <span>${repair.issue}</span>
          </div>
        </div>
        <div class="signature">
          <span>Podpis pracownika</span>
        </div>
      </section>
    </main>
  </body>
</html>
`;
};

export const printRepairCostDoc = async (htmlStringFn, repair) => {
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);
  const doc = iframe.contentWindow.document;
  doc.open();
  let htmlString = htmlStringFn(repair, "");
  try {
    const response = await fetch(`${window.location.origin}/print.css`);
    const style = await response.text();
    htmlString = htmlStringFn(repair, style);
  } catch (error) {
    console.error("Failed to load CSS:", error);
  }
  doc.write(htmlString);
  doc.close();

  iframe.contentWindow.focus();
  iframe.contentWindow.print();
  document.body.removeChild(iframe);
};

export const generateRepairCostDoc = (repair, style) => {
  const totalServiceCost = repair.services.reduce((sum, s) => sum + s.price, 0);
  const totalPartsCost = repair.parts.reduce((sum, p) => sum + p.price * p.amount, 0);
  const totalCost = totalServiceCost + totalPartsCost + repair.additionalCosts - repair.discount;
  console.log(repair)
  return `
<html>
  <head>
    <style>${style}</style>
  </head>
  <body>
    <main style="display: flex; flex-direction: column;">
     <section class="underline">
        <h3>KOSZTORYS NAPRAWY #${repair.repairId}</h3>
        <div class="pad-children">
          <div><b>Data zgłoszenia:</b> <span>${new Date(repair.arrivalDate).toLocaleDateString("pl-PL")}</span></div>
          <div><b>Tel. kontaktowy:</b> <span>${formatPhone(repair.phoneNumber)}</span></div>
          <div><b>Model roweru:</b> <span>${repair.bikeName}</span></div>
          <div><b>Zakres czynności:</b> <span>${repair.issue}</span></div>
        </div>
      </section>
      <section style="flex: 40">
        <h3>Kosztorys</h3>
        <table style="border-collapse: collapse; border: solid 1px black; width: 100%">
          <tr>
            <th>Rodzaj</th>
            <th>Nazwa</th>
            <th>Ilość</th>
            <th>Cena jednostkowa</th>
            <th>Łączna cena</th>
          </tr>
          ${repair.services.map(s => `
            <tr>
              <td>Usługa</td>
              <td>${s.service.serviceName}</td>
              <td style="text-align: center;">-</td>
              <td style="text-align: right;">${s.price.toFixed(2)} PLN</td>
              <td style="text-align: right;">${s.price.toFixed(2)} PLN</td>
            </tr>`).join('')}
          ${repair.parts.map(p => `
            <tr>
              <td>Część</td>
              <td>${p.part.partName}</td>
              <td style="text-align: center;">${p.amount}</td>
              <td style="text-align: right;">${p.price.toFixed(2)} PLN/${p.part.unit.unitName}</td>
              <td style="text-align: right;">${(p.price * p.amount).toFixed(2)} PLN</td>
            </tr>`).join('')}
          <tr>
            <td colspan="4"><b>Koszty dodatkowe</b></td>
            <td style="text-align: right;">${repair.additionalCosts.toFixed(2)} PLN</td>
          </tr>
          <tr>
            <td colspan="4"><b>Rabat</b></td>
            <td style="text-align: right;">- ${repair.discount.toFixed(2)} PLN</td>
          </tr>
          <tr>
            <td colspan="4"><b>Łączny koszt</b></td>
            <td style="text-align: right;">${totalCost.toFixed(2)} PLN</td>
          </tr>
        </table>
        <div class="signature">
          <span>Podpis pracownika</span>
        </div>
      </section>
    </main>
  </body>
</html>
`;
};