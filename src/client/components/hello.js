/* becodeorg/trouvkach
 *
 * /src/client/components/hello.js - Hello Component
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import * as React from "react";
import Button from "./button";
import Infodisplay from "./infodisplay";
import Infodisplaylocation from "./infodisplaylocation";
import Theimage from "./map8.gif";
const HelloWorld = () => (
    <div>
        <h1 className={"title"}>{"Trouvkach"}</h1>
        <hr />
        <small>{""}</small>
        <div className={"info-container"}>
            <Button />

            <Infodisplay />
            <Infodisplaylocation />
            <img src={Theimage} className={"img"} />
        </div>
    </div>
);

export default HelloWorld;
