import React from "react";

const Thead = (props) => {
    const { columns, theadClass = { th: "", thead: "", tr: "" }, onSort, order = 0, sortedField } = props;

    return (
        <thead className={theadClass.thead}>
            <tr className={theadClass.tr}>
                {columns?.map((column, i) => (
                    <th
                        key={i}
                        className={`${column.className ? column.className : ""} ${theadClass.th}`}
                        style={{ width: column.colWidth }}
                    >{column.title}</th>
                ))}
            </tr>
        </thead>
    );
};

export default Thead;
