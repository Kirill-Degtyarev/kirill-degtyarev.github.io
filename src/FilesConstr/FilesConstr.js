import React from "react";

import SvgGenerator from "../svgGenerator/SvgGenerator";

import styles from "./FilesConstr.module.css";

const FilesConstr = (props) => {
    return (
        <div className={`${styles["messages-files"]} ${styles[`${props.type}`]}`}>
            <div className={styles["files-docs"]}>
                <div className={styles["files-docs__img"]}>
                    <SvgGenerator id={props.name} />
                </div>
                <h2 className={styles["files-docs__title"]}>{props.name}</h2>
                {props.count > 1 ? (
                    <span className={styles["files-docs__count"]}>(x{props.count})</span>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default FilesConstr;
