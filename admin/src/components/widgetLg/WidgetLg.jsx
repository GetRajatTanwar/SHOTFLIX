import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.mrafI1X7DSEqAxU4GF-55gAAAA%26pid%3DApi&f=1"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Rajat Tanwar</span>
          </td>
          <td className="widgetLgDate">2 Jan 2022</td>
          <td className="widgetLgAmount">$0.01</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.cBv-z4pOqwmPlsl_LnWBUwHaHa%26pid%3DApi&f=1"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Raghav Babbar</span>
          </td>
          <td className="widgetLgDate">25 Dec 2021</td>
          <td className="widgetLgAmount">$0.01</td>
          <td className="widgetLgStatus">
            <Button type="Declined" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.s7v2KF8gYi5drpox8K_oxgHaHa%26pid%3DApi&f=1"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Ashi Gupta</span>
          </td>
          <td className="widgetLgDate">14 Dec 2021</td>
          <td className="widgetLgAmount">$0.01</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.M9sJUTCD2GNY_lmtj4iN4AHaHa%26pid%3DApi&f=1"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Pankhuri Kalra</span>
          </td>
          <td className="widgetLgDate">28 Nov 2021</td>
          <td className="widgetLgAmount">$0.01</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
      </table>
    </div>
  );
}
