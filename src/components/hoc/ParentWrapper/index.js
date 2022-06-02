import React, { useState, useEffect } from "react";
import useData from "../../../hooks/useData";
import useMarkets from "../../../hooks/useMarkets";
import useTickets from "../../../hooks/useTickets";
import TableDataTransformer from "../TableDataTransformer";

const ParentWrapper = () => {
  const [rowsDataSt, setRowsDataSt] = useState([]);
  const [columnsDataSt, setColumnsDataSt] = useState([]);

  const transactions = useData();
  const markets = useMarkets();
  const tickets = useTickets();

  // useEffect to transform data into digestable
  // data for storing within state
  useEffect(() => {
    if (transactions.isLoaded && markets.isLoaded && tickets.isLoaded) {
      const columnData = [{ key: "heading", label: "Ticket" }];
      const rowsData = [];

      markets.data.forEach((m, i) => {
        columnData.push({
          key: m.market_id,
          label: m.title,
        });
      });

      tickets.data.forEach((ticketType, i) => {
        const rowData = {
          ticket_id: ticketType.ticket_id,
          heading: ticketType.title,
        };
        columnData.forEach((col, i) => {
          if (i !== 0) {
            const cellVal = transactions.data.find((cell) => {
              if (
                cell.ticket_id === ticketType.ticket_id &&
                cell.market_id === col.key
              ) {
                return true;
              } else return false;
            });
            rowData[col.key] = cellVal?.value || 0;
          }
        });
        rowsData.push(rowData);
      });
      setRowsDataSt(rowsData);
      setColumnsDataSt(columnData);
    }
  }, [markets, tickets, transactions]);

  if (columnsDataSt.length) {
    return (
      <TableDataTransformer
        dataToTransform={rowsDataSt}
        columnsData={columnsDataSt}
        setRowsDataState={setRowsDataSt}
      />
    );
  } else {
    return <div>Retrieving data for the table...</div>;
  }
};

export default ParentWrapper;
