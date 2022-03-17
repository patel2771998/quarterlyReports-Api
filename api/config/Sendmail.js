const sendmail = require('sendmail')();

const sendMail = async (mailData) => {
  try {
    var mytable = "";

    for (var i = 0; i < mailData.report.length; i++) {

      mytable += "<tr>";
      var date = new Date(mailData.report[i].fiscalDateEnding)
      var lastDate = date.toLocaleString("en-US", { month: "short" }) + ' ' + date.getFullYear()
      mytable += "<td> " + lastDate + "</td>";
      mytable += "<td> " + mailData.report[i].grossProfit + "</td>";
      mytable += "<td> " + mailData.report[i].totalRevenue + "</td>";
      mytable += "<td> " + mailData.report[i].costOfRevenue + "</td>";
      mytable += "<td> " + mailData.report[i].costofGoodsAndServicesSold + "</td>";
      mytable += "<td> " + mailData.report[i].sellingGeneralAndAdministrative + "</td>";
      mytable += "<td> " + mailData.report[i].researchAndDevelopment + "</td>";
      mytable += "<td> " + mailData.report[i].operatingExpenses + "</td>";
      mytable += "<td> " + mailData.report[i].netInterestIncome + "</td>";
      mytable += "<td> " + mailData.report[i].interestIncome + "</td>";
      mytable += "<td> " + mailData.report[i].interestExpense + "</td>";
      mytable += "<td> " + mailData.report[i].nonInterestIncome + "</td>";
      mytable += "<td> " + mailData.report[i].otherNonOperatingIncome + "</td>";
      mytable += "<td> " + mailData.report[i].incomeBeforeTax + "</td>";
      mytable += "<td> " + mailData.report[i].incomeTaxExpense + "</td>";
      mytable += "<td> " + mailData.report[i].interestAndDebtExpense + "</td>";
      mytable += "<td> " + mailData.report[i].netIncomeFromContinuingOperations + "</td>";
      mytable += "<td> " + mailData.report[i].comprehensiveIncomeNetOfTax + "</td>";
      mytable += "<td> " + mailData.report[i].netIncome + "</td>";
      mytable += "</tr>";
    }
    const html =
      `
      <style type="text/css">
        table {
          display: block;
          overflow-x: scroll;
          color: #111;
          font-family: sans-serif;
          font-size: 14px;
          border-collapse: collapse;
      }
      .reportE th, .reportE td
      th, td {
          padding: 10px;
          border: 1px solid #000;
          text-align: center;
      }
      th, .reportE th {
          background: #9696b2;
          color: white;
      }
      tr:nth-child(odd) td {
          background: #f1f1f1;
      }
      tr td:first-child {
          background: #f0f0f0 !important;
          left: 0;
          top: 6px;
          flex-grow: unset;
          z-index: 1;
          border: 1px solid rgba(0,0,0,0.12);
          position: sticky;
          min-width: 61px;
          padding: 10px 15px;
      }
      </style>
      <table cellpadding="10" cellspacing="0"  align="center" border="1" class="reportE" style="width:100%;display: block;overflow-x: scroll;color: #111;font-family: sans-serif;font-size: 14px;border-collapse: collapse;"><thead><tr><th>Date</th><th>Gross Profit</th><th>Total Revenue</th><th>Cost Of Revenue</th><th>Cost Of Goods And Services Sold</th><th>Selling General And Administrative</th><th>Research And Development</th><th>Operating Expenses</th><th>NetInterest Income</th><th>Interest Income</th><th>Interest Expense</th><th>Non Interest Income</th><th>Other Non Operating Income</th><th>Income Before Tax</th><th>Income Tax Expense</th><th>Interest And Debt Expense</th><th>Net Income From Continuing Operations</th><th>Comprehensive Income Net Of Tax</th><th>Net Income</th></tr></thead><tbody>${mytable}</tbody></table>`

    const mail = sendmail({
        from: 'no-reply@quarterlyReports.com',
        to: mailData.to,
        subject: 'Earning Report of ' + mailData.symbol,
        //text: mailData.text,
        html: html
    });
    return mail;
  } catch (error) {
    throw error;
  }
}


module.exports = { sendMail }