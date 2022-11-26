import React from "react";
import PropTypes from "prop-types";

import Thead from "./Thead";
import Tbody from "./Tbody";
import "./style.css";

const Table = (props) => {
    const { theadClass, tbodyClass, className, dataSource, columns, fixed, scroll, pagination } = props;

    let fixedTable = { maxHeight: fixed ? 500 : "auto", minWidth: 0 };

    if (scroll && scroll.y) {
        fixedTable.maxHeight = scroll.y;
    }
    if (scroll && scroll.x) {
        fixedTable.minWidth = scroll.x;
    }

    return (
        <div>
            <div
                className={`rsl-table ${fixed ? "table-fixed" : ""}`}
                style={fixedTable.maxHeight ? { maxHeight: fixedTable.maxHeight } : {}}
            >
                <table className={className} style={fixedTable.minWidth ? { minWidth: fixedTable.minWidth } : {}}>
                    <Thead theadClass={theadClass} columns={columns} />
                    <Tbody tbodyClass={tbodyClass} dataSource={dataSource ? dataSource : []} columns={columns} />
                </table>
            </div>
        </div>
    );
};

Table.propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.object),
    theadClass: PropTypes.shape({ th: PropTypes.string, td: PropTypes.string, thead: PropTypes.string }),
    tbodyClass: PropTypes.shape({ tr: PropTypes.string, td: PropTypes.string, tbody: PropTypes.string }),
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            dataIndex: PropTypes.string,
            className: PropTypes.string,
            colWidth: PropTypes.number,
            render: PropTypes.func,
        })
    ),
    scroll: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    fixed: PropTypes.bool,
    pagination: PropTypes.shape({ pageSize: PropTypes.number, currentPage: PropTypes.number }),
};

export default Table;
