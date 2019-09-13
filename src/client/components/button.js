import React from "react";
function Button() {
    return (
        <div className={"buttons"}>
            <button className={"button"} type={"button"}>
                {"Add"}
            </button>
            <button className={"button"} type={"button"}>
                {"Update"}
            </button>
            <button className={"button"} type={"button"}>
                {"Delete"}
            </button>
            <button className={"button"} type={"button"}>
                {"Search"}
            </button>
        </div>
    );
}
export default Button;
