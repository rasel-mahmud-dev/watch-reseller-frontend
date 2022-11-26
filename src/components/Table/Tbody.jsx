import React from "react";

const Tbody = (props) => {
    const { dataSource, tbodyClass = {}, columns } = props;

    return (
        <tbody className={tbodyClass?.tbody}>
            {dataSource.map((data, i) => (
                <tr className={tbodyClass?.tr} key={i}>
                    {columns?.map((col) => (
                        <td
                            className={`table-cell ${tbodyClass.td ? tbodyClass.td : ""} ${col.tdClass ? col.tdClass : ''}`}
                            style={{ width: col.colWidth }}
                        >
                            { col.title === "SL" && i + 1 }
                            {col.render ? col.render(data[col.dataIndex], data) : data[col.dataIndex]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default Tbody;
