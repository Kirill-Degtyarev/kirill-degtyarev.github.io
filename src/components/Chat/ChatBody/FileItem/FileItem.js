import React from "react";

import SvgGenerator from "../../../../svgGenerator/SvgGenerator";
import styles from "./FileItem.module.css";

const FileItem = ({ item }) => {
    const getSize = (size) => {
        return (size / 1024).toFixed(2) + "Mb";
    };
    switch (item.fileType) {
        case "image":
            return (
                <div className={styles.img__body}>
                    <img src={item.fileUrl} alt="images" />
                </div>
            );

        // case "video":
        //     return <div className={styles.video__body}></div>;

        // case "audio":
        //     return <div className={styles.audio__body}></div>;

        case "document":
            return (
                <div className={styles.document}>
                    <div className={styles.document__body}>
                        <div className={styles["document__body-img"]}>
                            <SvgGenerator id="file_dock" />
                        </div>
                        <div
                            className={`${styles["document__body-info"]} ${styles["document-info"]}`}
                        >
                            <div className={styles["document-info__file-name"]}>
                                {item.fileName}
                            </div>
                            <div className={styles["document-info__file-size"]}>
                                {getSize(item.fileSize)}
                            </div>
                        </div>
                    </div>
                </div>
            );

        default:
            break;
    }
};

export default FileItem;
