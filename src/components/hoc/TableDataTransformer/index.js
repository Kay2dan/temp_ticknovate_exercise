import React from "react";
import Table from "../../layout/Table";
import Input from "../../input/InputInteger";
import ActionCTA from "../../action/ActionCTA";

const TableDataTransformer = ({
  dataToTransform,
  columnsData,
  setRowsDataState,
}) => {
  // onclick handler for save button
  // will print to console
  const onClickOnActionCTA = () => {
    const dataToSave = [];
    dataToTransform.forEach((row, i) => {
      const nonZeroRow = {};
      const keys = Object.keys(row);
      keys.forEach((key) => {
        if (key === "ticket_id") {
          nonZeroRow[key] = row[key];
        }
        if (row[key] > 0) {
          nonZeroRow[key] = row[key];
        }
      });
      dataToSave.push(nonZeroRow);
    });
    console.log("%c ___DATA TO SAVE___ :", "color: orange", dataToSave);
  };

  // transformation of rows data into DOM elements
  // for each cell within the table
  // field is a concatenation of ticket_id and market_id
  // to make it unique for input.id
  const rowsDom = dataToTransform.map((row, i) => {
    const rowDom = {};
    const regions = Object.keys(row);

    regions.forEach((region, i) => {
      if (region !== "heading" && region !== "ticket_id") {
        rowDom[region] = (
          <Input
            value={row[region]}
            field={`${row.ticket_id}_${region}`}
            min={1}
            max={100}
            change={(field, value) => {
              const [type] = field.split("_");
              setRowsDataState((stateData) => {
                return stateData.map((stateRow) => {
                  if (stateRow.ticket_id === type) {
                    return {
                      ...stateRow,
                      [region]: value,
                    };
                  } else return stateRow;
                });
              });
            }}
          />
        );
      } else {
        rowDom[region] = row[region];
      }
    });

    return rowDom;
  });

  return (
    <div>
      <Table columns={columnsData} data={rowsDom} />
      <ActionCTA change={onClickOnActionCTA}>Save</ActionCTA>
    </div>
  );
};

export default TableDataTransformer;
