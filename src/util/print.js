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

export const generateRepairCostsDoc = (repair, style) => {
  return "";
};
